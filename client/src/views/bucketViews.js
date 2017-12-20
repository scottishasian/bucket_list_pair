const BucketView = function(){
 this.countries = [];
 console.log(this.countries);
}

BucketView.prototype.addCountry = function(country) {
 this.countries.push(country);
 // this.render(country);
}
//Adds quotes to an array to display later.

BucketView.prototype.clear = function(country) {
 this.countries = [];
 const ul = document.querySelector('#save-country');
 ul.innerHTML = '';
}

// BucketView.prototype.render = function(country){
//    const ul = document.querySelector('#save-country');
//    const li = document.createElement('li');
//    const text = document.createElement('p');
//    text.innerText = `${country.name}: "${country.country}"`;
//    li.appendChild(text);
//    ul.appendChild(li);
// }

module.exports = BucketView;
