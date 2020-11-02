import csv
import json

# global variables
mergedTasks = []
# setStatusDone = 'false'

def generateTask(task, converter):
    # - task(object) = Objeto com chaves e valores referentes a uma tarefa
    # - converter(Boolean) = Se verdadeiro, converter alguns dados do objeto e devolver objeto, senão devolve somente o objeto
    
    # Retorna a estrutura base de uma task
    
    if converter == True :
        return {
                "id" : int(task[0]),
                "index": int(task[1]),
                "name" : task[2],
                "parentTaskId" : int(task[3]),
                "score" : int(task[4]),
                "totalScore" : int(task[5]),
                "status" : task[6],
                "subtask" : []
            }
    else:
        return {
                "id" : task["id"],
                "index" : task["index"],
                "name" : task["name"],
                "parentTaskId" : task["parentTaskId"],
                "score" : task["score"],
                "totalScore" : task["totalScore"],
                "status" : task["status"],
                "subtask" : []
            }

def writeTaskOfArray(taskList):
    # Salva a lista de tarefas no csv.
    # - taskList(array) = Lista de tarefas para ser armazenada no CSV

    file = csv.writer(open("csvs/newfile.csv", "w", newline=''))
    file.writerow(["id", "index", "name", "parentTaskId", "score", "totalScore", "status", "subtask"])
    for task in taskList:
        file.writerow([
            task["id"],
            task["index"], 
            task["name"],
            task["parentTaskId"],
            task["score"],
            task["totalScore"],
            task["status"],
            ""
        ])
        

def searchParentTask(task, taskList):
    # Enquando não encontrar a tarefa pai ele continua procurando dentro da árvore de tarefas, passando como ponto inicial o array de subtask do pai.
    # - task(object) = tarefa 'pai'
    # - taskList(array) = lista de subtarefas da tarefa pai

    for item in taskList:
        if item['id'] == task['parentTaskId'] :
            item['subtask'].append(task)
        else:
            searchParentTask(task, item['subtask'])

def addTasks(tasks):
    # Organizar em forma de "árvore" as tarefas vindas pelo json. Essa organização usa o id da tarefas pai como referência para adicionar as tarefas filhas
    # Essa função retorna a lista de tarefas organizada
    # - tasks(object) = Objeto com lista de tarefas à ser processada
    # Retorna a lista de tarefas estruturada no vetor

    mergedTasks = []
    for task in tasks['tasks']:
        if task['index'] == 1:
            mergedTasks.append(task)
        else:
            searchParentTask(task, mergedTasks)
    return mergedTasks

def incrementTotalPoints(task, taskList) :
    # - task(object) = tarefa 'pai'
    # - taskList(array) = lista de subtarefas da tarefa pai

    for item in taskList :
        if len(item['subtask']) > 0:
            item['totalScore'] = item['score']
        incrementTotalPoints(item, item['subtask'])
        # Se meu item tiver um totalscore maior que 0, essa pontuação vai ser somada a pontuação total da tarefa pai, senão o score do item vai ser somado
        # ao total da tarefa pai
        if item['totalScore'] > 0:
            task['totalScore'] += item['totalScore']
        else:
            task['totalScore'] += item['score']

def calcScoreTasks(mergedTasks) :
    # Se a tarefa tiver subtarefas, calcular a somatória de pontos das subtarefas, senão será atribuido a pontuação total da tarefa o score inicial dela
    # Essa função vai retornar a lista com seus devidos valores de pontuação da tarefa atribuidos
    # - mergedTasks(array) = lista de tarefas já organizada na árvore de tarefas
    # Retorna a lista de tarefas com pontos totais da tarefa calculados

    for item in mergedTasks:
        if len(item['subtask']) > 0 :
            item['totalScore'] += item['score'] + item['totalScore']
            # Calcular a soma da pontuação das subtarefa
            incrementTotalPoints(item, item['subtask'])
        else:
            item['totalScore'] = item['score']

    return mergedTasks

