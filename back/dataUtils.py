import pandas as pd
import csv
import json
import numpy as np

def generateList(dataset):

    newList = []
    newdata = list(dataset.items())
    items = np.array(newdata)

    for item in items : 
        newList.append({"name": item[0], "value": int(item[1])})

    return newList

def getMoreData(newData):
    data = pd.read_json(newData)

    genre = data.groupby(['DS_GENERO'])['DS_GENERO'].count().to_dict()
    education = data.groupby(['DS_GRAU_INSTRUCAO'])['DS_GRAU_INSTRUCAO'].count().to_dict()
    breed = data.groupby(['DS_COR_RACA'])['DS_COR_RACA'].count().to_dict()

    extraData = {
        "genero" : generateList(genre),
        "instrucao" : generateList(education),
        "raca" : generateList(breed)
    }

    return extraData


def getCSVByState(request):

    json_data = request.get_json()
    
    queryString = 'DS_CARGO == "' + json_data['cargo'] + '" & NM_UE == "' + json_data['cidade'] + '"'
    csvString = "data/candidaturas/consulta_cand_2020_"+ json_data['estado'] +".csv"

    data = pd.read_csv(csvString, sep=";", encoding="ISO-8859-1",skiprows=0)

    data.query(queryString, inplace = True)
    newData = data.to_json(orient='records')

    allData = {
        "candidatos" : json.loads(newData),
        "dados_adicionais" : getMoreData(newData)
    }
    
    return allData