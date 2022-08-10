import WindowManger from "./modules/manager/windowManager";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let width = canvas.width;
let height = canvas.height;

updateSize();

window.addEventListener('resize', updateSize);

const windowManager = new WindowManger(ctx);

function updateSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    width = canvas.width;
    height = canvas.height;
}

async function render() {

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    windowManager.render()
}

setInterval(render, 1000 / 60);

setInterval(() => {
    windowManager.update()
}, 1000);