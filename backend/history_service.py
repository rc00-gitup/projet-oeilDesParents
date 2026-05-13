import sqlite3

DB_NAME = "iot_history.db"


def save_data(result):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()

    data = result.get("data", {})

    c.execute("""
        INSERT INTO history (etat, activite, mouvement, son, temperature, timestamp)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        result.get("etat"),
        result.get("activite"),
        data.get("mouvement", 0),
        data.get("son", 0),
        data.get("temperature", 0),
        result.get("timestamp")
    ))

    conn.commit()
    conn.close()


def get_history():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()

    c.execute("SELECT etat, activite, mouvement, son, temperature, timestamp FROM history")
    rows = c.fetchall()

    conn.close()

    return [
        {
            "etat": r[0],
            "activite": r[1],
            "data": {
                "mouvement": r[2],
                "son": r[3],
                "temperature": r[4]
            },
            "timestamp": r[5]
        }
        for r in rows
    ]