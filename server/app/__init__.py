#!flask/bin/python
from flask import Flask, jsonify, abort, request, make_response, url_for

app = Flask(__name__, static_url_path = "")

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/node-manager/api/v1.0/deploy', methods = ['GET'])
def get_deploys():
    return jsonify( { 'deploys': deploys } )

@app.route('/node-manager/api/v1.0/deploy/<int:deploy_id>', methods = ['GET'])
def get_deploy(deploy_id):
    return jsonify( { 'deploy': deploys[deploy_id] } )

@app.route('/node-manager/api/v1.0/deploy', methods = ['POST'])
def create_deploy():
    if not request.json or not 'name' in request.json:
        abort(400, 'Missing name parameter or not json')
    deploy = {
        'id': deploys[-1]['id'] + 1,
        'name': request.json['name'],
        'group_id': request.json['group_id'],
        'artifact_id': request.json['artifact_id'],
        'version': request.json['version'],
        'status': True,
        'result': 'Deploy finished ok'
    }

    deploys.append(deploy)
    return jsonify( { 'deploy': deploy } ), 201

deploys = [
    {
        'id': 1,
        'name': u'name',
        'group_id': u'group_id',
        'artifact_id': u'artifact_id',
        'version': u'version',
        'status': False,
        'result': u''
    }
]

if __name__ == '__main__':
    app.run(debug = True)

