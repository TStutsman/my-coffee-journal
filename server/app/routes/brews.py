from flask import Blueprint, jsonify, request
from ..models import Brew, db
from ..utils import format_request

brews = Blueprint('brews', __name__)

@brews.get('/')
def all_brews():
    brews = Brew.query.all()
    return jsonify([brew.to_dict() for brew in brews])

@brews.post('/')
def save_brew():
    data = format_request(request.json)

    brew = Brew(**data)
    db.session.add(brew)
    db.session.commit()

    # Gets the saved instance from the db
    db.session.refresh(brew)

    return brew.to_dict()