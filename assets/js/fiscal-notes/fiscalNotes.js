let notes = [];
let editIndex = -1;
let nextId = 1;

document.addEventListener("DOMContentLoaded", () => {
  saveNotesFromLocalStorage();
  renderTable();
});

function saveNote() {
  const id = editIndex >= 0 ? notes[editIndex].id : nextId++;
  const product = document.getElementById("product").value;
  const quantify = document.getElementById("quantify").value;
  const date = document.getElementById("date").value;
  const supplier = document.getElementById("supplier").value;
  const address = document.getElementById("address").value;
  const taxes = document.getElementById("taxes").value;
  const paymentMethods = document.getElementById("payment-methods").value;
  const description = document.getElementById("description").value;

  const note = {
    id: id || new Date().getTime(),
    product,
    quantify,
    date,
    supplier,
    address,
    taxes,
    paymentMethods,
    description, 
  };

  if (editIndex >= 0) {
    notes[editIndex] = note;
    editIndex = -1;
  } else {
    notes.push(note);
  }

  renderTable();
  clearForm();
}

function editNote(index) {
  const note = notes[index];
  document.getElementById("popup-id").value = note.id;
  document.getElementById("popup-product").value = note.product;
  document.getElementById("popup-quantify").value = note.quantify;
  document.getElementById("popup-date").value = note.date;
  document.getElementById("popup-supplier").value = note.supplier;
  document.getElementById("popup-address").value = note.address;
  document.getElementById("popup-taxes").value = note.taxes;
  document.getElementById("popup-payment-methods").value = note.paymentMethods;
  document.getElementById("popup-description").value = note.description;
  editIndex = index;
  openPopup();
}

function deleteNote(index) {
  notes.splice(index, 1);
  renderTable();
}

function reorganizeIds() {
  notes.forEach((note, index) => {
    note.id = index + 1;
  });
  nextId = notes.length + 1;
}

function clearForm() {
  document.getElementById("note-id").value = "";
  document.getElementById("product").value = "";
  document.getElementById("quantify").value = "";
  document.getElementById("date").value = "";
  document.getElementById("supplier").value = "";
  document.getElementById("address").value = "";
  document.getElementById("taxes").value = "";
  document.getElementById("payment-methods").value = "";
  document.getElementById("description").value = "";
  editIndex = -1;
}

function openPopup() {
  document.getElementById("overlay").classList.remove("hidden");
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("overlay").classList.add("hidden");
  document.getElementById("popup").classList.add("hidden");
  clearPopupForm();
}

function clearPopupForm() {
  document.getElementById("popup-id").value = "";
  document.getElementById("popup-product").value = "";
  document.getElementById("popup-quantify").value = "";
  document.getElementById("popup-date").value = "";
  document.getElementById("popup-supplier").value = "";
  document.getElementById("popup-address").value = "";
  document.getElementById("popup-taxes").value = "";
  document.getElementById("popup-payment-methods").value = "";
  document.getElementById("popup-description").value = "";
  editIndex = -1;
}

function savePopupNote() {
  const id = editIndex >= 0 ? notes[editIndex].id : nextId++;
  const product = document.getElementById("popup-product").value;
  const quantify = document.getElementById("popup-quantify").value;
  const date = document.getElementById("popup-date").value;
  const supplier = document.getElementById("popup-supplier").value;
  const address = document.getElementById("popup-address").value;
  const taxes = document.getElementById("popup-taxes").value;
  const paymentMethods = document.getElementById("popup-payment-methods").value;
  const description = document.getElementById("popup-description").value;

  const note = {
    id: id || new Date().getTime(),
    product,
    quantify,
    date,
    supplier,
    address,
    taxes,
    paymentMethods,
    description,
  };

  if (editIndex >= 0) {
    notes[editIndex] = note;
    editIndex = -1;
  } else {
    notes.push(note);
  }

  saveNotesToLocalStorage();
  renderTable();
  closePopup();
}

function renderTable() {
  const tbody = document.getElementById("notes-body");
  tbody.innerHTML = "";
  notes.forEach((note, index) => {
    const tr = document.createElement("tr");

    for (let key in note) {
      const td = document.createElement("td");
      td.textContent = note[key];
      tr.appendChild(td);
    }

    const actionTd = document.createElement("td");
    actionTd.innerHTML = `
              <button onclick="editNote(${index})">Editar</button>
              <button onclick="deleteNote(${index})">Excluir</button>
          `;
    tr.appendChild(actionTd);

    tbody.appendChild(tr);
  });
}

function deleteNote(index) {
  notes.splice(index, 1);
  reorganizeIds();
  saveNotesToLocalStorage();
  renderTable();
}

function saveNotesToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function saveNotesFromLocalStorage() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
    reorganizeIds();
  }
}
