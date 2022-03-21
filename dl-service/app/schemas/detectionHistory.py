from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

detectionHistory_schema = {
    "type": "object",
    "properties": {
        "createdAt": {
            "type": "string",
        },
        "ip": {
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
        "plantId":{
            "type":"string"
        },
        "diseaseId":{
            "type":"string"
        },
        "rating":{
            "type":"number"
        }
    },
    # "required": ["email", "password"],
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