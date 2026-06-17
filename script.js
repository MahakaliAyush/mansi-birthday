const launchDate = new Date("2026-06-24T00:00:00+05:30");
const devMode = new URLSearchParams(window.location.search).get("dev") === "1";

const countdownGate = document.getElementById("countdownGate");

function runCountdownGate() {
  if (!countdownGate) return;

  const now = new Date();

  if (devMode || now >= launchDate) {
    countdownGate.classList.add("hidden");
    return;
  }

  countdownGate.classList.remove("hidden");

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const diff = launchDate - new Date();

    if (diff <= 0) {
      location.reload();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

runCountdownGate();

const startBtn = document.getElementById("startBtn");

const start = document.getElementById("start");
const boot = document.getElementById("boot");
const bootText = document.getElementById("bootText");
const content = document.getElementById("content");

const letterBtn = document.getElementById("letterBtn");
const letter = document.getElementById("letter");

const hearts = document.getElementById("hearts");

const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("music");

const pinDisplay = document.getElementById("pinDisplay");
const passwordError = document.getElementById("passwordError");
const keys = document.querySelectorAll(".key");
const clearBtn = document.getElementById("clearBtn");
const deleteBtn = document.getElementById("deleteBtn");

const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slideCounter = document.getElementById("slideCounter");

let enteredPin = "";
const correctPin = "110824";
let currentSlide = 0;

music.volume = 0.12;

const bootLines = `
Preparing something special...
Finding one old connection...
Loading childhood memories...
Loading the call after 9 years...
Adding birthday wishes...
Loading dogs...
Loading cats...
Loading peacock...
Correction received: peacock is not an animal btw 🤣
Adding something beautiful...
Final message ready ✨
`;

let bootIndex = 0;

function updatePinDisplay() {
  if (enteredPin.length === 0) {
    pinDisplay.textContent = "• • • • • •";
  } else {
    pinDisplay.textContent = "● ".repeat(enteredPin.length).trim();
  }
}

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
      showSlide(0);
    }, 900);
  }
}

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));

  currentSlide = Math.max(0, Math.min(index, slides.length - 1));
  slides[currentSlide].classList.add("active");

  slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;

  prevBtn.disabled = currentSlide === 0;
  nextBtn.textContent = currentSlide === slides.length - 1 ? "Finish ✨" : "Next →";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.textContent.trim();

    if (value === "Clear" || value === "⌫") return;

    if (enteredPin.length < 6) {
      enteredPin += value;
      passwordError.textContent = "";
      updatePinDisplay();
    }
  });
});

clearBtn.addEventListener("click", () => {
  enteredPin = "";
  passwordError.textContent = "";
  updatePinDisplay();
});

deleteBtn.addEventListener("click", () => {
  enteredPin = enteredPin.slice(0, -1);
  passwordError.textContent = "";
  updatePinDisplay();
});

startBtn.addEventListener("click", () => {
  if (enteredPin !== correctPin) {
    passwordError.textContent =
      "Not this one... think about our first call after 9 years :)";

    enteredPin = "";
    updatePinDisplay();
    return;
  }

  start.classList.remove("active");
  boot.classList.add("active");
  typeBoot();
});

musicBtn.addEventListener("click", async () => {
  try {
    music.load();
    music.loop = true;
    music.volume = 0.25;

    await music.play();

    musicBtn.textContent =
      "Atmosphere enabled ✨ increase volume a little 🤍";

    musicBtn.classList.add("music-playing");
  } catch {
    musicBtn.textContent =
      "Tap again ✨ music is waiting";
  }
});

letterBtn.addEventListener("click", () => {
  letter.classList.toggle("hidden");

  letterBtn.textContent = letter.classList.contains("hidden")
    ? "Open Letter 💌"
    : "Close Letter 🤍";
});

prevBtn.addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

nextBtn.addEventListener("click", () => {
  if (currentSlide < slides.length - 1) {
    showSlide(currentSlide + 1);
  }
});

function createHeart() {
  const heart = document.createElement("div");

  heart.className = "heart";
  heart.textContent = Math.random() > 0.75 ? "🦚" : "♡";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 14 + 14 + "px";
  heart.style.animationDuration = Math.random() * 4 + 5 + "s";

  hearts.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 9000);
}

setInterval(createHeart, 1100);

document.addEventListener("click", (event) => {
  const effect = document.createElement("div");

  effect.className = "tap-effect";
  effect.style.left = `${event.clientX}px`;
  effect.style.top = `${event.clientY}px`;

  document.body.appendChild(effect);

  setTimeout(() => {
    effect.remove();
  }, 700);
});