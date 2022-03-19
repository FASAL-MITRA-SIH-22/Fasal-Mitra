from flask import Blueprint, request
from app.load_models import TfModels

blueprint = Blueprint(
      'app_blueprint',
    __name__,
    url_prefix='',
)

tfmodels = TfModels()

@blueprint.route('/')
def hello():
    return 'Hello, World!'

@blueprint.route('/prediction',methods=['POST'])
def predict():
    print(request.json)
    crop_image =request.files['crop_image']
    crop_name =request.json['crop_name']

    print(tfmodels.getPrediction(crop_image,crop_name))
