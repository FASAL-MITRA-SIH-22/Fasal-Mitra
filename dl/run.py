
from distutils.log import debug
from app import create_app

create_app().run(host="0.0.0.0", port=5000,debug=True)
