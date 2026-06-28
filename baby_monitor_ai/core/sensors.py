import RPi.GPIO as GPIO
import adafruit_dht
import board
import time

# =========================
# GPIO CONFIG
# =========================
PIR_PIN = 17
SOUND_PIN = 27

GPIO.setmode(GPIO.BCM)
GPIO.setup(PIR_PIN, GPIO.IN)
GPIO.setup(SOUND_PIN, GPIO.IN)

# =========================
# DHT11 SENSOR (GPIO4)
# =========================
dht = adafruit_dht.DHT11(board.D4)

# =========================
# SENSOR FUNCTION
# =========================
def get_sensor_data():

    pir = GPIO.input(PIR_PIN)
    sound = GPIO.input(SOUND_PIN)

    temperature = 0

    try:
        temperature = dht.temperature
    except:
        temperature = 0

    temp_flag = 1 if temperature and temperature > 37 else 0

    return {
        "pir": int(pir),
        "temperature": temp_flag,
        "sound_sensor": int(sound)
    }
