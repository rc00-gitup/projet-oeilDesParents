from rules_services import evaluation_rules
def analyse_alerte(data):
    status,alerte=evaluation_rules(data)
    alert=[]
    if status=='alerte':
        for aler in alerte:
            if aler[1]!='normale':
                alert.append(aler)
    return {'status':status,
            'alerte':alert,
            'data':data}
