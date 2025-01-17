console.log("Le script JavaScript est chargé."); // Test initial

// Liste des horaires des sonneries
const schedule = [
  { time: "08:10", label: "Début des cours" },
  { time: "09:05", label: "Fin du premier cours" },
  { time: "10:00", label: "Récréation" },
  { time: "10:15", label: "Reprise après récréation" },
  { time: "11:10", label: "Pause de 5 minutes" },
  { time: "12:05", label: "Pause déjeuner" },
  { time: "13:00", label: "Début de l'après-midi" },
  { time: "13:55", label: "Fin du premier cours de l'après-midi" },
  { time: "14:50", label: "Pause de l'après-midi" },
  { time: "15:45", label: "Reprise des cours" },
  { time: "16:00", label: "Pause de 5 minutes" },
  { time: "16:55", label: "Dernier cours" },
  { time: "17:50", label: "Fin de la journée" },
];

console.log("Horaires des sonneries chargés :", schedule);

// Fonction pour obtenir l'heure actuelle
function getCurrentMinutes() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  console.log("Heure actuelle en minutes :", currentMinutes);
  return currentMinutes;
}

// Fonction pour obtenir le prochain événement
function getNextEvent() {
  const currentMinutes = getCurrentMinutes();

  for (let i = 0; i < schedule.length; i++) {
    const [hours, minutes] = schedule[i].time.split(":").map(Number);
    const eventMinutes = hours * 60 + minutes;

    if (eventMinutes > currentMinutes) {
      console.log("Prochain événement trouvé :", schedule[i]);
      return {
        label: schedule[i].label,
        remainingMinutes: eventMinutes - currentMinutes,
      };
    }
  }
  console.log("Aucun événement trouvé.");
  return null; // Aucune sonnerie restante
}

// Fonction pour mettre à jour le timer
function updateTimer() {
  const timerElement = document.getElementById("timer");
  const eventElement = document.getElementById("event");
  const nextEvent = getNextEvent();

  if (nextEvent) {
    const hours = Math.floor(nextEvent.remainingMinutes / 60);
    const minutes = nextEvent.remainingMinutes % 60;
    const seconds = 59 - new Date().getSeconds();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    console.log("Temps restant formaté :", formattedTime);
    timerElement.textContent = formattedTime;
    eventElement.textContent = `Prochaine sonnerie : ${nextEvent.label}`;
  } else {
    timerElement.textContent = "--:--:--";
    eventElement.textContent = "Journée terminée !";
  }
}

// Lancer l'update toutes les secondes
setInterval(updateTimer, 1000);
updateTimer();
