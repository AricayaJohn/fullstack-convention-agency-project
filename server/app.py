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




if __name__ == '__main__':
    app.run(port=5555, debug=True)

