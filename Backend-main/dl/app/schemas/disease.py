from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

disease_schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
        },
        "thumbnail": {
            "type": "string",
        },
        "symptoms": {
            "type": "string",
        },
        "trigger": {
            "type": "string",
        },
        # "pathogen": {
        #     "type": "string",
        # },
        "organic": {
            "type": "string",
        },
        "chemical": {
            "type": "string",
        },
    },
    # "required": ["email", "password"],
    "additionalProperties": False
}


def validate_disease(data):
    try:
        validate(data, disease_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}
