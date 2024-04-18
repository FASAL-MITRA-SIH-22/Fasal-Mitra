from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

plant_schema = {
    "type": "object",
    "properties": {
        "commonName": {
            "type": "string",
        },
        "scientificName": {
            "type": "string",
        },
        "description":{
            "type": "string",
        },
        "thumbnail":{
            "type": "string",
        },
        "diseases":[
            "bsonType":"string"
        ]
    },
    # "required": ["email", "password"],
    "additionalProperties": False
}


def validate_plant(data):
    try:
        validate(data, plant_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}