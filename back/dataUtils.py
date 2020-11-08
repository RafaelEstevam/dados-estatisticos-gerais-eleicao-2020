import pandas as pd
import csv
import json

def getCSVByState(request):
    json_data = request.get_json()
    fileList = []

    # file = csv.reader(open("data/candidaturas/consulta_cand_2020_SP.csv"))
    # csv = csv.reader(open("data/candidaturas/consulta_cand_2020_SP.csv"))
    data = pd.read_csv("data/candidaturas/consulta_cand_2020_TESTE.csv", sep=";", encoding="ISO-8859-1",skiprows=0)
    
    # for item in file :
    #     fileList.append(item)


    print(data)

    return 'teste'
    