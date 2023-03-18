let r = 0;
let g = 0;
let b = 0;
let a = 1;
let brushColor = `rgba(${r},${g},${b},${a})`;
let rainbowMode = false;
let eraseMode = false;
let gridNumber = 0;

const mainContainer = document.querySelector(".container");
const popUp = document.querySelector(".popup");
const colorPicker = document.querySelector(".color");
const btnRainbow = document.querySelector(".btn.rainbow");
const btnEraser = document.querySelector(".btn.eraser");
const btnEraseAll = document.querySelector(".btn.erase-all");
const pixelRange = document.querySelector(".grid-pixel");
const pixelDisplay = document.querySelector(".pixel p");
const gridWidth = 700;
const gridHeight = 700;

gridNumber = pixelRange.value * pixelRange.value;
pixelDisplay.innerText = `${pixelRange.value} x ${pixelRange.value} Grid`;
//    -----------Event Listeners
//

btnRainbow.addEventListener("click", () => {
  eraseMode = false;
  rainbowMode = !rainbowMode;
  if (rainbowMode) {
    btnRainbow.classList.add("btn-active");
  } else {
    btnRainbow.classList.remove("btn-active");
  }
  btnEraser.classList.remove("btn-active");
});

btnEraser.addEventListener("click", () => {
  rainbowMode = false;
  eraseMode = !eraseMode;
  if (eraseMode) {
    btnEraser.classList.add("btn-active");
  } else {
    btnEraser.classList.remove("btn-active");
  }
  btnRainbow.classList.remove("btn-active");
});

colorPicker.addEventListener("click", () => {
  rainbowMode = false;
  eraseMode = false;
  btnEraser.classList.remove("btn-active");
  btnRainbow.classList.remove("btn-active");
});

btnEraseAll.addEventListener("click", () => {
  const grid = document.querySelectorAll(".grid-unit");
  grid.forEach((grid) => (grid.style.backgroundColor = "white"));
  rainbowMode = false;
  eraseMode = false;
  btnEraser.classList.remove("btn-active");
  btnRainbow.classList.remove("btn-active");
  colorPicked();
});

pixelRange.addEventListener("input", () => {
  console.log("dsaf");
  gridNumber = pixelRange.value * pixelRange.value;
  pixelDisplay.innerText = `${pixelRange.value} x ${pixelRange.value} Grid`;
  removeGrid();
  createGrid();
});

//  -------------FUNCTIONS

//------ create grids
function createGrid() {
  for (let i = 0; i < gridNumber; i++) {
    let grid = document.createElement("div");
    grid.style.backgroundColor = "white";
    grid.style.width = `${gridWidth / pixelRange.value}px`;
    grid.style.height = `${gridHeight / pixelRange.value}px`;
    grid.addEventListener("mouseover", hoverTrail);
    mainContainer.appendChild(grid).classList.add("grid-unit");
  }
}

function removeGrid() {
  const grid = document.querySelectorAll(".grid-unit");
  grid.forEach((grid) => grid.remove());
}

function colorPicked() {
  const colorInput = colorPicker.value;
  r = parseInt(colorInput.substring(1, 3), 16);
  g = parseInt(colorInput.substring(3, 5), 16);
  b = parseInt(colorInput.substring(5, 7), 16);
  brushColor = `rgba(${r},${g},${b},${a})`;
}

function rainbowModeOn() {
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  return (brushColor = `rgba(${r},${g},${b},${a})`);
}

function hoverTrail(e) {
  console.log(e);
  if (e.buttons == 1) {
    if (rainbowMode) {
      rainbowModeOn();
    } else if (eraseMode) {
      brushColor = `white`;
    } else {
      colorPicked();
    }
    this.style.backgroundColor = brushColor;
  }
}

function togglePopUp() {
  if (popUp.classList.contains("open-popup")) {
    popUp.classList.remove("open-popup");
    return;
  }
  popUp.classList.add("open-popup");
}

createGrid();
