from flask import Blueprint, jsonify, request
from ..models import Recipe, db
from ..utils import format_request

recipes = Blueprint('recipes', __name__)

@recipes.get('/')
def all_recipes():
    recipes = Recipe.query.all()
    return jsonify([recipe.to_dict() for recipe in recipes])

@recipes.get('/<int:id>')
def get_recipe(id):
    recipe:Recipe = Recipe.query.get(id)
    return recipe.to_dict()

@recipes.post('/')
def save_recipe():
    data = format_request(request.json)

    recipe = Recipe(**data)
    if recipe.water_amt and recipe.dose:
        recipe.ratio = round(recipe.water_amt / recipe.dose, 2)
    db.session.add(recipe)
    db.session.commit()

    # Gets the saved instance from the db
    db.session.refresh(recipe)

    return recipe.to_dict()