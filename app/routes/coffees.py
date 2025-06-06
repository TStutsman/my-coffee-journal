from flask import Blueprint, jsonify, request
from ..models import Coffee, db
from ..utils import format_request

coffees = Blueprint('coffees', __name__)

@coffees.get('/')
def all_coffees():
    coffees:list[Coffee] = Coffee.query.all()
    return jsonify([coffee.to_dict() for coffee in coffees])

@coffees.get('/<int:id>')
def get_coffee(id):
    coffee:Coffee = Coffee.query.get(id)
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

    coffee:Coffee = Coffee.query.get(id)

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