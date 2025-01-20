#!/usr/bin/env python3
from app import app
from models import db, Convention, ConventionArea, Attendee

class clear_data():
    Convention.query.delete()
    ConventionArea.query.delete()
    Attendee.query.delete()
    db.session.commit()

def add_convention_areas():
    area1 = ConventionArea(location_name='Los Angeles Convention', venue='Staples Center')
    area2 = ConventionArea(location_name='San Francisco Convention', venue='Oracle Arena')

    db.session.add_all([area1, area2])
    db.session.commit()

def add_attendees():
    attendee1 = Attendee(name='John Smith', profession='Software Engineer')
    attendee2 = Attendee(name='Jane Doe', profession='Restaurant Owner')

    db.session.add_all([attendee1, attendee2])
    db.session.commit()

def add_convention():
    convention1 = Convention(convention_name='Tech conference 2025', days=3, convention_area_id=2, attendee_id=1)
    convention2  = Convention(convention_name='Food Convention Festival', days=5, convention_area_id=1, attendee_id=2)

    db.session.add_all([convention1,convention2])
    db.session.commit()


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
