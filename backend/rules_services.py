import time

# 🔵 seuils réalistes IoT bébé
TEMP_MIN = 18
TEMP_MAX = 37
BRUIT_SEUIL = 65
ABSENCE_MVT_LIMIT = 120  # secondes

time_dern_mvt = time.time()


# ---------------- TEMPERATURE ----------------
def temperature(data):
    temp = data.get('temperature', 0)

    if temp >= TEMP_MAX:
        return ('temperature', 'alerte', 'Température très élevée 🌡️🔥')
    elif temp <= TEMP_MIN:
        return ('temperature', 'vigilance', 'Température trop basse ❄️')
    else:
        return ('temperature', 'normal', 'Température normale ✅')


# ---------------- BRUIT ----------------
def bruit(data):
    son = data.get('son', 0)

    if son >= BRUIT_SEUIL:
        return ('bruit', 'vigilance', 'Bruit élevé détecté 🔊⚠️')
    else:
        return ('bruit', 'normal', 'Niveau sonore normal 🔇')


# ---------------- MOUVEMENT ----------------
def mouvement(data):
    global time_dern_mvt

    now = time.time()

    if data.get('mouvement', 0) == 1:
        time_dern_mvt = now
        return ('mouvement', 'normal', 'Mouvement détecté 👶')

    if now - time_dern_mvt > ABSENCE_MVT_LIMIT:
        return ('mouvement', 'vigilance', 'Aucune activité depuis 2 minutes ⏱️')

    return ('mouvement', 'normal', 'Aucune activité récente')


# ---------------- EVALUATION GLOBALE ----------------
def evaluation_rules(data):

    checks = [
        temperature(data),
        bruit(data),
        mouvement(data)
    ]

    status = 'normal'

    alerts = []

    for rule_type, level, message in checks:

        if level == 'alerte':
            status = 'alerte'
        elif level == 'vigilance' and status == 'normal':
            status = 'vigilance'

        if level != 'normal':
            alerts.append({
                "type": rule_type,
                "level": level,
                "message": message
            })

    return status, alerts