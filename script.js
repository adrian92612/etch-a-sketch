const mainContainer = document.querySelector(".container");
const popUp = document.querySelector(".popup");
const colorPicker = document.querySelector(".color");
const btnRainbow = document.querySelector(".btn.rainbow");
const btnEraser = document.querySelector(".btn.eraser");
const btnEraseAll = document.querySelector(".btn.erase-all");
const btnDarken = document.querySelector(".btn.darken");
const btnLighten = document.querySelector(".btn.lighten");
const pixelRange = document.querySelector(".grid-pixel");
const pixelDisplay = document.querySelector(".pixel p");
const gridWidth = 700;
const gridHeight = 700;
const colorChange = 255 * 0.1; //  +/- 5% change

let r = 0;
let g = 0;
let b = 0;
let brushColor = `rgb(${r},${g},${b})`;
let rainbowMode = false;
let eraseMode = false;
let darkenMode = false;
let lightenMode = false;
let gridNumber = 0;

gridNumber = pixelRange.value * pixelRange.value;
pixelDisplay.innerText = `${pixelRange.value} x ${pixelRange.value} Grid`;
//    -----------Event Listeners
//

btnDarken.addEventListener("click", () => {
  eraseMode = false;
  rainbowMode = false;
  lightenMode = false;
  darkenMode = !darkenMode;
  removeActiveBtn();
  if (darkenMode) {
    btnDarken.classList.add("btn-active");
  } else {
    btnDarken.classList.remove("btn-active");
  }
});

btnLighten.addEventListener("click", () => {
  eraseMode = false;
  rainbowMode = false;
  darkenMode = false;
  lightenMode = !lightenMode;
  removeActiveBtn();
  if (lightenMode) {
    btnLighten.classList.add("btn-active");
  } else {
    btnLighten.classList.remove("btn-active");
  }
});

btnRainbow.addEventListener("click", () => {
  eraseMode = false;
  darkenMode = false;
  lightenMode = false;
  rainbowMode = !rainbowMode;
  removeActiveBtn();
  if (rainbowMode) {
    btnRainbow.classList.add("btn-active");
  } else {
    btnRainbow.classList.remove("btn-active");
  }
});

btnEraser.addEventListener("click", () => {
  rainbowMode = false;
  darkenMode = false;
  lightenMode = false;
  eraseMode = !eraseMode;
  removeActiveBtn();
  if (eraseMode) {
    btnEraser.classList.add("btn-active");
  } else {
    btnEraser.classList.remove("btn-active");
  }
});

colorPicker.addEventListener("click", () => {
  rainbowMode = false;
  eraseMode = false;
  darkenMode = false;
  lightenMode = false;
  removeActiveBtn();
});

btnEraseAll.addEventListener("click", () => {
  const grid = document.querySelectorAll(".grid-unit");
  grid.forEach((grid) => (grid.style.backgroundColor = `rgb(255,255,255)`));
  rainbowMode = false;
  eraseMode = false;
  removeActiveBtn();
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
    grid.style.backgroundColor = `rgb(255,255,255)`;
    grid.style.width = `${gridWidth / pixelRange.value}px`;
    grid.style.height = `${gridHeight / pixelRange.value}px`;
    grid.addEventListener("mouseover", hoverTrail);
    mainContainer.appendChild(grid).classList.add("grid-unit");
  }
}

function removeActiveBtn() {
  btnDarken.classList.remove("btn-active");
  btnLighten.classList.remove("btn-active");
  btnRainbow.classList.remove("btn-active");
  btnEraser.classList.remove("btn-active");
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
  brushColor = `rgb(${r},${g},${b})`;
}

function rainbowModeOn() {
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  return (brushColor = `rgb(${r},${g},${b})`);
}

function darkenModeOn(x) {
  const arr = x.replace(/[^\d,]/g, "").split(",");
  r = parseInt(arr[0]) > 0 ? parseInt(arr[0]) - colorChange : 0;
  g = parseInt(arr[1]) > 0 ? parseInt(arr[1]) - colorChange : 0;
  b = parseInt(arr[2]) > 0 ? parseInt(arr[2]) - colorChange : 0;
  brushColor = `rgb(${r},${g},${b})`;
  console.log(brushColor);
}

function lightenModeOn(x) {
  const arr = x.replace(/[^\d,]/g, "").split(",");
  r = parseInt(arr[0]) < 255 ? parseInt(arr[0]) + colorChange : 255;
  g = parseInt(arr[1]) < 255 ? parseInt(arr[1]) + colorChange : 255;
  b = parseInt(arr[2]) < 255 ? parseInt(arr[2]) + colorChange : 255;
  brushColor = `rgb(${r},${g},${b})`;
  console.log(brushColor);
}

function hoverTrail(e) {
  if (e.buttons == 1) {
    if (rainbowMode) {
      rainbowModeOn();
    } else if (eraseMode) {
      brushColor = `rgb(255,255,255)`;
    } else if (darkenMode) {
      darkenModeOn(this.style.backgroundColor);
    } else if (lightenMode) {
      lightenModeOn(this.style.backgroundColor);
    } else {
      colorPicked();
    }
    this.style.backgroundColor = brushColor;
  }
}

createGrid();
