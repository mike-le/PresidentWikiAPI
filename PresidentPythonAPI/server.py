from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask import jsonify

# finish setup with aws rds
db_connect = create_engine('')
app = Flask(__name__)
api = Api(app)


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
    app.run(port='5002')
