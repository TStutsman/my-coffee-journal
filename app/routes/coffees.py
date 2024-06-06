from flask import Blueprint, jsonify, request
from ..models import Coffee, db
from ..utils import format_request

coffees = Blueprint('coffees', __name__)

@coffees.get('/')
def all_coffees():
    coffees = Coffee.query.all()
    return jsonify([coffee.to_dict() for coffee in coffees])

@coffees.post('/')
def save_coffee():
    data = format_request(request.json)

    coffee = Coffee(**data)
    db.session.add(coffee)
    db.session.commit()

    # Gets the saved instance from the db
    db.session.refresh(coffee)

    return coffee.to_dict()