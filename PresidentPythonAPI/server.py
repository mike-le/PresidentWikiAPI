from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from flask import jsonify
import json


class Presidents(Resource):
    def get(self):
        conn = db_connect.connect()
        query = conn.execute("select * from presidents")
        return {'presidents': [i[0] for i in query.cursor.fetchall()]}


class Presidents_Name(Resource):
    def get(self, president_id):
        conn = db_connect.connect()
        query = conn.execute("select * from presidents where PresidentID =%d " % int(president_id))
        result = {'data': [dict(zip(tuple(query.keys()), i)) for i in query.cursor]}
        return jsonify(result)


if __name__ == '__main__':
    try:
        with open('config.json') as configJSON:
            config = json.load(configJSON)
            database = config["database"]
            username = config["username"]
            password = config["password"]
        db_connect = create_engine('')
        app = Flask(__name__)
        api = Api(app)
        app.run(port='5002')
    except FileNotFoundError as e:
        print('JSON file not found: {0}'.format(str(e)))
