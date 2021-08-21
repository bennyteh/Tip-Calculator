let billAmount = document.getElementById('total_amount');
let tipPercent = document.querySelectorAll('.percentage_button');
let people = document.getElementById('people');
let warning = document.getElementsByClassName('warning');
let tipPerPerson = document.getElementById('tip-per-person');
let totalPerPerson = document.getElementById('total-per-person');
let reset = document.getElementById('reset');
let customTip = document.getElementById('custom_tip');


let currentBillAmount;
let currentTipValue;
let numberOfPeople;

function amountPerPerson(total, percent, ppl) {
    
    if (!total) return
    if (!percent) return
    if (!ppl) return

    let tips = total * percent / 100
    let tipToPay = tips / ppl
    let totalMoneyToPay = total / ppl + tipToPay
    
    tipPerPerson.innerHTML = "$ " + tipToPay.toFixed(2)
    totalPerPerson.innerHTML = "$ " + totalMoneyToPay.toFixed(2)

    reset.classList.add('button-active')
}

function currentTip(value){
    currentTipValue = value
    amountPerPerson(currentBillAmount, currentTipValue, numberOfPeople)
}

function currentBill(value){
    currentBillAmount = value
    amountPerPerson(currentBillAmount, currentTipValue, numberOfPeople)
}


tipPercent.forEach(button => {
    button.addEventListener('click', function(event){

        document.querySelectorAll('.button_focus').forEach(button=> {
            button.classList.remove("button_focus")
        })
   
        event.target.classList.add("button_focus")

        currentTipValue = event.target.value
        amountPerPerson(currentBillAmount, currentTipValue, numberOfPeople)
    })
})

customTip.addEventListener('keydown', function(event){

    if (Number(event.key) || event.key === "0"){
        document.querySelectorAll('.button_focus').forEach(button=> {
            button.classList.remove("button_focus")
        })
    }

})

people.addEventListener('keydown', function(e) {
    if (e.key === '.') {
        e.preventDefault()
        return
    }
})

function errorCheck(val) {
    warning[0].innerHTML = ""
    if (val <= "0") {
       
        if (val <= 0) {
            warning[0].innerHTML = "Cant't be zero"
        }
    }
    numberOfPeople = val;
    amountPerPerson(currentBillAmount, currentTipValue, numberOfPeople)
}

function handleClickReset(e) {
    if (e[1] !== "button-active") return

    e.remove('button-active')

    currentBillAmount = undefined;
    currentTipValue = undefined;
    numberOfPeople = undefined;

    document.querySelectorAll('.button_focus').forEach(button=> {
        button.classList.remove("button_focus")
    })

    billAmount.value = ""
    people.value = ""
    customTip.value = ""
    tipPerPerson.innerHTML = "$ 0.00"
    totalPerPerson.innerHTML = "$ 0.00"
    
}