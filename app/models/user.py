from .db import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(64), nullable=False)
    
    # brews = db.relationship('Brew', back_populates="user", cascade='all, delete-orphan')
    # coffees = db.relationship('Coffee', back_populates="user", cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username
        }
    
    def __repr__(self):
        return f"<User {self.id} - {self.username}>"