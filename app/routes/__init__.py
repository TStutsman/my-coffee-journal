from flask import Blueprint
from .coffees import coffees
from .brews import brews
from .recipes import recipes
from .users import users

api = Blueprint("api", __name__)
api.register_blueprint(coffees, url_prefix='/coffees')
api.register_blueprint(brews, url_prefix='/brews')
api.register_blueprint(recipes, url_prefix='/recipes')
api.register_blueprint(users, url_prefix='/users')

@api.get('/')
def test():
    return "API HOME"