from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(20), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), unique=False, nullable=True)
    last_name = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User: {self.id} - {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'is_admin': self.is_admin,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'posts': [row.serialize() for row in self.posts_to]}
    

class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('following_to', lazy='select'))
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('follower_to', lazy='select'))

    def __repr__(self):
        return f'following: {self.following_id} - follower: {self.follower_id}'
                

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=False)
    description = db.Column(db.String, unique=False, nullable=True)
    body = db.Column(db.String, unique=False, nullable=False)
    date = db.Column(db.DateTime, nullable=False) #Tomar valor por defecto
    image_url = db.Column(db.String) # url de Cloudinary
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('posts_to', lazy='select'))

    def __repr__(self):
        return f'Post: {self.id} - {self.title}'
    
    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'body': self.body,
                'date': self.date,
                'image_url': self.image_url,
                'user_id': self.user_id,}
    
#     {
#     "title": "Column",
#     "description": "db.Column(db.String, unique=False, nullable=True)",
#     "body": "= db.Column(db.String, unique=False, nullable=False)",
#     "image_url": "= db.Column(db.String)   # La url, la obtenmos de cloudinary",
#     "user_id": 4
# }


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, unique=False, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('comments_to', lazy='select'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('comments_to', lazy='select'))

    def __repr__(self):
        return f'Comment: {self.id} - {self.user_id} - {self.body}'


class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.Enum('image', 'video', 'podcast', name="media_type"))
    url = db.Column(db.String)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), unique=True)
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('medias_to', lazy='select'))

    def __repr__(self):
        return f'Comment: {self.id} - {self.media_type} - {self.url}'


class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=False, nullable=False)
    height = db.Column(db.String, unique=False, nullable=False)
    mass = db.Column(db.String, unique=False, nullable=False)
    hair_color = db.Column(db.String, unique=False, nullable=False)
    skin_color = db.Column(db.String, unique=False, nullable=False)
    eye_color = db.Column(db.String, unique=False, nullable=False)
    birth_year = db.Column(db.String, unique=False, nullable=False)
    gender = db.Column(db.String, unique=False, nullable=False)

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'name': self.name,
                'height': self.height,
                'mass': self.mass,
                'hair_color': self.hair_color,
                'skin_color': self.skin_color,
                'eye_color': self.eye_color,
                'birth_year': self.birth_year,
                'gender': self.gender,
                # 'characters': [row.serialize() for row in self.characters_to]
                }


class CharacterFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    users_to = db.relationship('Users', foreign_keys=[users_id], backref=db.backref('characterFavorites_to', lazy='select'))
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    character_to = db.relationship('Characters', foreign_keys=[character_id], backref=db.backref('characterFavorites_to', lazy='select'))


class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=False, nullable=False)
    diameter = db.Column(db.String, unique=False, nullable=False)
    rotation_period = db.Column(db.String, unique=False, nullable=False)
    orbital_period = db.Column(db.String, unique=False, nullable=False)
    gravity = db.Column(db.String, unique=False, nullable=False)
    population = db.Column(db.String, unique=False, nullable=False)
    climate = db.Column(db.String, unique=False, nullable=False)
    terrain = db.Column(db.String, unique=False, nullable=False)

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'name': self.name,
                'diameter': self.diameter,
                'rotation_period': self.rotation_period,
                'orbital_period': self.orbital_period,
                'gravity': self.gravity,
                'population': self.population,
                'climate': self.climate,
                'terrain': self.terrain,}


class PlanetFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    users_to = db.relationship('Users', foreign_keys=[users_id], backref=db.backref('planetFavorites_to', lazy='select'))
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'))
    planet_to = db.relationship('Planets', foreign_keys=[planet_id], backref=db.backref('planetFavorites_to', lazy='select'))


class Starships(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=False, nullable=False)
    passengers = db.Column(db.String, unique=False, nullable=False)
    crew = db.Column(db.String, unique=False, nullable=False)
    length = db.Column(db.String, unique=False, nullable=False)
    consumables = db.Column(db.String, unique=False, nullable=False)
    cargo_capacity = db.Column(db.String, unique=False, nullable=False)
    cost_in_credits = db.Column(db.String, unique=False, nullable=False)
    hyperdrive_rating = db.Column(db.String, unique=False, nullable=False)
    manufacturer = db.Column(db.String, unique=False, nullable=False)
    starship_class = db.Column(db.String, unique=False, nullable=False)

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'name': self.name,
                'passengers': self.passengers,
                'crew': self.crew,
                'length': self.length,
                'consumables': self.consumables,
                'cargo_capacity': self.cargo_capacity,
                'cost_in_credits': self.cost_in_credits,
                'hyperdrive_rating': self.hyperdrive_rating,
                'manufacturer': self.manufacturer,
                'starship_class': self.starship_class}