def validateAllTasksAllowDone(task, taskList):
    # Verifica se todas as tarefas estão como done e se podem ser concluidas
    # - task(object) = tarefa atual
    # - taskList(array) = lista de tarefas da tarefa atual

    allowDone = 0
    for taskitem in taskList:
        if taskitem['allowDone'] == 'true' and taskitem['status'] == 'done':
            allowDone += 1

    if allowDone == len(taskList):
        task['allowDone'] = 'true'
    else:
        task['allowDone'] = 'false'


def validateAllTasksDone(task, taskList):
    # Verifica se todas as tarefas estão como done
    # - task(object) = tarefa atual
    # - taskList(array) = lista de tarefas da tarefa atual

    done = 0
    for taskitem in taskList:
        if taskitem['status'] == 'done':
            done += 1

    if done == len(taskList):
        task['allowDone'] = 'true'
    else:
        task['allowDone'] = 'false'


def setStatusOption(taskList):
    for task in taskList:
        if len(task['subtask']) > 0:
            validateAllTasksDone(task, task['subtask'])
            setStatusOption(task['subtask'])
            validateAllTasksAllowDone(task, task['subtask'])
                
        else:
            task['allowDone'] = 'true'

    return taskList

def processCSV(request):
    # Processamento do json vindo na submição do formulário do front
    # Salvamento em arquivo CSV da lista 'simples' de tarefas
    # - request = biblioteca importada no arquivo main.py
    # Retorna um JSON com a estrutura de tarefas e subtarefas organizada

    json_data = request.get_json()
    writeTaskOfArray(json_data['tasks'])
    return processJSON(json_data)

def processJSON(taskList):
    # Processamento do json das tasks. Retorna um JSON com a lista de tasks organizadas
    # - taskList(object) = Objeto com lista de tarefas para ser processada e gerar o JSON - Estrutura esperada : {"tasks" : taskList(array)}
    # Retorna um JSON com a estrutura de tarefas e subtarefas organizada

    taskList["tasks"].sort(key=lambda item: item.get('index') )

    taskList = {
        "tasks" : setStatusOption(calcScoreTasks(addTasks(taskList)))
    }

    j = open("json/tasks.json", "w")
    j.write(str(taskList).replace("'", '"'))
    j.close()
    return taskList

def deleteTaskAndProcessCSV(taskId):
    # - taskId = ID da tarefa que será apagada. 
    # Retorna uma mensagem para a requisição


    newTaskList = []
    r = csv.reader(open("csvs/newfile.csv"))
    for task in r :
        if task[0] != 'id' and task[0] != taskId  and task[3] != taskId:
            task = generateTask(task, True)
            newTaskList.append(task)

    writeTaskOfArray(newTaskList)
    newTaskList = {"tasks" : newTaskList}
    processJSON(newTaskList)
    return taskId
        
def createTaskInCSV(request):
    # - request = Biblioteca request importada no main.py
    # Retorna um JSON com a estrutura de tarefas e subtarefas organizada e com a adição da nova tarefa
    
    json_data = request.get_json()
    newTaskList = []
    newId = 0
    r = csv.reader(open("csvs/newfile.csv"))
    for task in r :
        if task[0] != 'id':
            task = generateTask(task, True)
            newTaskList.append(task)
            if task["id"] > newId :
                newId = task["id"]
            else:
                newId = newId

    for newTask in json_data['tasks']:
        newTask["id"] = newId + 1
        newTask = generateTask(newTask, False)
        newTaskList.append(newTask)

    writeTaskOfArray(newTaskList)

    newTaskList = {"tasks" : newTaskList}
    return processJSON(newTaskList)

def editTaskAndProcessCSV(taskId, request):
    # - taskId(int) = ID da tarefa que será apagada
    # - request = Biblioteca request importada no main.py
    # Retorna um JSON com a estrutura de tarefas e subtarefas organizada e com a tarefa editada

    json_data = request.get_json()
    newTaskList = []
    r = csv.reader(open("csvs/newfile.csv"))
    for task in r :
        if task[0] == taskId:
            task = generateTask(json_data['tasks'][0], False)
            newTaskList.append(task)
        else:
                if task[0] != 'id':
                    task = generateTask(task, True)
                    newTaskList.append(task)

    writeTaskOfArray(newTaskList)

    newTaskList = {"tasks" : newTaskList}
    return processJSON(newTaskList)