import React from "react";

export default function BabyHistory({ data }) {

  const history = data?.history || [];

  return (
    <div className="history-container">

      <h2>📜 Derniers événements</h2>

      {history.length === 0 ? (

        <div className="history-empty">
          Aucun événement enregistré.
        </div>

      ) : (

        <div className="history-timeline">

          {history
            .slice()
            .reverse()
            .map((event, index) => {

              let colorClass = "event-green";

              if (event.score >= 50)
                colorClass = "event-orange";

              if (event.score >= 80)
                colorClass = "event-red";

              return (

                <div
                  key={index}
                  className="history-event"
                >

                  <div className={`event-dot ${colorClass}`} />

                  <div className="event-content">

                    <div className="event-time">
                      🕒 {event.time}
                    </div>

                    <div className="event-description">
                      Score danger détecté :
                      <strong> {event.score}%</strong>
                    </div>

                  </div>

                </div>

              );
            })}

        </div>

      )}

    </div>
  );
}