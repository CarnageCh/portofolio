const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let w, h, t = 0;
function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawWater() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(80, 150, 200, 0.15)";
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    const y = h / 2 
      + Math.sin(x * 0.01 + t) * 20 
      + Math.sin(x * 0.02 + t * 0.7) * 10;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  t += 0.02;
  requestAnimationFrame(drawWater);
}
drawWater();

document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

const sections = document.querySelectorAll(".section");
const navSpans = document.querySelectorAll(".side-nav span");

function activateNav() {
  let index = sections.length;
  while (--index && window.scrollY + 150 < sections[index].offsetTop) {}
  navSpans.forEach(span => span.classList.remove("active"));
  navSpans[index].classList.add("active");
}
activateNav();
window.addEventListener("scroll", activateNav);

navSpans.forEach(span => {
  span.addEventListener("click", () => {
    document.querySelector(span.getAttribute("data-target")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(tc => tc.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// ===== carousel  =====
const track = document.querySelector(".carousel-track");
const items = document.querySelectorAll(".carousel-item");
const indicators = document.querySelector(".carousel-indicators");

let index = 0;
items.forEach((_, i) => {
  const dot = document.createElement("div");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  indicators.appendChild(dot);
});
const dots = indicators.querySelectorAll("div");

function goToSlide(i) {
  index = i;
  track.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[i].classList.add("active");
}

setInterval(() => {
  index = (index + 1) % items.length;
  goToSlide(index);
}, 4000);

const card = document.getElementById("greetingCard");
const inner = document.getElementById("greetingInner");

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * 10;
  const rotateY = ((x - centerX) / centerX) * 10;

  inner.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  card.style.setProperty("--x", `${x}px`);
  card.style.setProperty("--y", `${y}px`);
});

card.addEventListener("mouseleave", () => {
  inner.style.transform = "rotateX(0deg) rotateY(0deg)";
});