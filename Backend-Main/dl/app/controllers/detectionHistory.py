from app.controllers import blueprint, mongo, jsonify, datetime, resnet, request
from app.schemas import validate_detectionHistory
from bson.objectid import ObjectId
import flask
from flask_cors import CORS, cross_origin


@blueprint.route('/api/dl', methods=["GET"])
def hello():
    return 'Hello, World!'


@blueprint.route('/api/dl/prediction/test', methods=['GET'])
def test1():
    print(ObjectId("623a3d74960a9f8526395e08"))
    data = validate_detectionHistory(
        {"createdAt": str(datetime.now()),
         "plantId": ObjectId("623a3d74960a9f8526395e08")})
    if data['ok']:
        data = data['data']
        print(mongo.db.detectionHistory.find_one())
        print(type(mongo.db.detectionHistory.find_one()['_id']))
        mongo.db.detectionHistory.insert_one(data)
        return jsonify({'ok': True, 'message': 'User created successfully!', 'detectionHistory': data}), 200

    return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400


@blueprint.route('/api/dl/detection', methods=['POST'])
@cross_origin(supports_credentials=True)
def dl_detection():
    try:
        uid = '124352414'
        city = 'Mumbai'
        ip = '13143536'
        district = 'Mumbai City'
        state = 'MH'
        lat = 11.4652
        lon = 242.24

        # print(request.headers)

        image = request.files['image']
        detection = resnet.predict_image(image)
        print( detection)
        detection_split = detection.split('___')
        plant, disease = detection_split[0], detection_split[1]
        disease_info = mongo.db.disease.find_one({"name": detection})
        plant_info = mongo.db.plants.find_one({"commonName": plant})
        detectionHistory = {
            "createdAt": str(datetime.now()),
            "ip": ip,
            "city": city,
            "district": district,
            "state": state,
            "location": {
                "lat": lat,
                "lon": lon
            },
            "detected_class": detection,
            "plantId": plant_info['_id'],
            "diseaseId":ObjectId('507f191e810c19729de860ea') if disease_info == None  else disease_info['_id'],
            "rating": 5
        }

        validated_detectionHistory = validate_detectionHistory(detectionHistory)
        done = mongo.db.detectionHistory.insert_one(validated_detectionHistory['data'])
        response = flask.jsonify({'ok': True, 'detection': detection,
                                'validated_detectionHistory ': validated_detectionHistory, "plant": plant_info,
                                "disease": "No disease found" if disease_info == None else disease_info})
        # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return response
    #     return jsonify({'ok': True, 'detection': detection,'validated_detectionHistory ':validated_detectionHistory,"plant":plant_info,"disease":"No disease found" if disease_info==None else disease_info}), 200
    except Exception as ex:
        return flask.jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(ex)}), 500

    # print(ObjectId("623a3d74960a9f8526395e08"))
    # data = validate_detectionHistory({"createdAt":str(datetime.now()),"plantId":ObjectId("623a3d74960a9f8526395e08")})
    # if data['ok']:
    #     data = data['data']
    #     print(mongo.db.detectionHistory.find_one())
    #     print(type(mongo.db.detectionHistory.find_one()['_id']))
    #     mongo.db.detectionHistory.insert_one(data)
    #     return jsonify({'ok': True, 'message': 'User created successfully!','detectionHistory':data}), 200
