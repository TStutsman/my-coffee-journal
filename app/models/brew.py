from .db import db

class Brew(db.Model):
    __tablename__ = 'brews'

    id = db.Column(db.Integer, primary_key=True)
    coffee_id = db.Column(db.Integer, db.ForeignKey('coffees.id'))
    grinder = db.Column(db.String(50))
    grind_size = db.Column(db.Numeric(scale=2))
    brewer = db.Column(db.String(50))
    ratio = db.Column(db.Numeric(scale=4))

    coffee = db.relationship('Coffee', back_populates='brews')

    def to_dict(self):
        return {
            "id": self.id,
            "coffee_id": self.coffee_id,
            "coffee": self.coffee.to_dict(),
            "grinder": self.grinder,
            "grind_size": self.grind_size,
            "brewer": self.brewer,
            "ratio": self.ratio
        }
    
    def __repr__(self):
        return f"<Brew {self.id} coffee_id={self.coffee_id} ratio={self.ratio}>"