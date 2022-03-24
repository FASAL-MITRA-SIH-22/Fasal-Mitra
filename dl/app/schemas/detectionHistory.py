from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

detectionHistory_schema = {
    "type": "object",
    "properties": {
        "createdAt": {
            "type": "string",
            "format": "date-time"
        },
        "ip": {
            "type": "string",
        },
        "city":{
            "type": "string",
        },
        "district":{
            "type": "string",
        },
        "state":{
            "type": "string",
        },
        "location": {
            "x":{
                 "type": "number",
            },
            "y":{
                 "type": "number",
            }
        },
        "detected_class":{
            "type": "string",
        },
        "plantId":{
            "bsonType":"string"
        },
        "diseaseId":{
            "bsonType":"string"
        },
        "rating":{
            "type":"number",
            "default":5
        }
    },
    "additionalProperties": False
}


def validate_detectionHistory(data):
    try:
        validate(data, detectionHistory_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}