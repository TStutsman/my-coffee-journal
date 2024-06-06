from .db import db

class FlavorNote(db.Model):
    __tablename__ = 'flavor_notes'

    id = db.Column(db.Integer, primary_key=True)
    note = db.Column(db.String(50), nullable=False)

    coffees = db.relationship('Coffee', secondary='coffees_flavor_notes', back_populates='notes')

class CoffeeFlavorNote(db.Model):
    __tablename__ = 'coffees_flavor_notes'
    coffee_id = db.Column(db.Integer, db.ForeignKey('coffees.id'), primary_key=True)
    flavor_note_id = db.Column(db.Integer, db.ForeignKey('flavor_notes.id'), primary_key=True)

class Coffee(db.Model):
    __tablename__ = "coffees"

    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(50), nullable=False)
    region = db.Column(db.String(50))
    farm = db.Column(db.String(50))
    varietal = db.Column(db.String(50))
    process = db.Column(db.String(50), nullable=False)
    roaster = db.Column(db.String(50), nullable=False)
    roast_profile = db.Column(db.String(25))

    brews = db.relationship('Brew', back_populates='coffee')
    notes = db.relationship('FlavorNote', secondary='coffees_flavor_notes', back_populates='coffees')
    
    def to_dict(self):
        return {
            "id": self.id,
            "country": self.country,
            "region": self.region,
            "farm": self.farm,
            "varietal": self.varietal,
            "process": self.process,
            "roaster": self.roaster,
            "roast_profile": self.roast_profile,
        }
    
    def __repr__(self):
        return f"<Coffee {self.id} country={self.country} roaster={self.roaster}>"