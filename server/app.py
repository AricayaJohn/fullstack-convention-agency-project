#!/usr/bin/env python3

from flask import Flask, make_response, jsonify, request
from flask_restful import Api, Resource
from flask_migrate import flask_migrate
from config import db, app
from models import Convention, ConventionArea, Attendee
import os

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class ConventionAreas(Resource):
    def get(self):
        areas = ConventionArea.query.all()
        return [area.to_dct(only=('id', 'location_name', 'venue')) for area in areas]

    def post(self):
        data = request.get_json()
        try:
            new_area = ConventionArea(
                location_name = data['location_name'],
                venue=data['venue']
            )
            db.session.add(new_area)
            db.session.commit()
            return make_response(new_area.to_dict(), 201)
        except ValueError:
            return make_response({'errors': ['validataion errors']}, 400)

class Conventions(Resource):
    def get(self):
        conventions = Convention.query.all()
        return [convention.to_dict(only=('id, convention_name', 'days', 'convention_area_id', 'attendee_id')) for convention in conventions]

    def post(self):
        data = request.get_json()
        try:
            new_convention = Convention(
                convention_name=data['convention_name'],
                days=data['days'],
                convention_area_id=data['convention_area_id'],
                attendee_id=data['attendee_id']
            )
            db.session.add(new_convention)
            db.session.commit()
            return make_response(new_convention.to_dict(), 201)
        except ValueError:
            return make_response({'errors': ['validation errors']}, 400)

class Attendees(Resource):
    def get(self):
        attendees = Attendee.query.all()
        return [attendee.to_dict(only=('id', 'name', 'profession')) for attendee in attendees ]

    def post(self):
        data = request.get_json()
        try:
            new_attendee = Attendee(
                name=data['name'],
                profession=data['profession']
            )
            db.session.add(new_attendee)
            db.session.commit()
            return make_response(new_attendee.to_dict(), 201)
        except ValueError:
            return make_response({'errors': ['validation errors']}, 400)

class ConventionById(Resource):
    def get(self,id):
        convention = db.session.get(Convention, id)
        if convention:
            return convention.to_dict(), 200
        return {'error': 'Convention not found'}, 404

    def patch(self, id):
        convention = db.session.get(Convention, id)
        if convention:
            data = request.get_json()
            for key, value in data.items():
                setattr(convention, key, value)
            db.session.commit()
            return make_response(convention.to_dict(), 202)
        return make_response({'error': 'Convention not found'}, 404)

    def delete(self, id):
        convention = db.session.get(Convention, id)
        if convention:
            db.session.delete(convention)
            db.session.commit()
            return '', 204
        return {'error': 'Convention not found'}, 404



if __name__ == '__main__':
    app.run(port=5555, debug=True)

