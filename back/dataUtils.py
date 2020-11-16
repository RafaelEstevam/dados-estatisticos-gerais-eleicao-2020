import pandas as pd
import csv
import json

def getMoreData(newData):
    data = pd.read_json(newData, orient='records')

    genre = data.groupby(['DS_GENERO'])['DS_GENERO'].count().to_dict()
    education = data.groupby(['DS_GRAU_INSTRUCAO'])['DS_GRAU_INSTRUCAO'].count().to_dict()
    breed = data.groupby(['DS_COR_RACA'])['DS_COR_RACA'].count().to_dict()

    extraData = {
        "GÊNERO" : genre,
        "COR" : education,
        "RAÇA" : breed,
    }

    return extraData


def getCSVByState(request):

    json_data = request.get_json()
    
    queryString = 'DS_CARGO == "' + json_data['cargo'] + '" & NM_UE == "' + json_data['cidade'] + '"'
    # csvString = "data/candidaturas/consulta_cand_2020_TESTE.csv"
    csvString = "data/candidaturas/consulta_cand_2020_"+ json_data['estado'] +".csv"

    data = pd.read_csv(csvString, sep=";", encoding="ISO-8859-1",skiprows=0)

    data.query(queryString, inplace = True)
    newData = data.to_json(orient='records')

    allData = {
        "CANDIDATOS" : json.loads(newData),
        "DADOS_ADICIONAIS" : getMoreData(newData)
    }
    
    return allData