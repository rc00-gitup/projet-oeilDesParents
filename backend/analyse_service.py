from rules_services import evaluation_rules

def analyse_alerte(data):

    status, alerts = evaluation_rules(data)

    # 🎯 mapping activité
    if status == "alerte":
        activite = "critique"
    elif status == "vigilance":
        activite = "vigilant"
    else:
        activite = "calme"

    return {
        "etat": status,
        "alerte": alerts,   # 🔥 on garde directement les alertes
        "data": data,
        "activite": activite
    }