from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class ConventionArea(db.Model, SerializerMixin):
    __tablename__ = 'convention_areas'

    id = db.Column(db.Integer, primary_key=True)
    location_name = db.Column(db.String, nullable=False)
    venue = db.Column(db.String, nullable=False)

    conventions = db.relationship('Convention', backref='convention_area', cascade="all, delete-orphan")

    serialize_rules = ('-conventions.convention_area',)

class Attendee(db.Model, SerializerMixin):
    __tablename__ = 'attendees'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    profession = db.Column(db.String, nullable=False)

    serialize_rules = ('-conventions.attendees',)

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Attendee name cannot be empty')
        return name

    @validates('profession')
    def validate_profession(self, key, profession):
        if not prodession:
            raise ValueError('Profession cannot be empty')
        return profession

class Convention(db.Model, SerializerMixin):
    __tablename__ = 'conventions'

    id = db.Column(db.Integer, primary_key=True)
    convention_name = db.Column(db.String, nullable=False)
    days = db.Column(db.Integer, nullable=False)

    convention_area_id = db.Column(db.Integer, db.ForeignKey('convention_areas.id'), nullable=False)
    attendee_id = db.Column(db.Integer, db.ForeignKey('attendees.id'), nullable=False)

    serialize_rules = ('-convention_area.conventions', '-attendees.conventions')

    @validates('attendee_id')
    def validate_attendee_id(self, key, attendee_id):
        if not isinstance(attendee_id, int):
            raise ValueError("attendees id must have an integer value")

    @validates('convention_area_id')
    def validate_convention_areas_id(self, key, convention_area_id):
        if not isinstance(convention_area_id, int):
            raise ValueError('convention area id must have an integer value')