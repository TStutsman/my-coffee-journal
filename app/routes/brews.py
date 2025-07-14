from flask import Blueprint, jsonify, request
from sqlalchemy import desc
from ..models import Brew, db
from ..utils import format_request

brews = Blueprint('brews', __name__)

@brews.get('/')
def all_brews():
    brews = Brew.query.order_by(desc(Brew.date)).order_by(desc(Brew.id)).all()
    return jsonify([brew.to_dict() for brew in brews])

@brews.get('/<int:id>')
def get_brew(id):
    brew:Brew = Brew.query.get(id)
    return brew.to_dict()

@brews.post('/')
def save_brew():
    data = format_request(request.json)

    brew = Brew(**data)
    if brew.water_amt and brew.dose:
        brew.ratio = round(float(brew.water_amt) / float(brew.dose), 2)
    db.session.add(brew)
    db.session.commit()

    # Gets the saved instance from the db
    db.session.refresh(brew)

    return brew.to_dict()

@brews.put('/<int:id>')
def update_brew(id):
    data = format_request(request.json)

    brew:Brew = Brew.query.get(id)
    for key in data:
        setattr(brew, key, data[key])

    if brew.water_amt and brew.dose:
        brew.ratio = round(float(brew.water_amt) / float(brew.dose), 2)
    
    db.session.commit()

    db.session.refresh(brew)

    return brew.to_dict()

@brews.delete('/<int:id>')
def delete_brew(id):
    brew:Brew = Brew.query.get(id)

    db.session.delete(brew)
    db.session.commit()

    return "", 204