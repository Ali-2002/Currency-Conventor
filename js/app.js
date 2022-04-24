//Selectors
let hamburger = document.querySelector("#hamburger i");
let hamburgerDiv = document.querySelector("#hamburger");
let closeMenu = document.querySelector("#close-menu i");
let mobilenav = document.querySelector(".pages")
const crFrom = document.querySelectorAll(".left-side button");
const crTo = document.querySelectorAll(".right-side button");
let inputText = document.querySelector(".input-text");
let outputText = document.querySelector(".output-text");
let info = document.querySelectorAll(".info");
let allCrItems = document.querySelectorAll(".cr-from button");
let base = 'RUB',
    symbols = 'USD';

hamburger.addEventListener("click", (e) => {
    e.preventDefault();
    if (hamburgerDiv.style.display == 'flex') {
        hamburgerDiv.style.display = 'none';
        mobilenav.style.display = 'flex';
    }
});
closeMenu.addEventListener("click", (e) => {
    e.preventDefault();
    if (mobilenav.style.display == 'flex') {
        mobilenav.style.display = 'none';
        hamburgerDiv.style.display = "flex";
    }
});


crFrom.forEach(element => {
    element.addEventListener("click", (e) => {
        e.preventDefault();
        crFrom.forEach(element => {
            element.classList.remove("activated")
        });
        element.classList.add("activated");
        base = e.target.value;
        console.log(base);
        calculate();
        //calculate_2();
    });
});

crTo.forEach(element => {
    element.addEventListener("click", (e) => {
        e.preventDefault();
        crTo.forEach(element => {
            element.classList.remove("activated")
        });
        element.classList.add("activated");
        symbols = e.target.value;
        console.log(symbols);
        calculate();
        //calculate_2();
    });
});



async function calculate() {
    let requestUrl_1 = fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`)
    requestUrl_1
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const rate = Object.entries(data.rates)[0][1];
            info[0].innerHTML = "";
            info[0].innerHTML = `1 ${base} = ${rate} ${symbols}`;
            if (inputText.value.includes(',')) {
                inputText.value = inputText.value.replace(',', '.');
            }
            outputText.value = "";
            outputText.value = (inputText.value * rate).toFixed(4);
        })
        .catch((err) => {
            console.log(err);
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
            console.log(err);
        });
    inputText.addEventListener("keyup", (e) => {
        if (inputText.value == "") {
            outputText.value = "";
        }
    })
}

async function calculate_2() {
    let requestUrl_1 = fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`)
    requestUrl_1
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const rate = Object.entries(data.rates)[0][1];
            info[0].innerHTML = "";
            info[0].innerHTML = `1 ${symbols} = ${rate} ${base}`;
        })
        .catch((err) => {
            alert('Error');
        });

    let requestUrl_2 = fetch(`https://api.exchangerate.host/latest?base=${symbols}&symbols=${base}`)
    requestUrl_2
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const rate = Object.entries(data.rates)[0][1];
            info[1].innerHTML = "";
            info[1].innerHTML = `1 ${base} = ${rate} ${symbols}`;
            if (outputText.value.includes(',')) {
                outputText.value = outputText.value.replace(',', '.');
            }
            inputText.value = "";
            inputText.value = (outputText.value * rate).toFixed(4);
        })
        .catch((err) => {
            alert('Error');
        });
    outputText.addEventListener("keyup", (e) => {
        if (outputText.value == "") {
            inputText.value = "";
        }
    })
}


inputText.addEventListener("input", calculate);
outputText.addEventListener("input", calculate_2);