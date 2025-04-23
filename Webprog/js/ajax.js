const code = "ABC123xyz999"; // NeptunKód + saját kód!

function read() {
    fetch("http://gamf.nhely.hu/ajax2/?op=read&code=" + code)
        .then(res => res.json())
        .then(data => {
            const list = data.list;
            let html = "<ul>";
            let sum = 0, max = 0;

            list.forEach(item => {
                html += `<li>ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}</li>`;
                const h = parseFloat(item.height);
                sum += h;
                if (h > max) max = h;
            });

            html += "</ul>";
            document.getElementById("result").innerHTML = html;

            const avg = list.length ? (sum / list.length).toFixed(2) : 0;
            document.getElementById("summary").innerText =
                `Összeg: ${sum}, Átlag: ${avg}, Max: ${max}`;
        });
}

function create() {
    const name = getVal("name");
    const height = getVal("height");
    const weight = getVal("weight");

    if (!validate(name, height, weight)) return;

    const params = new URLSearchParams({
        op: "create", code, name, height, weight
    });

    fetch("http://gamf.nhely.hu/ajax2/", {
        method: "POST",
        body: params
    })
        .then(res => res.text())
        .then(text => alert("Létrehozás válasz: " + text));
}

function update() {
    const id = getVal("idInput");
    const name = getVal("name");
    const height = getVal("height");
    const weight = getVal("weight");

    if (!id || !validate(name, height, weight)) return;

    const params = new URLSearchParams({
        op: "update", code, id, name, height, weight
    });

    fetch("http://gamf.nhely.hu/ajax2/", {
        method: "POST",
        body: params
    })
        .then(res => res.text())
        .then(text => alert("Módosítás válasz: " + text));
}

function deleteById() {
    const id = getVal("idInput");
    if (!id) return alert("Add meg az ID-t!");

    const params = new URLSearchParams({
        op: "delete", code, id
    });

    fetch("http://gamf.nhely.hu/ajax2/", {
        method: "POST",
        body: params
    })
        .then(res => res.text())
        .then(text => alert("Törlés válasz: " + text));
}

function loadById() {
    const id = getVal("idInput");
    if (!id) return alert("Adj meg ID-t!");

    fetch("http://gamf.nhely.hu/ajax2/?op=read&code=" + code)
        .then(res => res.json())
        .then(data => {
            const item = data.list.find(i => i.id === id);
            if (item) {
                document.getElementById("name").value = item.name;
                document.getElementById("height").value = item.height;
                document.getElementById("weight").value = item.weight;
            } else {
                alert("Nem található ilyen ID-hez adat.");
            }
        });
}

function validate(name, height, weight) {
    if (!name || !height || !weight) {
        alert("Minden mező kötelező!");
        return false;
    }
    if (name.length > 30 || height.length > 30 || weight.length > 30) {
        alert("Max 30 karakter mezőnként!");
        return false;
    }
    return true;
}

function getVal(id) {
    return document.getElementById(id).value.trim();
}
