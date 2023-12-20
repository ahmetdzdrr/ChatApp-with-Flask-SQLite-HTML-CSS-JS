from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    mail = db.Column(db.String(120), unique=True, nullable=False)
    check_mail = db.Column(db.Boolean, default=False)
    verification_code = db.Column(db.String(32), unique=True)
    rooms = relationship('Room', back_populates='admin')


class Room(db.Model):
    __tablename__ = 'room'
    id = db.Column(db.Integer, primary_key=True)
    room_name = db.Column(db.String(100), nullable=False)
    room_code = db.Column(db.String(100), unique=True, nullable=False)
    room_password = db.Column(db.String(100), nullable=True)
    admin_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    admin = relationship('User', back_populates='rooms')
    participants = db.relationship('User', secondary='participants', back_populates='rooms')


class Participants(db.Model):
    __tablename__ = 'participants'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), primary_key=True)