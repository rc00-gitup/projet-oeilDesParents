# services/data_service.py

from analyse_service import analyse_alerte

latest_result = {}

def process_data(data):
    global latest_result

    result = analyse_alerte(data)
    latest_result = result

    return result


def get_status():
    return latest_result