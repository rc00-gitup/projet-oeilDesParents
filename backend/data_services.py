from analyse_service import analyse_alerte

latest_result = {
    "etat": "normal",
    "alerte": [],
    "activite": "calme",
    "data": {
        "mouvement": 0,
        "son": 0,
        "temperature": 0
    },
    "timestamp": ""
}


def process_data(data):
    global latest_result

    result = analyse_alerte(data)

    latest_result = {
        **result,
        "data": {
            "mouvement": data.get("mouvement", 0),
            "son": data.get("son", 0),
            "temperature": data.get("temperature", 0)
        },
        "timestamp": data.get("timestamp", "")
    }

    return latest_result


def get_status():
    return latest_result