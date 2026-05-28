const startBtn = document.getElementById("startBtn");
const start = document.getElementById("start");
const boot = document.getElementById("boot");
const bootText = document.getElementById("bootText");
const content = document.getElementById("content");

const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("music");

const letterBtn = document.getElementById("letterBtn");
const letter = document.getElementById("letter");

const hearts = document.getElementById("hearts");

const bootLines = `
Preparing something special...
Finding one old connection...
Loading childhood memories...
Loading the call after 9 years...
Adding birthday wishes...
Adding desserts...
Adding Mysore masala dosa...
Adding travel dreams...
Adding our song...
Final message ready ✨
`;

let bootIndex = 0;

function typeBoot() {
  if (bootIndex < bootLines.length) {
    bootText.textContent += bootLines.charAt(bootIndex);
    bootIndex++;
    setTimeout(typeBoot, 38);
  } else {
    setTimeout(() => {
      boot.classList.remove("active");
      content.classList.remove("hidden");
      window.scrollTo(0, 0);
    }, 900);
  }
}

startBtn.addEventListener("click", () => {
  start.classList.remove("active");
  boot.classList.add("active");
  typeBoot();
});

musicBtn.addEventListener("click", async () => {
  try {
    await music.play();
    musicBtn.textContent = "Our song is playing 🎵";
  } catch {
    musicBtn.textContent = "Tap again to play our song 🎵";
  }
});

letterBtn.addEventListener("click", () => {
  letter.classList.toggle("hidden");
  letterBtn.textContent = letter.classList.contains("hidden")
    ? "Open Letter 💌"
    : "Close Letter 🤍";
});

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "♡";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 18 + 14 + "px";
  heart.style.animationDuration = Math.random() * 4 + 5 + "s";

  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 9000);
}

setInterval(createHeart, 700);