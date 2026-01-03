from .db import db

class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(50))
    grinder = db.Column(db.String(50))
    grind_size = db.Column(db.Numeric(scale=2))
    dose = db.Column(db.Numeric(scale=2))
    brewer = db.Column(db.String(50))
    water_amt = db.Column(db.Numeric(scale=2))
    water_temp = db.Column(db.Numeric(scale=0))
    celsius = db.Column(db.Boolean)
    ratio = db.Column(db.Numeric(scale=4))
    details = db.Column(db.String)

    user = db.relationship('User', back_populates="recipes")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "grinder": self.grinder,
            "grind_size": self.grind_size,
            "dose": self.dose,
            "brewer": self.brewer,
            "water_amt": self.water_amt,
            "water_temp": self.water_temp,
            "celsius": self.celsius,
            "ratio": self.ratio,
            "details": self.details,
        }
    
    def __repr__(self):
        return f"<Recipe {self.id}>"