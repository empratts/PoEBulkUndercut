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
var selling = document.getElementById("selling");
var selling_for = document.getElementById("for");
var in_trades = document.getElementById("in_trades");
var loss_text = document.getElementById("loss");
var left_text = document.getElementById("left");
var income_text = document.getElementById("income");
var price_button = document.getElementById("price")
var price_and_close_button = document.getElementById("priceAndClose")

slider.setAttribute("max", max_trades);
slider.setAttribute("value", max_trades);
slider_value = slider.value;

function updatePrice() {
  //each of the items for sale is worth less than the currency being sold for
  //in this case the slider value is the number of currency items you will get per sale.
  if (unit_price < 1) {
    sell_stack_size = Math.ceil(want_ratio * slider_value + .000000001);
    sell_price = slider_value;
    trades = Math.floor(stack_size / sell_stack_size);
    left = stack_size - (trades * sell_stack_size);
    selling.innerHTML = `Selling ${sell_stack_size}`
    selling_for.innerHTML = `for ${slider_value} ${currency_type}`
    in_trades.innerHTML = `in ${trades} trades`
    loss_text.innerHTML = `Loss: ${(unit_price * trades).toFixed(3)}`
    left_text.innerHTML = `Left: ${left}`
    income_text.innerHTML = `Income: ${slider_value * trades} ${currency_type}`
  } else {
    sell_stack_size = slider_value;
    sell_price = Math.floor(sell_stack_size * unit_price - 0.000000001);
    trades = Math.floor(stack_size / sell_stack_size);
    left = stack_size - (trades * sell_stack_size);
    selling.innerHTML = `Selling ${sell_stack_size}`
    selling_for.innerHTML = `for ${sell_price} ${currency_type}`
    in_trades.innerHTML = `in ${trades} trades`
    loss_text.innerHTML = `Loss: ${trades}`
    left_text.innerHTML = `Left: ${left}`
    income_text.innerHTML = `Income:  ${sell_price * trades} ${currency_type}`
  }
}

function clipboardMod(stack, price, type) {
  if (type != 'Chaos Orb' && type != "Divine Orb") {
    return;
  }

  let orb = 'chaos'
  if (type == 'Divine Orb') {
      orb = 'divine'
  }

  navigator.clipboard.writeText(`~price ${price}/${stack} ${orb}`);
}

updatePrice();
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  slider_value = this.value;

  updatePrice();
}

slider.addEventListener("wheel", function(e) {
  if (e.deltaY < 0) {
    slider.valueAsNumber += 1;
  } else {
    slider.value -= 1;
  }
  slider_value = slider.value;
  e.preventDefault();
  e.stopPropagation();
  updatePrice();
})

price_button.onclick = function () {
  clipboardMod(sell_stack_size, sell_price, currency_type);
};

price_and_close_button.onclick = function () {
  clipboardMod(sell_stack_size, sell_price, currency_type);

  chrome.tabs.getCurrent(function(tab) {
    chrome.tabs.remove(tab.id, function() { });
  });
};