from flask import Blueprint, jsonify, request, session, Response
from sqlalchemy import desc
from ..models import Coffee, db
from ..utils import format_request, login_required
from typing import Sequence

coffees = Blueprint('coffees', __name__)

@coffees.get('/')
@login_required
def all_coffees() -> Response:
    """
    Retrieves all coffees that belong to the logged-in user.
    
    :return: A response object containing JSONified list of coffee dictionaries
    :rtype: Response
    """
    coffees:Sequence[Coffee] = db.session.scalars(db.select(Coffee).filter_by(user_id=session['user_id']).order_by(desc(Coffee.id))).all()
    return jsonify([coffee.to_dict() for coffee in coffees])


@coffees.get('/<int:id>')
def get_coffee(id) -> Response:
    """
    Retrieves one coffee, specified by it's id. This can be used by any user
    
    :param id: a coffee id
    :return: A response object containing a JSON coffee dictionary
    :rtype: Response
    """
    coffee:Coffee | None = Coffee.query.get(id)
    if not coffee:
        res = jsonify({"errors": {"coffee", "Couldn't find the coffee with the requested id"}})
        res.status_code = 404
        return res
    
    return jsonify(coffee.to_dict()) # status_code: 200 (auto)


@coffees.post('/')
@login_required
def save_coffee() -> Response:
    """
    Saves a new coffee to the database, automatically associated with the logged-in user
    
    :return: A response containing a JSON dictionary of the new coffee
    :rtype: Response
    """
    data = format_request(request.json)
    coffee = Coffee(**data)
    coffee.user_id = session['user_id']

    if coffee.country is None:
        res = jsonify({"errors": {"country": "Coffee must include a country of origin"}})
        res.status_code = 400
        return res
    if coffee.process is None:
        res = jsonify({"errors": {"process": "Coffee must include a process"}})
        res.status_code = 400
        return res
    if coffee.roaster is None:
        res = jsonify({"errors": {"roaster": "Coffee must include the name of a roastery or some unique identifier"}})
        res.status_code = 400
        return res

    db.session.add(coffee)
    db.session.commit()

    # Gets the saved instance from the db
    db.session.refresh(coffee)

    return jsonify(coffee.to_dict()) # status_code: 200 (auto)


@coffees.put('/<int:id>')
@login_required
def edit_coffee(id) -> Response:
    """
    Updates the coffee specified by 'id'. This route expects a request body containing only
    coffee-relevant keys.
    
    :param id: a coffee id
    :return: A response containing a JSON coffee dictionary representing the updated state
    :rtype: Response
    """
    data = format_request(request.json)

    coffee:Coffee | None = Coffee.query.get(id)

    if not coffee:
        res = jsonify({"errors": {"client_error", "Couldn't find the coffee with the requested id"}})
        res.status_code = 404
        return res
    if coffee.user_id != session['user_id']:
        res = jsonify({"errors": {"client_error": "Users cannot edit coffees that they did not create"}})
        res.status_code = 403
        return res

    for key in data:
        setattr(coffee, key, data[key])

    db.session.commit()
    db.session.refresh(coffee)

    return jsonify(coffee.to_dict()) # status_code: 200 (auto)


@coffees.delete('/<int:id>')
@login_required
def delete_coffee(id) -> Response:
    """
    Deletes the coffee with the specified 'id' from the database
    
    :param id: a coffee id
    :return: An empty response with a "204 - successfully deleted" status code
    :rtype: Response
    """
    coffee = Coffee.query.get(id)
    if coffee is None:
        res = jsonify({"errors": {"client_error": "Couldn't find the selected coffee"}})
        res.status_code = 400
        return res

    if coffee.user_id != session['user_id']:
        res = jsonify({"errors": {"client_error": "Users cannot delete coffees that they did not create"}})
        res.status_code = 403
        return res

    db.session.delete(coffee)
    db.session.commit()

    res = Response(status=204)
    return res