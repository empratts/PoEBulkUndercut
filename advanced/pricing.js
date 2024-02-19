const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('x');

var slider = document.getElementById("numberOfSales");
var output = document.getElementById("status");

if (myParam) {
    slider.setAttribute("value", myParam);
}

output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}