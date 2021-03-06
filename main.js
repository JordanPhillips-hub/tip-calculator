// GET BILL VALUE
const bill = document.getElementById('billInput');
const tipButtons = document.querySelectorAll('.btn-percent');
const tipCustom = document.getElementById('custom');
const numPeople = document.getElementById('numPeople');
const errMsg = document.querySelector('.err-msg');
const output = document.querySelectorAll('.output-number');
const buttonReset = document.querySelector('.btn-reset');

function validateFloat(s) {
  var regexp = /^[0-9]*\.?[0-9]*$/;
  return s.match(regexp);
}

function validateInt(s) {
  var regexp = /^[0-9]*$/;
  return s.match(regexp);
}

let billValue = 0.0; // Default Value
let tipValue = 0.0; // Default Value
let peopleValue = 1; // Default Value

bill.addEventListener('input', setBillValue);

tipButtons.forEach(btn => {
  btn.addEventListener('click', handleClick);
});

tipCustom.addEventListener('input', setTipCustomValue);
numPeople.addEventListener('input', setPeopleValue);
buttonReset.addEventListener('click', reset);

function setBillValue() {
  if (bill.value.includes(',')) {
    bill.value = bill.value.replace(',', '.');
  }

  // Cut out invalid characters 
  if (!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }

  billValue = parseFloat(bill.value);
  calcTip();
}

function handleClick() {
  tipButtons.forEach(btn => {
    // Clear active state
    btn.classList.remove('active');

    // Set active state
    if (event.target.innerHTML == btn.innerHTML) {
      btn.classList.add('active');
      tipValue = parseFloat(btn.innerHTML) / 100;

      calcTip();
    }

    // Clear custom tip
    tipCustom.value = '';
  });
}

function setTipCustomValue() {
  if (!validateInt(tipCustom.value)) {
    tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
  }

  tipValue = parseFloat(tipCustom.value / 100);

  // Remove active state from buttons
  tipButtons.forEach(btn => {
    btn.classList.remove('active');
  });

  if (tipCustom.value !== '') {
    calcTip();
  }
}

function setPeopleValue() {
  if (!validateInt(numPeople.value)) {
    numPeople.value = numPeople.value.substring(0, numPeople.value.length - 1);
  }

  peopleValue = parseFloat(numPeople.value);
  if (peopleValue <= 0) {
    errMsg.classList.add('show-err');
    numPeople.classList.add('err-outline');
  } else {
    errMsg.classList.remove('show-err');
    numPeople.classList.remove('err-outline');
  }

  calcTip();
}

function calcTip() {
  if (peopleValue >= 1) {
    let tipAmount = billValue * tipValue / peopleValue;
    let total = billValue * (tipValue + 1) / peopleValue;
    output[0].innerHTML = '$' + tipAmount.toFixed(2);
    output[1].innerHTML = '$' + total.toFixed(2);
  }
}

function reset() {
  bill.value = '';
  setBillValue();

  numPeople.value = '';
  setPeopleValue();

  location.reload();
}
