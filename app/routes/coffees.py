from flask import Blueprint, jsonify, request, session
from ..models import Coffee, db
from ..utils import format_request
from typing import Sequence

coffees = Blueprint('coffees', __name__)

@coffees.get('/')
def all_coffees():
    if session is None or 'user_id' not in session:
        return {"errors": {"client_error": "Invalid session token"}}, 400
 
    coffees:Sequence[Coffee] = db.session.scalars(db.select(Coffee).filter_by(user_id=session['user_id'])).all()
    return jsonify([coffee.to_dict() for coffee in coffees])

@coffees.get('/<int:id>')
def get_coffee(id):
    coffee:Coffee | None = Coffee.query.get(id)
    if not coffee:
        return {"errors": {"coffee", "Couldn't find the coffee with the requested id"}}, 404
    return coffee.to_dict()

@coffees.post('/')
def save_coffee():
    data = format_request(request.json)

    coffee = Coffee(**data)
    db.session.add(coffee)
    db.session.commit()

    # Gets the saved instance from the db
    db.session.refresh(coffee)

    return coffee.to_dict()

@coffees.put('/<int:id>')
def edit_coffee(id):
    data = format_request(request.json)

    coffee:Coffee | None = Coffee.query.get(id)

    if not coffee:
        return {"errors": {"coffee", "Couldn't find the coffee with the requested id"}}, 404

    for key in data:
        setattr(coffee, key, data[key])

    db.session.commit()
    db.session.refresh(coffee)

    return coffee.to_dict()

@coffees.delete('/<int:id>')
def delete_coffee(id):
    coffee = Coffee.query.get(id)

    db.session.delete(coffee)
    db.session.commit()

    return "", 204