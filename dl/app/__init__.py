from flask import Flask
import os
import datetime
import json
from bson.objectid import ObjectId
from dotenv import load_dotenv
from app.controllers.detectionHistory import blueprint

load_dotenv()

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, set):
            return list(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)


def create_app():
    app = Flask(__name__)
    app.register_blueprint(blueprint)
    app.json_encoder = JSONEncoder
    # app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    app.config["MONGO_URI"] = "mongodb+srv://fasalmitra:fasalmitra2022@cluster0.k8bxu.mongodb.net/mainDB?retryWrites=true&w=majority"
    from app.db_config import mongo
    mongo.init_app(app)
    return app

