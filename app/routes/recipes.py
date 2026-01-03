from flask import Blueprint, jsonify, request, Response, session
from ..models import Recipe, db
from ..utils import format_request, login_required
from typing import List

recipes = Blueprint('recipes', __name__)

@recipes.get('/')
@login_required
def all_recipes() -> Response:
    recipes:List[Recipe] = Recipe.query.filter_by(user_id=session['user_id']).all()
    return jsonify([recipe.to_dict() for recipe in recipes]) # status_code: 200 (auto)

@recipes.get('/<int:id>')
def get_recipe(id) -> Response:
    recipe:Recipe | None = Recipe.query.get(id)
    if recipe is None:
        res = jsonify({"errors": {"client_error": "Couldn't find recipe with the specified id"}})
        res.status_code = 404
        return res

    return jsonify(recipe.to_dict()) # status_code: 200 (auto)

@recipes.post('/')
@login_required
def save_recipe() -> Response:
    data = format_request(request.json)

    recipe = Recipe(**data)
    recipe.user_id = session['user_id']
    if recipe.water_amt and recipe.dose:
        recipe.ratio = round(recipe.water_amt / recipe.dose, 2)
    db.session.add(recipe)
    db.session.commit()

    # Gets the saved instance from the db
    db.session.refresh(recipe)

    return jsonify(recipe.to_dict()) # status_code: 200 (auto)