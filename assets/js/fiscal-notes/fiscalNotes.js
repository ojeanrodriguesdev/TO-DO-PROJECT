let notes = [];
let editIndex = -1;
let nextId = 1;

document.addEventListener("DOMContentLoaded", () => {
  loadNotesFromLocalStorage();
  renderTable();
});

function openPopup() {
  document.getElementById("overlay").style.visibility = "visible";
  document.getElementById("popup").style.visibility = "visible";
}

function closePopup() {
  document.getElementById("overlay").style.visibility = "hidden";
  document.getElementById("popup").style.visibility = "hidden";
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

  if (
    !product ||
    !quantify ||
    !date ||
    !supplier ||
    !address ||
    !taxes ||
    !paymentMethods ||
    !description
  ) {
    console.error("One or more form elements not found");
    return;
  }

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
  clearPopupForm();
  closePopup();
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
  reorganizeIds();
  saveNotesToLocalStorage();
  renderTable();
}

function reorganizeIds() {
  notes.forEach((note, index) => {
    note.id = index + 1;
  });
  nextId = notes.length + 1;
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

function saveNotesToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotesFromLocalStorage() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
    reorganizeIds();
  }
}

document.getElementById("overlay").addEventListener("click", closePopup);

document.getElementById("popup").addEventListener("click", (event) => {
  event.stopPropagation();
});
