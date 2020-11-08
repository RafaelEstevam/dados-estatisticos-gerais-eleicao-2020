import csv
import json

def getCSVByState(request):
    json_data = request.get_json()
    fileList = []

    file = csv.reader(open("data/candidaturas/consulta_cand_2020_SP.csv"))

    for item in file :
        fileList.append(item)

    fileList = {"candidatos" : fileList}

    return fileList
    