// Liste des horaires des sonneries (en heures et minutes)
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

// Fonction pour obtenir l'heure actuelle en minutes
function getCurrentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

// Fonction pour obtenir le prochain événement
function getNextEvent() {
  const currentMinutes = getCurrentMinutes();

  for (let i = 0; i < schedule.length; i++) {
    const [hours, minutes] = schedule[i].time.split(":").map(Number);
    const eventMinutes = hours * 60 + minutes;

    if (eventMinutes > currentMinutes) {
      return {
        label: schedule[i].label,
        remainingMinutes: eventMinutes - currentMinutes,
      };
    }
  }
  return null; // Aucune sonnerie restante
}

// Fonction pour convertir le temps restant en format HH:MM:SS
function formatTime(minutesRemaining) {
  const hours = Math.floor(minutesRemaining / 60);
  const minutes = minutesRemaining % 60;
  const seconds = 59 - new Date().getSeconds(); // Seconde en cours
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Fonction pour mettre à jour le timer
function updateTimer() {
  const timerElement = document.getElementById("timer");
  const eventElement = document.getElementById("event");
  const nextEvent = getNextEvent();

  if (nextEvent) {
    timerElement.textContent = formatTime(nextEvent.remainingMinutes);
    eventElement.textContent = `Prochaine sonnerie : ${nextEvent.label}`;
  } else {
    timerElement.textContent = "--:--:--";
    eventElement.textContent = "Journée terminée !";
  }
}

// Mettre à jour le timer toutes les secondes
setInterval(updateTimer, 1000);
updateTimer();
