"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from api.models import db, Users, Posts, Characters, Planets, Starships
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token
import requests


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active)).scalar()
    print(user)
    print("***********valor de user**********", user)
    if not user:
        response_body["message"] = "Bad email or password"
        return response_body, 401
    access_token = create_access_token(identity={'email' : user.email, 'user_id' : user.id, 'is_admin' : user.is_admin})
    response_body["message"] = f"Bienvenido {email}"
    response_body["access_token"] = access_token
    response_body["results"] = {}
    return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    response_body['logged_in_as'] = current_user
    return response_body, 200


@api.route('/users')
@jwt_required()
def users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    result = [row.serialize() for row in rows]
    response_body['message'] = 'Listado de Usuarios y sus publicaciones(GET)'
    response_body['results'] = result
    return response_body, 200


# Endpoints de Publicaciones (Post) CRUD
@api.route('/posts', methods=['GET', 'POST'])
@jwt_required()
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        # Opción 2
        # result = []
        # for row in rows:
        #    result.append(row.serialize())
        # Opción 1 - list comprehension
        # var  = [ objetivo for iterador in lista ]
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todas las Publicaciones (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        # validar si estoy recibiendo todas las claves (campos)
        row = Posts(title = data.get('title'),
                    description = data.get('description'),
                    body = data.get('body'),
                    date = datetime.now(),
                    image_url = data.get('image_url'),
                    user_id = data.get('user_id'),)
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando una Publicación (POST)'
        response_body['results'] = row.serialize()
        return response_body, 200
    

@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def post(id):
    response_body = {}
    # Buscar publicacion y si no exite omite lo siguiente.
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] = f'La publicacion {id} no existe'
        response_body['results'] = {}
        return response_body, 404
    current_user = get_jwt_identity()
    if row.user_id == current_user['user_id']:
        pass
    print(row)
    if request.method == 'GET':
        response_body['message'] = f'Datos de Publicacion {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        print(data)
        # Valida que reciba todas las claves en body (json)
        row.title = data.get('title')
        row.description = data.get('description')
        row.body = data.get('body')
        row.date = datetime.now()
        row.image_url = data.get('image_url')
        row.users_id = data.get('users_id')
        db.session.commit()
        response_body['message'] = f'Edit de la Publicacion {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Eliminada Publicacion {id}'
        response_body['results'] = {}
        return response_body, 200
    

# @api.route('/followers', method=['GET', 'POST'])
# id del usuario


# @api.route('/users/<int:id>/followers', method=['GET'])


# @api.route('/users/<int:id>/followings', method=['GET'])


@api.route('/characters', methods=['GET'])
def characters():
    response_body = {}
    # Traer todos los registros de mi base de datos
    rows = db.session.execute(db.select(Characters)).scalars()
    result = [row.serialize() for row in rows]
    print(len(result))
    # Pregunto si no traje nada, en ese caso voy a api de SWAPI y traigo todo.
    if not result:
        print('*********')
        url=f'https://www.swapi.tech/api/people'
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            # Tomo "total_records" y hago un for de 1 hasta total_records y vuelvo a hacer un requests.get de cada uno
            for id in range(1, int(data["total_records"])):
                url=f'https://www.swapi.tech/api/people/{id}'
                response = requests.get(url)
                if response.status_code == 200:
                    data = response.json()
                    row = Characters(id=data["result"]["uid"],
                                    name=data["result"]["properties"]["name"],
                                    height=data["result"]["properties"]["height"],
                                    mass=data["result"]["properties"]["mass"],
                                    hair_color=data["result"]["properties"]["hair_color"],
                                    skin_color=data["result"]["properties"]["skin_color"],
                                    eye_color=data["result"]["properties"]["eye_color"],
                                    birth_year=data["result"]["properties"]["birth_year"],
                                    gender=data["result"]["properties"]["gender"])
                    db.session.add(row)
                    db.session.commit()
            # Cuando termina el ciclo, vuelvo a hacer el select
            rows = db.session.execute(db.select(Characters)).scalars()
    # Muestro todos los registros que tengo en la base
    result = [row.serialize() for row in rows]
    response_body['results'] = result
    return response_body, 200


