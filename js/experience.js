// Kod av Sally Nielsen

'use strict';

// Variables
var outputexperience = document.getElementById('table-exp');
var expWorkplace = document.getElementById('workplace');
var expTitle = document.getElementById('title-exp');
var expYears = document.getElementById('years-exp');
var form = document.getElementById('form-exp');
var idOutput = document.getElementById('id-spot-exp');
var expBtn =document.getElementById('sub-btn-exp');


// Eventhandlers
// Händelsehantering, när sidan laddas skrivs experience ut
window.addEventListener('load', getExp);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Kollar om id har laddats in (kollar om element med id:et id-port existerar)
  if (document.getElementById('id-exp') != null) {
    var id = document.getElementById('id-exp').value;

    updateExp(id);
  } else {
    addExp();
  }
});

// Functions
// reload page funktion
function refresh() {
    return location.reload();
  }

// Hämtar -------------------
function getExp() {
  outputexperience.innerHTML = '';
  fetch('https://www.nielsensw.se/dt173g/experience')
    .then((response) => response.json())
    .then((data) => {
      // Skriver ut till DOM
      data.forEach((element) => {
        outputexperience.innerHTML += `<tr><th scope='row'> ${element.id} </th>
         <td>${element.workplace}</td>
         <td> ${element.title} </td> 
         <td>${element.years}</td>
         <td><button class='btn btn-primary' onClick='getOneExp(${element.id})'>Ändra</button></td>
         <td><button class='btn btn-danger' onClick='deleteExp(${element.id})'>Radera</button></td></tr>`;
      });
    });
}
function getOneExp(id) {
  fetch('https://www.nielsensw.se/dt173g/experience?id=' + id)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        idOutput.innerHTML = `<div class='form-group form-div'> 
        <label for='id'>ID</label><input readonly 
        class='form-control' type='text' id='id-exp' name='id' value ='${element.id}'></div>`;
        expWorkplace.value = `${element.workplace}`;
        expTitle.value = `${element.title}`;
        expYears.value = `${element.years}`;
      });
      expBtn.className = 'btn btn-primary';
    });
}
// Lägger till ny ----------------------------------------
function addExp() {
  // Tar värdena från formulärets inputs
  let workplace = expWorkplace.value;
  let title = expTitle.value;
  let years = expYears.value;
  // Gör så det kan skickas i json
  let experience = JSON.stringify({
    workplace: workplace,
    title: title,
    years: years,
 
  });

  fetch(
    'https://www.nielsensw.se/dt173g/experience',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: experience,
    },
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((data) => {
      getExp();
      expWorkplace.value = '';
      expTitle.value = '';
      expYears.value = '';
    })
    .catch((error) => {
      console.error('error: ', error);
    });
}

// Uppdaterar ------------------------
function updateExp(id) {
  // Tar värdena från formulärets inputs
  var getId = document.getElementById('id-exp');
  let index = getId.value;
  let workplace = expWorkplace.value;
  let title = expTitle.value;
  let years = expYears.value;

  // Gör så det kan skickas i json
  let experience = JSON.stringify({
    id: index,
    workplace: workplace,
    title: title,
    years: years,
  });
  // Uppdatering av rad skickas, beroende av id
  fetch('https://www.nielsensw.se/dt173g/experience?id=' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: experience,
  })
    .then((response) => response.json())
    .then((data) => {
      getExp();
      refresh();
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}

// Raderar -----------------------------------
function deleteExp(id) {
  // Radering av rad skickas, beroende av id
  fetch('https://www.nielsensw.se/dt173g/experience?id=' + id, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      getExp();
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}
