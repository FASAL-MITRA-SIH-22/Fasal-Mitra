from app.controllers import blueprint,mongo,jsonify,datetime,resnet,request
from app.schemas import validate_detectionHistory
from bson.objectid import ObjectId

@blueprint.route('/',methods=["GET"])
def hello():
    return 'Hello, World!'

@blueprint.route('/prediction/test',methods=['GET'])
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

@blueprint.route('/dl/detection',methods=['POST'])
def dl_detection():
    try:
        # uid = request.headers['uid']
        # city = request.headers['city']
        # district = request.headers['district']
        # state = request.headers['state']
        # lat = request.headers['lat']
        # lon = request.headers['lon']
        print(request.headers)
        return

    #     detectionHistory = {
    #     "createdAt": str(datetime.now()),
    #     "ip": "1234",
    #     "city":"",
    #     "district":,
    #     "state":,
    #     "location": {
    #         "x":,
    #         "y":
    #     },
    #     "plantId":ObjectId("623a3d74960a9f8526395e08"),
    #     "diseaseId":ObjectId("623a3d74960a9f8526395e08"),
    #     "rating":5
    # },

    #     data = validate_detectionHistory(data)


    #     image =request.files['image']
    #     detection = resnet.predict_image(image)
    #     return jsonify({'ok': True, 'detection': detection,'data':data}), 200
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
    

