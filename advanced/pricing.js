const url_params = new URLSearchParams(window.location.search);
let stack_size = url_params.get('stack');
let have_ratio = url_params.get('have');
let want_ratio = url_params.get('want');
let currency_type = url_params.get('currency');
let sell_type = url_params.get('sell');
let max_trades = 1;
let slider_value = 1;
let trades = 1;
let unit_price = 0;
let sell_price = 0;
let sell_stack_size = 0;
let number_of_stacks = 0;
let loss = 0;
let left = 0;

if (stack_size == null) {
  stack_size = 100;
}

if (have_ratio >= 1) {
  unit_price = have_ratio;
  max_trades = stack_size;
} else {
  unit_price = 1.0 / want_ratio;
  max_trades = Math.floor((stack_size - 1) / want_ratio);
}

var slider = document.getElementById("numberOfSales");
var output = document.getElementById("status");

slider.setAttribute("max", max_trades);
slider.setAttribute("value", max_trades);
slider_value = slider.value;

function updatePrice() {
  //each of the items for sale is worth less than the currency being sold for
  //in this case the slider value is the number of currency items you will get per sale.
  if (unit_price < 1) {
    sell_stack_size = Math.ceil(want_ratio * slider_value + .000000001);
    trades = Math.floor(stack_size / sell_stack_size);
    left = stack_size - (trades * sell_stack_size);
    output.innerHTML = `Selling ${sell_stack_size} for ${slider_value} ${currency_type} in ${trades} trades. Loss: ${(unit_price * trades).toFixed(3)}  Left: ${left}   Income: ${slider_value * trades} ${currency_type}`;
  } else {
    sell_stack_size = slider_value;
    sell_price = Math.floor(sell_stack_size * unit_price - 0.000000001);
    trades = Math.floor(stack_size / sell_stack_size);
    left = stack_size - (trades * sell_stack_size);
    output.innerHTML = `Selling ${sell_stack_size} for ${sell_price} ${currency_type} in ${trades} trades. Loss: ${trades}  Left: ${left}   Income: ${sell_price * trades} ${currency_type}`;
  }

}

updatePrice();
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  slider_value = this.value;

  updatePrice();
}