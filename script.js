document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('backBtn');
    const forwardBtn = document.getElementById('forwardBtn');

    backBtn.onclick = () => history.back();
    forwardBtn.onclick = () => history.forward();
});

// Canvas Графика и Анимация
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let x = 0;
let y = canvas.height / 2;
const speed = 2;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
    x += speed;
    if (x > canvas.width) {
        x = 0;
    }
    requestAnimationFrame(draw);
}
draw();

// Web Workers
const computeBtn = document.getElementById('computeBtn');
const result = document.getElementById('result');

computeBtn.onclick = () => {
    const numberInput = document.getElementById('numberInput').value;
    if (!numberInput) {
        alert('Пожалуйста, введите число.');
        return;
    }

    const worker = new Worker('worker.js');
    worker.postMessage(numberInput);

    worker.onmessage = (event) => {
        result.textContent = `Результат: ${event.data}`;
        worker.terminate();
    };

    worker.onerror = (event) => {
        result.textContent = `Ошибка: ${event.message}`;
    };
};