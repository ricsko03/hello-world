// Web Storage
function saveToLocal() {
    const val = document.getElementById("storageInput").value;
    localStorage.setItem("html5_demo", val);
    document.getElementById("storageResult").innerText = localStorage.getItem("html5_demo");
}

// Web Worker
let worker;
function startWorker() {
    if (window.Worker) {
        if (!worker) {
            worker = new Worker("js/worker.js");
            worker.onmessage = function (e) {
                document.getElementById("workerResult").innerText = e.data;
            };
        }
        worker.postMessage("start");
    } else {
        alert("A böngésző nem támogatja a Web Worker funkciót!");
    }
}

// Geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            document.getElementById("location").innerText =
                `Lat: ${pos.coords.latitude}, Lon: ${pos.coords.longitude}`;
        });
    } else {
        document.getElementById("location").innerText = "A geolokáció nem támogatott.";
    }
}

// Drag and Drop
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

// Canvas rajzolás
window.onload = function () {
    const canvas = document.getElementById("myCanvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "red";
        ctx.fillRect(10, 10, 150, 75);
        ctx.strokeStyle = "black";
        ctx.strokeRect(10, 10, 150, 75);
    }
};
