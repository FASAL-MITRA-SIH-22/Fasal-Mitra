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
    crop_image =request.files['crop_image']
    crop_name =request.form['crop_name']

    predicted_class, confidence = tfmodels.getPrediction(crop_image,crop_name)
    return f"{predicted_class},{confidence}"
