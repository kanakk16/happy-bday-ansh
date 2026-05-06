let confettiRunning = false;

function showCake() {
  let music = document.getElementById("bgMusic");

  music.play();   // 🔥 yaha se song start hoga

  switchPage("page1", "page2");
}

function cutCake() {
  document.querySelector(".cake").style.transform = "scale(0.95)";

  createConfetti();

  confettiRunning = true;   // 🔥 start
  animateConfetti();

  document.getElementById("nextBtn").style.display = "block";
}

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pieces = [];

function createConfetti() {
  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 3 + 2,
      color: `hsl(${Math.random()*360}, 100%, 60%)`
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach((p) => {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });
}

function updateConfetti() {
  pieces.forEach((p) => {
    p.y += p.speed;
    if (p.y > canvas.height) p.y = -10;
  });
}

function animateConfetti() {
  if (!confettiRunning) return;

  drawConfetti();
  updateConfetti();
  requestAnimationFrame(animateConfetti);
}

function goToGift() {
  confettiRunning = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces = [];

  switchPage("page2", "page3");
}

function openGift() {
  switchPage("page3", "page4");
}

function switchPage(currentId, nextId) {

  let currentPage = document.getElementById(currentId);
  let nextPage = document.getElementById(nextId);

  // exit animation
  currentPage.classList.add("hide");

  setTimeout(() => {

    currentPage.style.display = "none";

    // show next page
    nextPage.style.display = "flex";

    nextPage.classList.remove("hide");
    nextPage.classList.add("show");

  }, 1200);

  setTimeout(() => {
  let animItems = nextPage.querySelectorAll(".animate");
  animItems.forEach(el => {
    el.classList.add("show");
  });
}, 2000);
}