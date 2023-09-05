from flask import abort, make_response

from config import db
from models import Person, people_schema, person_schema

import os
import logging
import json_log_formatter

formatter = json_log_formatter.JSONFormatter()

json_handler = logging.FileHandler(filename=f'{os.getcwd()}/my-log.json')
json_handler.setFormatter(formatter)

logger = logging.getLogger('my_json')
logger.addHandler(json_handler)
logger.setLevel(logging.INFO)

def read_all():
    people = Person.query.all()
    return people_schema.dump(people)


def create(person):
    new_person = person_schema.load(person, session=db.session)
    db.session.add(new_person)
    db.session.commit()
    
    logger.info(f'Person {new_person.fname} Created!', extra={'referral_code': 'danieltest123'})
    
    return person_schema.dump(new_person), 201


def read_one(person_id):
    person = Person.query.get(person_id)

    if person is not None:
        return person_schema.dump(person)
    else:
        abort(404, f"Person with ID {person_id} not found")


def update(person_id, person):
    existing_person = Person.query.get(person_id)

    if existing_person:
        update_person = person_schema.load(person, session=db.session)
        existing_person.fname = update_person.fname
        existing_person.lname = update_person.lname
        db.session.merge(existing_person)
        db.session.commit()
        return person_schema.dump(existing_person), 201
    else:
        abort(404, f"Person with ID {person_id} not found")


def delete(person_id):
    existing_person = Person.query.get(person_id)

    if existing_person:
        db.session.delete(existing_person)
        db.session.commit()
        return make_response(f"{person_id} successfully deleted", 200)
    else:
        abort(404, f"Person with ID {person_id} not found")
