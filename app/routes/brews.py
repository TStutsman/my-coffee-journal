from flask import Blueprint, jsonify, request, Response, session
from sqlalchemy import desc
from ..models import Brew, db
from ..utils import format_request, login_required
from typing import Sequence

brews = Blueprint('brews', __name__)

@brews.get('/')
@login_required
def all_brews() -> Response:
    """
    Retrieves all the brews created by the logged-in user, ordering them first by date, then by id
    
    :return: a response containing a JSON list of brew dictionaries
    :rtype: Response
    """
    brews:Sequence[Brew] = Brew.query.filter_by(user_id=session['user_id']).order_by(desc(Brew.date)).order_by(desc(Brew.id)).all()
    return jsonify([brew.to_dict() for brew in brews]) # status_code: 200 (auto)


@brews.get('/<int:id>')
def get_brew(id) -> Response:
    """
    Retrieves the brew with the specified id
    
    :param id: a brew id
    :return: a response containing a JSON brew dictionary
    :rtype: Response
    """
    brew:Brew | None = Brew.query.get(id)
    if brew is None:
        res = jsonify({"errors": {"id": "Could not find a brew with the specified id"}})
        res.status_code = 404
        return res
    
    return jsonify(brew.to_dict()) # status_code: 200 (auto)


@brews.post('/')
@login_required
def save_brew() -> Response:
    """
    Creates a new brew, belonging to the logged-in user, and saves it to the db
    
    :return: a response containing a JSON dictionary of the new brew
    :rtype: Response
    """
    data = format_request(request.json)

    brew = Brew(**data)
    brew.user_id = session['user_id']
    if brew.water_amt and brew.dose:
        brew.ratio = round(float(brew.water_amt) / float(brew.dose), 2)
    db.session.add(brew)
    db.session.commit()

    # Gets the saved instance from the db
    db.session.refresh(brew)

    return jsonify(brew.to_dict()) # status_code: 200 (auto)


@brews.put('/<int:id>')
@login_required
def update_brew(id) -> Response:
    """
    Updates the brew specified by 'id'
    
    :param id: a brew id
    :return: a response containing a JSON dictionary with the updated state
    :rtype: Response
    """
    data = format_request(request.json)

    brew:Brew | None = Brew.query.get(id)
    if brew is None:
        res = jsonify({"errors": {"id": "Could not find a brew with the specified id"}})
        res.status_code = 404
        return res
    if brew.user_id != session['user_id']:
        res = jsonify({"errors": {"client_error": "Users may not edit brews they did not create"}})
        res.status_code = 403
        return res

    for key in data:
        setattr(brew, key, data[key])

    if brew.water_amt and brew.dose:
        brew.ratio = round(float(brew.water_amt) / float(brew.dose), 2)
    
    db.session.commit()

    db.session.refresh(brew)

    return jsonify(brew.to_dict()) # status_code: 200 (auto)


@brews.delete('/<int:id>')
@login_required
def delete_brew(id) -> Response:
    """
    Deletes the brew specified by 'id' from the db
    
    :param id: a brew id
    :return: an empty response with code "204 - Successfully Deleted"
    :rtype: Response
    """
    brew:Brew | None = Brew.query.get(id)
    if brew is None:
        res = jsonify({"errors": {"id": "Could not find a brew with the specified id"}})
        res.status_code = 404
        return res
    if brew.user_id != session['user_id']:
        res = jsonify({"errors": {"client_error": "Users may not edit brews they did not create"}})
        res.status_code = 403
        return res

    db.session.delete(brew)
    db.session.commit()

    res = Response(status=204)
    return res