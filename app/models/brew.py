from .db import db
from sqlalchemy import func

class Brew(db.Model):
    __tablename__ = 'brews'

    id = db.Column(db.Integer, primary_key=True)
    coffee_id = db.Column(db.Integer, db.ForeignKey('coffees.id'))
    grinder = db.Column(db.String(50))
    grind_size = db.Column(db.Numeric(scale=2))
    dose = db.Column(db.Numeric(scale=2))
    brewer = db.Column(db.String(50))
    water_amt = db.Column(db.Numeric(scale=2))
    ratio = db.Column(db.Numeric(scale=4))
    recipe = db.Column(db.String)
    rating = db.Column(db.Numeric(scale=1))
    date = db.Column(db.Date, server_default=func.current_date())

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
            "ratio": self.ratio,
            "recipe": self.recipe,
            "rating": self.rating,
            "date": self.date
        }
    
    def __repr__(self):
        return f"<Brew {self.id} coffee_id={self.coffee_id} ratio={self.ratio}>"