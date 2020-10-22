// Kod av Sally Nielsen

'use strict';

// Variables
var outputSchool = document.getElementById('table-scho');
var schoSchool = document.getElementById('school');
var schoName = document.getElementById('name-scho');
var schoYears = document.getElementById('years-scho');
var form = document.getElementById('form-scho');
var idOutputScho = document.getElementById('id-spot-scho');
var schoBtn = document.getElementById('sub-btn-scho');

// Eventhandlers
// Händelsehantering, när sidan laddas skrivs experience ut
window.addEventListener('load', getSchool);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Kollar om id har laddats in (kollar om element med id:et id-scho existerar)
  if (document.getElementById('id-scho') != null) {
    var id = document.getElementById('id-scho').value;

    updateSchool(id);
  } else {
    addSchool();
  }
});

// Functions
//Reload page funktion
function refresh() {
  return location.reload();
}
// Hämtar -------------------
function getSchool() {
  outputSchool.innerHTML = '';
  fetch('https://www.nielsensw.se/dt173g/school')
    .then((response) => response.json())
    .then((data) => {
      // Skriver ut till DOM
      data.forEach((element) => {
        outputSchool.innerHTML += `<tr><th scope='row'> ${element.id} </th>
         <td>${element.school}</td>
         <td> ${element.name} </td> 
         <td>${element.years}</td>
         <td><button class='btn btn-primary' onClick='getOneSchool(${element.id})'>Ändra</button></td>
         <td><button class='btn btn-danger' onClick='deleteThisScho(${element.id})'>Radera</button></td></tr>`;
      });
    });
}
function getOneSchool(id) {
  fetch('https://www.nielsensw.se/dt173g/school?id=' + id)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        idOutputScho.innerHTML = `<div class='form-group form-div'> 
        <label for='id'>ID</label><input readonly 
        class='form-control' type='text' id='id-scho' name='id' value ='${element.id}'></div>`;
        schoSchool.value = `${element.school}`;
        schoName.value = `${element.name}`;
        schoYears.value = `${element.years}`;
      });
      schoBtn.className = 'btn btn-primary';
    });
}
// Lägger till ny ----------------------------------------
function addSchool() {
  // Tar värdena från formulärets inputs
  let school = schoSchool.value;
  let name = schoName.value;
  let years = schoYears.value;
  // Gör så det kan skickas i json
  let newschool = JSON.stringify({
    school: school,
    name: name,
    years: years,
  });

  fetch(
    'https://www.nielsensw.se/dt173g/school',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: newschool,
    },
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((data) => {
      getSchool();
      schoSchool.value = '';
      schoName.value = '';
      schoYears.value = '';
    })
    .catch((error) => {
      console.error('error: ', error);
    });
}

// Uppdaterar ------------------------
function updateSchool(id) {
  // Tar värdena från formulärets inputs
  var getId = document.getElementById('id-scho');
  let index = getId.value;
  let school = schoSchool.value;
  let name = schoName.value;
  let years = schoYears.value;

  // Gör så det kan skickas i json
  let newschool = JSON.stringify({
    id: index,
    school: school,
    name: name,
    years: years,
  });
  // Uppdatering av rad skickas, beroende av id
  fetch('https://www.nielsensw.se/dt173g/school?id=' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: newschool,
  })
    .then((response) => response.json())
    .then((data) => {
      getSchool();
      refresh();
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}

// Raderar -----------------------------------
function deleteThisScho(id) {
  // Radering av rad skickas, beroende av id
  fetch('https://www.nielsensw.se/dt173g/school?id=' + id, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      getSchool();
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}
