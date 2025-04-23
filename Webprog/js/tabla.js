let users = [];
let isEditing = false;

document.getElementById('userForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const city = document.getElementById('city').value.trim();
    const email = document.getElementById('email').value.trim();
    const editIndex = document.getElementById('editIndex').value;

    if (!name || !age || !city || !email) return alert("Minden mezőt ki kell tölteni!");

    const userData = { name, age: parseInt(age), city, email };

    if (editIndex === "") {
        users.push(userData);
    } else {
        users[editIndex] = userData;
    }

    renderTable();
    this.reset();
});

function renderTable() {
    const tbody = document.querySelector("#userTable tbody");
    tbody.innerHTML = "";

    const filter = document.getElementById('searchInput').value.toLowerCase();

    users.forEach((user, index) => {
        if (
            user.name.toLowerCase().includes(filter) ||
            user.age.toString().includes(filter) ||
            user.city.toLowerCase().includes(filter) ||
            user.email.toLowerCase().includes(filter)
        ) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.city}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUser(${index})">Szerkesztés</button>
                    <button onclick="deleteUser(${index})">Törlés</button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}

function editUser(index) {
    const user = users[index];
    document.getElementById('name').value = user.name;
    document.getElementById('age').value = user.age;
    document.getElementById('city').value = user.city;
    document.getElementById('email').value = user.email;
    document.getElementById('editIndex').value = index;
}

function deleteUser(index) {
    if (confirm("Biztosan törlöd ezt a sort?")) {
        users.splice(index, 1);
        renderTable();
    }
}

document.getElementById('searchInput').addEventListener('input', renderTable);

let sortAsc = true;
function sortTable(colIndex) {
    users.sort((a, b) => {
        const aVal = Object.values(a)[colIndex];
        const bVal = Object.values(b)[colIndex];
        return sortAsc
            ? aVal.toString().localeCompare(bVal.toString(), 'hu', { numeric: true })
            : bVal.toString().localeCompare(aVal.toString(), 'hu', { numeric: true });
    });
    sortAsc = !sortAsc;
    renderTable();
}
