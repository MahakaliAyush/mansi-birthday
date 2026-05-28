const typingText = document.getElementById("typing-text");
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const mainContent = document.getElementById("main-content");
const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");

const introText = `
Initializing birthday surprise...

Connecting Brisbane → India...
Loading memories...
Loading smiles...
Loading comfort_person.exe...

Mansi_Birthday.exe is ready.
`;

let index = 0;

function typeIntro() {
  if (index < introText.length) {
    typingText.textContent += introText.charAt(index);
    index++;
    setTimeout(typeIntro, 45);
  }
}

typeIntro();

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  mainContent.classList.remove("hidden");
  window.scrollTo(0, 0);
});

musicBtn.addEventListener("click", async () => {
  try {
    await bgMusic.play();
    musicBtn.textContent = "Music playing softly 🎵";
  } catch {
    musicBtn.textContent = "Tap again to play music 🎵";
  }
});