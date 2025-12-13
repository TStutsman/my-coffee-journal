from .db import db
from sqlalchemy import func

class Brew(db.Model):
    __tablename__ = 'brews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    coffee_id = db.Column(db.Integer, db.ForeignKey('coffees.id'))
    grinder = db.Column(db.String(50))
    grind_size = db.Column(db.Numeric(scale=2))
    dose = db.Column(db.Numeric(scale=2))
    brewer = db.Column(db.String(50))
    water_amt = db.Column(db.Numeric(scale=2))
    water_temp = db.Column(db.Numeric(scale=0))
    celsius = db.Column(db.Boolean)
    ratio = db.Column(db.Numeric(scale=4))
    recipe = db.Column(db.String)
    notes = db.Column(db.String, server_default='')
    rating = db.Column(db.Numeric(scale=1))
    date = db.Column(db.String(12), server_default=func.current_date())

    user = db.relationship('User', back_populates="brews")
    coffee = db.relationship('Coffee', back_populates='brews')

    def to_dict(self):
        return {
            "id": self.id,
            "coffee_id": self.coffee_id,
            "coffee": self.coffee.to_dict(),
            "grinder": self.grinder,
            "grind_size": self.grind_size,
            "dose": self.dose,
            "brewer": self.brewer,
            "water_amt": self.water_amt,
            "water_temp": self.water_temp,
            "celsius": self.celsius,
            "ratio": self.ratio,
            "recipe": self.recipe,
            "notes": self.notes,
            "rating": self.rating,
            "date": self.date
        }
    
    def __repr__(self):
        return f"<Brew {self.id} coffee_id={self.coffee_id} date={self.date}>"