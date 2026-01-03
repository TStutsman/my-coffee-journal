from .db import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(64), nullable=False)
    
    brews = db.relationship('Brew', back_populates="user", cascade='all, delete-orphan')
    coffees = db.relationship('Coffee', back_populates="user", cascade='all, delete-orphan')
    recipes = db.relationship('Recipe', back_populates="user", cascade="all, delete-orphan")

    def check_password(self, password_attempt) -> bool:
        """
        Checks an attempt string against the stored password hash
        
        :param self: an instance of User
        :param password_attempt: Hashed password attempt submitted by a user
        :return: True if the passwords match, False otherwise
        :rtype: bool
        """
        return self.password == password_attempt
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username
        }
    
    def __repr__(self):
        return f"<User {self.id} - {self.username}>"