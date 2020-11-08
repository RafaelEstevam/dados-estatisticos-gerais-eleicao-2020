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

import dataUtils
import csvUtils

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def hello():
    return "Hello"

@app.route("/candidados", methods=['GET'])
@cross_origin()
def getDataCSVByState():
    return dataUtils.getCSVByState(request)

if __name__ == "__main__":
    app.run()