from app.controllers import blueprint,tfmodels,mongo,jsonify,datetime
from app.schemas import validate_detectionHistory

@blueprint.route('/',methods=["GET"])
def hello():
    return 'Hello, World!'

@blueprint.route('/prediction',methods=['POST'])
def predict():
    crop_image =request.files['crop_image']
    crop_name =request.form['crop_name']

    predicted_class, confidence = tfmodels.getPrediction(crop_image,crop_name)
    return jsonify({'predicted_class':predicted_class,'confidence':confidence})

@blueprint.route('/test',methods=['GET'])
def test():
    return jsonify({'predicted_class':'helo','confidence':'hello'}),200

@blueprint.route('/prediction/test',methods=['GET'])
def test1():
    data = validate_detectionHistory({"createdAt":datetime.now()})
    if data['ok']:
        data = data['data']
        mongo.db.detectionHistory.insert_one(data)
        return jsonify({'ok': True, 'message': 'User created successfully!','detectionHistory':data}), 200
    
    return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400


