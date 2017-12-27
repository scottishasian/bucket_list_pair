const BucketView = require('./views/bucketViews');
const Request = require('./services/request.js');
const MapWrapper = require('./mapWrapper.js');

const bucketView = new BucketView();
const request = new Request("http://localhost:3000/api/list")

let countries = [];

const app = function(){

  const url = 'https://restcountries.eu/rest/v2/all';
  const onSelect = document.querySelector('#select');
  makeRequest(url, requestCompleteDropdown)
  onSelect.addEventListener('change', function(){

    const createCountryButton = document.querySelector('#save-country');
    createCountryButton.addEventListener('click', createButtonClicked);

    request.get(getCountriesRequestComplete);

    const ul = document.querySelector('#country-list');
    const p = document.querySelector('#country-info');
    ul.innerHTML = "";
    p.innerHTML = "";
    const li = document.createElement("li");
    const img = document.createElement("img")
    const para = document.createElement("p");
    const para2 = document.createElement("p");
    li.innerText = "Name: " + countries[this.value].name
    para.innerText = "Population: " + countries[this.value].population
    para2.innerText = "Region: " + countries[this.value].region
    img.src = countries[this.value].flag;
    ul.appendChild(li);
    ul.appendChild(img);
    p.appendChild(para);
    p.appendChild(para2);
  });

}

const createButtonClicked = function(evt) {
  evt.preventDefault();
  console.log('submit button clicked')


  const value = document.querySelector('#select').value;
  const country = countries[value];
  const reasonValue = document.querySelector('#reason').value;
  // const nameValue = document.querySelector(value.name);

  const body = {
    name: country.name,
    reason: reasonValue,
    flag: country.flag
  }

  request.post(getCountriesRequestComplete, body);
  bucketView.render(body);

}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.addEventListener('load', callback);
}

const requestCompleteDropdown = function() {
  if (this.status !== 200) return;
  const jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  handlSelectChange(countries);
}

const handlSelectChange = function(countries) {
  const select = document.querySelector("#select")
  countries.forEach(function(country, index) {
    let option = document.createElement("option")
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);

  }.bind(this));

}

const getCountriesRequestComplete = function(country) {
    bucketView.addCountry(country); //calls object, function, item.

}

const initialize =  function() {
  let mapDiv = document.getElementById('country-map');

  let center = {lat: 40.712784, lng: -34.005941};

  let countryMap = new MapWrapper(mapDiv, center, 10, function() {
    countryMap.addMarker(center);
  });

}



document.addEventListener('DOMContentLoaded', app);
window.addEventListener('load', initialize);
