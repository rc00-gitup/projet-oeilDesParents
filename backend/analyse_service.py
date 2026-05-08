from rules_services import evaluation_rules

def analyse_alerte(data):

    status, alerts = evaluation_rules(data)

    # 🎯 mapping activité bébé (CORRIGÉ)
    if status == "alerte":
        activite = "pleure"
    elif status == "vigilance":
        activite = "réveillé"
    else:
        activite = "dort"

    return {
        "etat": status,
        "alerte": alerts,
        "activite": activite,

        # ✅ structure backend stable pour React
        "data": {
            "mouvement": data.get("mouvement", 0),
            "son": data.get("son", 0),
            "temperature": data.get("temperature", 0)
        },

        "timestamp": data.get("timestamp", "")
    }