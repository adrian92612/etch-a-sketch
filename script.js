
const mainContainer = document.querySelector('.container');


(function () {
    for (let i = 0 ; i < 256 ; i++) {
        let grid = document.createElement('div')
        grid.addEventListener('mouseover', hoverTrail);
        mainContainer.appendChild(grid).classList.add('grid-unit');
    }
})();

function hoverTrail () {
    console.log(this);
    this.style.backgroundColor = 'black';
}
