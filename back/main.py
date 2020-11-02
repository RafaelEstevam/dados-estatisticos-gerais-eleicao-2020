# TO DO APP
# Descrição: Backend de aplicação para criação/gestão de uma lista de tarefas com armazenamento em arquivo .CSV
# Objetivo: Fornecer uma API simples para gestão de tarefas importadas no CSV. Disponibilizar serviço para download do CSV de tarefas e CRUD de tarefas

# Algoritmo base do projeto: Recursão para organização das tarefas numa estrutura JSON, possibilitando a criação e relacionamento entre tarefas e subtarefas.

# Bibliotecas usadas:
#       Flask - Bilioteca para disponibilizar APIs
#       Flask Cors - Bilioteca para possibilitar requisições de outras origens.
# Criador: Rafael Estevam de Oliveira

# MAIN.PY
# Neste arquivo é feito somente a importação das bibliotecas e módulos criados. Além das definições de rotas do backend.

import csvUtils
import sprintUtils
import taskUtils

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def hello():
    return "Hello"

@app.route("/csv/import", methods=['POST'])
@cross_origin()
def createCSV():
    return csvUtils.processCSV(request)

@app.route("/csv/export", methods=['GET'])
@cross_origin()
def getCSV():
    path = "./csvs/newfile.csv"
    return send_file(path, as_attachment=True)

@app.route("/tasks", methods=['GET'])
@cross_origin()
def getTasksInJSON():
    return taskUtils.getTasks()

@app.route("/tasks/new", methods=['POST'])
@cross_origin()
def createTaskInCSV():
    return csvUtils.createTaskInCSV(request)

@app.route("/tasks/<taskId>", methods=['GET'])
@cross_origin()
def getTaskInJSON(taskId):
    return taskUtils.getTask(taskId)

@app.route("/tasks/<taskId>", methods=['DELETE'])
@cross_origin()
def deleteTaskInCSV(taskId):
    return csvUtils.deleteTaskAndProcessCSV(taskId)

@app.route("/tasks/<taskId>", methods=['PUT'])
@cross_origin()
def updateTaskInCSV(taskId):
    return csvUtils.editTaskAndProcessCSV(taskId, request)

# @app.route("/sprints", methods=['POST'])
# @cross_origin()
# def calcSprint():
#     return sprintUtils.calculateSprints(request)

if __name__ == "__main__":
    app.run()