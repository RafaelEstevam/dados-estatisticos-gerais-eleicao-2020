def calculateSprints(request) :

    # Algoritmo para retornar somente as tasks principais (histórias) que se encaixam no tamanho de uma sprint
    
    json_data = request.get_json()
    sprintValue = json_data['sprintValue']
    mergedTask = json_data['tasks']
    historiesSprint = []

    for history in mergedTask :
        if history['totalScore'] <= sprintValue:
            historiesSprint.append(history)
            sprintValue -= history['totalScore']

    histories = {
        "histories" : historiesSprint
    }

    return histories