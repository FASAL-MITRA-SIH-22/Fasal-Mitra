from app.controllers import blueprint,mongo,jsonify,datetime,resnet,request
from app.schemas import validate_detectionHistory
from bson.objectid import ObjectId

@blueprint.route('/api/dl',methods=["GET"])
def hello():
    return 'Hello, World!'

@blueprint.route('/api/dl/prediction/test',methods=['GET'])
def test1():
    print(ObjectId("623a3d74960a9f8526395e08"))
    data = validate_detectionHistory({"createdAt":str(datetime.now()),"plantId":ObjectId("623a3d74960a9f8526395e08")})
    if data['ok']:
        data = data['data']
        print(mongo.db.detectionHistory.find_one())
        print(type(mongo.db.detectionHistory.find_one()['_id']))
        mongo.db.detectionHistory.insert_one(data)
        return jsonify({'ok': True, 'message': 'User created successfully!','detectionHistory':data}), 200
    
    return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400

@blueprint.route('/api/dl/detection',methods=['POST'])
def dl_detection():
    try:
        uid = request.headers['uid']
        city = request.headers['city']
        ip = request.headers['ip']
        district = request.headers['district']
        state = request.headers['state']
        lat = request.form['lat'] if(request.form['lat']) else request.headers['lat']

        image =request.files['image']
        detection = resnet.predict_image(image)

        lat = request.form['lon'] if(request.form['lon']) else request.headers['lon']

        detectionHistory = {
        "createdAt": str(datetime.now()),
        "ip": ip,
        "city":city,
        "district":district,
        "state":state,
        "location": {
            "lat":lat,
            "lon":lon
        },
        "detected_class":detection
        "plantId":ObjectId("623a3d74960a9f8526395e08"),
        "diseaseId":ObjectId("623a3d74960a9f8526395e08"),
        "rating":5
        }

        data = validate_detectionHistory(data)

        return jsonify({'ok': True, 'detection': detection,'data':data}), 200
    except:
        return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400



    # print(ObjectId("623a3d74960a9f8526395e08"))
    # data = validate_detectionHistory({"createdAt":str(datetime.now()),"plantId":ObjectId("623a3d74960a9f8526395e08")})
    # if data['ok']:
    #     data = data['data']
    #     print(mongo.db.detectionHistory.find_one())
    #     print(type(mongo.db.detectionHistory.find_one()['_id']))
    #     mongo.db.detectionHistory.insert_one(data)
    #     return jsonify({'ok': True, 'message': 'User created successfully!','detectionHistory':data}), 200
    

