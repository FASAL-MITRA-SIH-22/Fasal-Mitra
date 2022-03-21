from flask import Blueprint,jsonify
from app.load_models import TfModels
from app.db_config import mongo
from datetime import datetime

blueprint = Blueprint(
      'app_blueprint',
    __name__,
    url_prefix='',
)

tfmodels = TfModels()