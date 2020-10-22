// Kod av Sally Nielsen

'use strict';

// Variables
var outputPortfolio = document.getElementById('table-port');
var portTitle = document.getElementById('title-port');
var portUrl = document.getElementById('url-port');
var portDesc = document.getElementById('desc-port');
var portImg = document.getElementById('image-port');
var form = document.getElementById('form-port');
var idOutputPort = document.getElementById('id-spot');
var portBtn = document.getElementById('sub-btn-port');


// Eventhandlers
// Händelsehantering, när sidan laddas skrivs portfolio ut
window.addEventListener('load', getPort);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Kollar om id har laddats in (kollar om element med id:et id-port existerar)
  if (document.getElementById('id-port') !== null) {
    var id = document.getElementById('id-port').value;

    updatePort(id);
  } else {
    addPort();
  }
});

// Functions
// Reload page funktion
function refresh() {
  return location.reload();
}
// Hämtar all data -------------------
function getPort() {
  outputPortfolio.innerHTML = '';
  fetch('https://www.nielsensw.se/dt173g/portfolio')
    .then((response) => response.json())
    .then((data) => {
      // Skriver ut till DOM
      data.forEach((element) => {
        outputPortfolio.innerHTML += `<tr><th scope='row'> ${element.id} </th> <td> ${element.title} </td>
         <td><a target='_blank' href='${element.url}'>Länk</a></td>
         <td> ${element.description} </td> 
         <td>${element.image}</td>
         <td><button class='btn btn-primary' onClick='getOne(${element.id})'>Ändra</button></td>
         <td><button class='btn btn-danger' onClick='deleteThis(${element.id})'>Radera</button></td></tr>`;
      });
    });
}
// Hämtar en rad ----------------------
function getOne(id) {
  fetch('https://www.nielsensw.se/dt173g/portfolio?id=' + id)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        idOutputPort.innerHTML += `<div class='form-group form-div'> 
              <label for='id'>ID</label><input readonly 
              class='form-control' type='text' id='id-port' name='id' value ='${element.id}'></div>`;
        portTitle.value = `${element.title}`;
        portUrl.value = `${element.url}`;
        portDesc.value = `${element.description}`;
        portImg.value = `${element.image}`;
      });
      portBtn.className = 'btn btn-primary';
    });
}
// Lägger till en rad -------------------------
function addPort() {
  // Tar värdena från formulärets inputs
  let title = portTitle.value;
  let url = portUrl.value;
  let desc = portDesc.value;
  let img = portImg.value;

  // Gör så det kan skickas i json
  let portfolio = JSON.stringify({
    title: title,
    url: url,
    description: desc,
    image: img,
  });

  fetch(
    'https://www.nielsensw.se/dt173g/portfolio',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: portfolio,
    },
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((data) => {
      getPort();
      portTitle.value = '';
      portUrl.value = '';
      portDesc.value = '';
      portImg.value = '';
    })
    .catch((error) => {
      console.error('error: ', error);
    });
}
// Uppdatera---------------------
function updatePort(id) {
  // Tar värdena från formulärets inputs
  var getId = document.getElementById('id-port');
  let index = getId.value;
  let title = portTitle.value;
  let url = portUrl.value;
  let desc = portDesc.value;
  let img = portImg.value;

  // Gör så det kan skickas i json
  let portfolio = JSON.stringify({
    id: index,
    title: title,
    url: url,
    description: desc,
    image: img,
  });
  // Uppdatering av rad skickas, beroende av id
  fetch('https://www.nielsensw.se/dt173g/portfolio?id=' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: portfolio,
  })
    .then((response) => response.json())
    .then((data) => {
      getPort();
      refresh();
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}
// Raderar en rad --------------------------
function deleteThis(id) {
  // Radering av rad skickas, beroende av id
  fetch('https://www.nielsensw.se/dt173g/portfolio?id=' + id, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      getPort();
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}
