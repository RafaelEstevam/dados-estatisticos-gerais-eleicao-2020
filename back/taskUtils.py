import csvUtils
import json

task = []
def searchTaskById(taskId, tasks):
    #Retorna a task de acordo com o ID
    #Recursão para varrer a lista de tarefas do JSON e procurar na árvore a task específica
    # taskId(string) - id da tarefa
    # tasks(array) - lista de tarefas
    for item in tasks:
        if item['id'] == int(taskId, 10):
            task.append(item)
        else:
            searchTaskById(taskId, item['subtask'])
    return task

def getTask(taskId):
    # Retorna a tarefa e suas subtarefas de acordo com o ID
    # taskId(string) - id da tarefa

    task.clear()
    j = open("json/tasks.json", "r")
    json_tasks = j.read()
    j.close()
    arrayTasks = json.loads(json_tasks)['tasks']
    taskItem = {
        "task" : searchTaskById(taskId, arrayTasks)
    }
    return taskItem

def getTasks():
    # Retorna a lista de tasks do json
    j = open("json/tasks.json", "r")
    json_tasks = j.read()
    j.close()

    return json_tasks
