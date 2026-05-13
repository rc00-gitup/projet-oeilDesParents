import sqlite3

def init_db():
    conn = sqlite3.connect("iot_history.db")
    c = conn.cursor()

    c.execute("""
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            etat TEXT,
            activite TEXT,
            mouvement INTEGER,
            son INTEGER,
            temperature INTEGER,
            timestamp TEXT
        )
    """)

    conn.commit()
    conn.close()