import RPi.GPIO as GPIO

GREEN = 17
YELLOW = 27
RED = 22

GPIO.setwarnings(False)

if GPIO.getmode() is None:
    GPIO.setmode(GPIO.BCM)

GPIO.setup(GREEN, GPIO.OUT)
GPIO.setup(YELLOW, GPIO.OUT)
GPIO.setup(RED, GPIO.OUT)


def all_off():
    GPIO.output(GREEN, 0)
    GPIO.output(YELLOW, 0)
    GPIO.output(RED, 0)


def set_led(state):

    all_off()

    # 🔴 Absent ou état inconnu
    if state in ["absent", "unknown"]:
        GPIO.output(RED, 1)

    # 🟡 Tous les autres états
    else:
        GPIO.output(YELLOW, 1)


def cleanup():
    all_off()
    GPIO.cleanup()
