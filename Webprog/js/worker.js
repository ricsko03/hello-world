onmessage = function () {
    let sum = 0;
    for (let i = 0; i < 1e8; i++) {
        sum += i;
    }
    postMessage("Összeg: " + sum);
};
