function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const start = document.querySelector("button[data-start]");
const stop = document.querySelector("button[data-stop]");
stop.setAttribute("disabled", true);
let interval;

start.addEventListener("click", () => {
  interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");
});
stop.addEventListener("click", () => {
  clearInterval(interval);
  start.removeAttribute("disabled");
  stop.setAttribute("disabled", true);
});
