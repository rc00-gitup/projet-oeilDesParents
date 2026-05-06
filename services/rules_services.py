import time
def temperature(data):
    if data['temperature']>35:
        return ('temperature','temperature  tres élévée')
    elif data['temperature']<10:
        return ('temperature','temperature  tres base')
    else:
        return ('temperature','normale')
def bruit(data):
    if data['son']>70:
        return ('bruit','bruit  tres élévé')
    else:
        return ('bruit','normale')
time_dern_mvt=time.time()
def mouvement(data):
    global time_dern_mvt
    time_courrent_mvt=time.time()
    if  data['mouvement']==1:
        time_dern_mvt=time_courrent_mvt
    else:
        if time_dern_mvt-time_courrent_mvt>2000:
            return ('mouvement','pas de mouvement depuis de 2 minutes!')
    return ('mouvement','normale')
def evaluation_rules(data):
    alerte=[temperature(data),bruit(data),mouvement(data)]
    status='normale'
    for tup in alerte:
        if tup[1]!='normale':
            status='alerte'
            return status,alerte
    return status,alerte

        

