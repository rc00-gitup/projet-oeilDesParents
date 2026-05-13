export default function Notification({
  notifications = []
}) {

  // 🚫 aucun toast
  if (notifications.length === 0) return null;

  return (
    <div style={styles.container}>

      {notifications.map((notification) => (

        <div
          key={notification.id}
          style={styles.card}
        >

          {/* ❌ PLUS D'IMAGE DANS LE TOAST */}

          <div style={styles.text}>

            <h4 style={styles.title}>
              🚨 Alerte bébé détectée
            </h4>

            <p style={styles.message}>
              {notification?.message ||
                "Aucune info"}
            </p>

            <small style={styles.time}>
              {notification?.time}
            </small>

          </div>

        </div>
      ))}

    </div>
  );
}

const styles = {

  container: {
    position: "fixed",

    top: "20px",
    right: "20px",

    zIndex: 9999,

    display: "flex",
    flexDirection: "column",

    gap: "12px"
  },

  card: {

    width: "280px",

    background: "#111827",

    color: "white",

    borderRadius: "14px",

    padding: "14px",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.35)",

    border: "1px solid #1f2937",

    animation: "slideIn 0.25s ease"
  },

  text: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },

  title: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "700"
  },

  message: {
    margin: 0,
    opacity: 0.9,
    fontSize: "14px",
    lineHeight: "1.3"
  },

  time: {
    opacity: 0.6,
    fontSize: "11px"
  }
};