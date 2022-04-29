//Selectors
const firstInput = document.getElementById("in-put");
const secondInput = document.getElementById("out-put");
const crFrom = document.querySelectorAll(".left-side button");
const crTo = document.querySelectorAll(".right-side button");
let inputText = document.querySelector(".input-text");
let outputText = document.querySelector(".output-text");
let info = document.querySelectorAll(".info");
let allCrItems = document.querySelectorAll(".cr-from button");
let base = 'RUB',
    symbols = 'USD';
inputText.value = "1"
outputText.value = "0.0129"
let menu = document.querySelector(".header-phone  .menu");
let menubar = document.querySelector(".header-phone .menu-bar");
menu.addEventListener("click", () => {
    menu.classList.toggle("active")
    menubar.classList.toggle("active")
});

function commify(n) {
    var parts = n.toString().split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return (
        numberPart.replace(thousands, " ") + (decimalPart ? "." + decimalPart : "")
    );
}

crFrom.forEach(element => {
    element.addEventListener("click", (e) => {
        crFrom.forEach(element => {
            element.classList.remove("activated")
        });
        element.classList.add("activated");
        base = e.target.value;
        console.log(base);
        calculate_2();
    });
});

crTo.forEach(element => {
    element.addEventListener("click", (e) => {
        crTo.forEach(element => {
            element.classList.remove("activated")
        });
        element.classList.add("activated");
        symbols = e.target.value;
        console.log(symbols);
        calculate();
    });
});

window.addEventListener("offline", (e) => {
    throw alert('no connection');
})

async function calculate() {
    let requestUrl_1 = fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`)
    requestUrl_1
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const rate = Object.entries(data.rates)[0][1];
            info[0].innerHTML = "";
            info[0].innerHTML = `1 ${base} = ${rate} ${symbols}`;
            outputText.value = "";
            outputText.value = (inputText.value.replaceAll(" ", "") * rate).toFixed(4);
            outputText.value = commify(outputText.value)
        })
        .catch((err) => {
            alert(err);
        });

    let requestUrl_2 = fetch(`https://api.exchangerate.host/latest?base=${symbols}&symbols=${base}`)
    requestUrl_2
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const rate = Object.entries(data.rates)[0][1];
            info[1].innerHTML = "";
            info[1].innerHTML = `1 ${symbols} = ${rate} ${base}`;
        })
        .catch((err) => {
            alert(err);
        });
}

async function calculate_2() {
    let requestUrl_1 = fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`)
    requestUrl_1
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const rate = Object.entries(data.rates)[0][1];
            info[0].innerHTML = "";
            info[0].innerHTML = `1 ${base} = ${rate} ${symbols}`;
        })
        .catch((err) => {
            alert(err);
        });

    let requestUrl_2 = fetch(`https://api.exchangerate.host/latest?base=${symbols}&symbols=${base}`)
    requestUrl_2
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const rate = Object.entries(data.rates)[0][1];
            info[1].innerHTML = "";
            info[1].innerHTML = `1 ${symbols} = ${rate} ${base}`;
            inputText.value = "";
            inputText.value = (outputText.value.replaceAll(" ", "") * rate).toFixed(4);
            inputText.value = commify(inputText.value)
        })
        .catch((err) => {
            alert(err);
        });
}


$(document).ready(function () {
    $('#icon').click(function () {
        $('ul').toggleClass('show');
    });
});


inputText.addEventListener("input", calculate);
outputText.addEventListener("input", calculate_2);

var numberMask = IMask(firstInput, {
    mask: Number, // enable number mask

    // other options are optional with defaults below
    scale: 6, // digits after point, 0 for integers
    signed: false, // disallow negative
    thousandsSeparator: ' ', // any single char
    padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
    normalizeZeros: true, // appends or removes zeros at ends
    radix: '.', // fractional delimiter
    mapToRadix: [','], // symbols to process as radix

});

var numberMask = IMask(secondInput, {
    mask: Number, // enable number mask

    // other options are optional with defaults below
    scale: 6, // digits after point, 0 for integers
    signed: false, // disallow negative
    thousandsSeparator: ' ', // any single char
    padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
    normalizeZeros: true, // appends or removes zeros at ends
    radix: '.', // fractional delimiter
    mapToRadix: [','], // symbols to process as radix

});