@api.route('/characters/<int:id>', methods=['GET'])
def character(id):
    response_body = {}
    url=f'https://www.swapi.tech/api/people/{id}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(data["result"]["properties"]["height"])
        print(data["result"]["properties"]["mass"])
        print(data["result"]["uid"])
        row = Characters(id=data["result"]["uid"],
                          name=data["result"]["properties"]["name"],
                          height=data["result"]["properties"]["height"],
                          mass=data["result"]["properties"]["mass"],
                          hair_color=data["result"]["properties"]["hair_color"],
                          skin_color=data["result"]["properties"]["skin_color"],
                          eye_color=data["result"]["properties"]["eye_color"],
                          birth_year=data["result"]["properties"]["birth_year"],
                          gender=data["result"]["properties"]["gender"])
        db.session.add(row)
        db.session.commit()
        response_body['results'] = data
    return response_body, 200


@api.route('/planets', methods=['GET'])
def planets():
    response_body = {}
    # Traer todos los registros de mi base de datos
    rows = db.session.execute(db.select(Planets)).scalars()
    result = [row.serialize() for row in rows]
    print(len(result))
    # Pregunto si no traje nada, en ese caso voy a api de SWAPI y traigo todo.
    if not result:
        print('*********')
        url=f'https://www.swapi.tech/api/planets'
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            # Tomo "total_records" y hago un for de 1 hasta total_records y vuelvo a hacer un requests.get de cada uno
            for id in range(1, int(data["total_records"])):
                url=f'https://www.swapi.tech/api/planets/{id}'
                response = requests.get(url)
                if response.status_code == 200:
                    data = response.json()
                    row = Planets(id=data["result"]["uid"],
                                  name=data["result"]["properties"]["name"],
                                  diameter=data["result"]["properties"]["diameter"],
                                  rotation_period=data["result"]["properties"]["rotation_period"],
                                  orbital_period=data["result"]["properties"]["orbital_period"],
                                  gravity=data["result"]["properties"]["gravity"],
                                  population=data["result"]["properties"]["population"],
                                  climate=data["result"]["properties"]["climate"],
                                  terrain=data["result"]["properties"]["terrain"])
                    db.session.add(row)
                    db.session.commit()
            # Cuando termina el ciclo, vuelvo a hacer el select
            rows = db.session.execute(db.select(Planets)).scalars()
    # Muestro todos los registros que tengo en la base
    result = [row.serialize() for row in rows]
    response_body['results'] = result
    return response_body, 200


@api.route('/starships', methods=['GET'])
def starships():
    response_body = {}
    # Traer todos los registros de mi base de datos
    rows = db.session.execute(db.select(Starships)).scalars()
    result = [row.serialize() for row in rows]
    print(len(result))
    # Pregunto si no traje nada, en ese caso voy a api de SWAPI y traigo todo.
    if not result:
        print('*********')
        url=f'https://www.swapi.tech/api/starships'
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            # Tomo "total_records" y hago un for de 1 hasta total_records y vuelvo a hacer un requests.get de cada uno
            for id in range(1, int(data["total_records"])):
                url=f'https://www.swapi.tech/api/starships/{id}'
                response = requests.get(url)
                if response.status_code == 200:
                    data = response.json()
                    row = Starships(id=data["result"]["uid"],
                                    name=data["result"]["properties"]["name"],
                                    passengers=data["result"]["properties"]["passengers"],
                                    crew=data["result"]["properties"]["crew"],
                                    length=data["result"]["properties"]["length"],
                                    consumables=data["result"]["properties"]["consumables"],
                                    cargo_capacity=data["result"]["properties"]["cargo_capacity"],
                                    cost_in_credits=data["result"]["properties"]["cost_in_credits"],
                                    hyperdrive_rating=data["result"]["properties"]["hyperdrive_rating"],
                                    manufacturer=data["result"]["properties"]["manufacturer"],
                                    starship_class=data["result"]["properties"]["starship_class"])
                    db.session.add(row)
                    db.session.commit()
            # Cuando termina el ciclo, vuelvo a hacer el select
            rows = db.session.execute(db.select(Starships)).scalars()
    # Muestro todos los registros que tengo en la base
    result = [row.serialize() for row in rows]
    response_body['results'] = result
    return response_body, 200


@api.route('/temp', methods=['GET'])
def temp():
    response_body = {}
    url = 'https://jsonplaceholder.typicode.com/users'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(data)
        for row in data:
            user = Users(email=row["email"],
                         first_name=row["name"],
                         last_name=row["username"],
                         password='1234',
                         is_active=True,
                         is_admin=False,)
            db.session.add(user)
            db.session.commit()
        response_body['results'] = data
    return response_body, 200
