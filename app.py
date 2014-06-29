# -*- coding: utf-8 -

from flask import Flask, render_template, Response, json, jsonify, request

app = Flask(__name__)
# TODO: How to enable this only locally?
# http://flask.pocoo.org/docs/config/
app.debug = True

enable_mongo = True

if enable_mongo:
    import os
    from pymongo import MongoClient
    from lib.real import TodoListRepo
    client = MongoClient(os.environ.get('MONGOHQ_URL', 'mongodb://localhost:27017/'))
    db = client.todos
    todo_list_repo = TodoListRepo(db)
else:
    from lib.mock import TodoListRepo
    todo_list_repo = TodoListRepo()

def parse_todo_item_json_body():
    json = request.get_json()
    item = {
        'id': json.get('id'),
        'title': json['title'],
        'done': json['done']
    }
    return item

@app.route('/api/lists/<list_id>/items/', methods=['GET', 'POST'])
def todos(list_id):
    if request.method == 'GET':
        return Response(json.dumps(todo_list_repo.get_list(list_id)), mimetype='application/json')
    elif request.method == 'POST':
        item = todo_list_repo.create_list_item(list_id, parse_todo_item_json_body())
        return jsonify(item), 201

@app.route('/api/lists/<list_id>/items/<id>', methods=['PUT'])
def todo(list_id, id):
    if 'position' in request.args:
        pos = int(request.args['position'])
        todo_list_repo.update_list_item_position(list_id, id, pos)
        return Response(status=204)
    else:
        item = todo_list_repo.update_list_item(list_id, parse_todo_item_json_body())
        return jsonify(item), 200

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def all(path):
    return render_template('index.html')

if __name__ == "__main__":
    app.run()
