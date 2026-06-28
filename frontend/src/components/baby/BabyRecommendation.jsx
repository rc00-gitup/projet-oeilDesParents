import React from "react";

export default function BabyRecommendation({ data }) {

  const score = data?.score_danger || 0;

  let level = "🟢 Stable";
  let badgeClass = "status-green";
  let cardClass = "recommendation-green";

  let title = "Situation normale";

  let message =
    "Le bébé est surveillé correctement. Aucun comportement dangereux n'a été détecté durant les dernières analyses.";

  let actions = [
    "Continuer la surveillance normale",
    "Aucune intervention nécessaire",
    "Caméra et capteurs opérationnels"
  ];

  if (score >= 50 && score < 80) {

    level = "🟠 Vigilance";
    badgeClass = "status-orange";
    cardClass = "recommendation-orange";

    title = "Attention recommandée";

    message =
      "Des mouvements inhabituels ont été observés. Une surveillance renforcée est conseillée pendant les prochaines minutes.";

    actions = [
      "Vérifier l'environnement du bébé",
      "Observer l'activité récente",
      "Surveiller le niveau sonore"
    ];
  }

  if (score >= 80) {

    level = "🔴 Danger";
    badgeClass = "status-red";
    cardClass = "recommendation-red";

    title = "Intervention recommandée";

    message =
      "Le système a détecté une situation potentiellement dangereuse nécessitant une vérification immédiate.";

    actions = [
      "Vérifier immédiatement le bébé",
      "Consulter la caméra en direct",
      "Analyser les alertes récentes"
    ];
  }

  return (
    <div className={`recommendation-box ${cardClass}`}>

      <h2>💡 Recommandation IA</h2>

      <span className={badgeClass}>
        {level}
      </span>

      <h3>{title}</h3>

      <p>{message}</p>

      <div className="recommendation-actions">

        {actions.map((action, index) => (

          <div
            key={index}
            className="recommendation-item"
          >
            ✔ {action}
          </div>

        ))}

      </div>

      <div className="recommendation-footer">
        🤖 Analyse mise à jour en temps réel
      </div>

    </div>
  );
}