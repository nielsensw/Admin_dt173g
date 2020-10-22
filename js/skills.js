// Kod av Sally Nielsen

'use strict';

// Variables
var outputSkills = document.getElementById('table-skills');
var skillLang = document.getElementById('lang');
var skillDesc = document.getElementById('desc-skill');
var form = document.getElementById('form-skill');
var idOutputSkills = document.getElementById('id-spot-skill');
var skillBtn = document.getElementById('sub-btn-skill');
// Eventhandlers
// Händelsehantering, när sidan laddas skrivs skills ut
window.addEventListener('load', getSkills);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Kollar om id har laddats in (kollar om element med id:et id-skill existerar)
  if (document.getElementById('id-skill') != null) {
    var id = document.getElementById('id-skill').value;

    updateSkill(id);
  } else {
    addSkill();
  }
});

// Functions
// Reload page funktion
function refresh() {
  return location.reload();
}
// Hämtar all data -------------------
function getSkills() {
  outputSkills.innerHTML = '';
  fetch('https://www.nielsensw.se/dt173g/skills')
    .then((response) => response.json())
    .then((data) => {
      // Skriver ut till DOM
      data.forEach((element) => {
        outputSkills.innerHTML += `<tr><th scope='row'> ${element.id} </th>
         <td>${element.lang}</td>
         <td> ${element.description} </td> 
         <td><button class='btn btn-primary' onClick='getOneSkill(${element.id})'>Ändra</button></td>
         <td><button class='btn btn-danger' onClick='deleteThisSkill(${element.id})'>Radera</button></td></tr>`;
      });
    });
}
// Hämtar en rad ----------------------
function getOneSkill(id) {
  fetch('https://www.nielsensw.se/dt173g/skills?id=' + id)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        idOutputSkills.innerHTML += `<div class='form-group form-div'> 
              <label for='id'>ID</label><input readonly 
              class='form-control' type='text' id='id-skill' name='id' value ='${element.id}'></div>`;
        skillLang.value = `${element.lang}`;
        skillDesc.value = `${element.description}`;
      });
      skillBtn.className = 'btn btn-primary';
      
    });
}
// Lägger till en rad -------------------------
function addSkill() {
  // Tar värdena från formulärets inputs
  let lang = skillLang.value;
  let desc = skillDesc.value;

  // Gör så det kan skickas i json
  let skills = JSON.stringify({
    lang: lang,
    description: desc,
  });

  fetch(
    'https://www.nielsensw.se/dt173g/skills',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: skills,
    },
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((data) => {
      getSkills();
      skillLang.value = '';
      skillDesc.value = '';
    })
    .catch((error) => {
      console.error('error: ', error);
    });
}
// Uppdatera---------------------
function updateSkill(id) {
  // Tar värdena från formulärets inputs
  var getId = document.getElementById('id-skill');
  let index = getId.value;
  let lang = skillLang.value;
  let desc = skillDesc.value;

  // Gör så det kan skickas i json
  let skills = JSON.stringify({
    id: index,
    lang: lang,
    description: desc,
  });
  // Uppdatering av rad skickas, beroende av id
  fetch('https://www.nielsensw.se/dt173g/skills?id=' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: skills,
  })
    .then((response) => response.json())
    .then((data) => {
      getSkills();
      refresh();
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}
// Raderar en rad --------------------------
function deleteThisSkill(id) {
  // Radering av rad skickas, beroende av id
  fetch('https://www.nielsensw.se/dt173g/skills?id=' + id, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      getSkills();
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}
