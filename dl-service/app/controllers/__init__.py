from flask import Blueprint,jsonify,request
from app.load_models import TfModels
from app.db_config import mongo
from datetime import datetime
from app.resnet import ResNet

blueprint = Blueprint(
      'app_blueprint',
    __name__,
    url_prefix='',
)

tfmodels = TfModels()
resnet = ResNet()
