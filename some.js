let operatorConvertDict = {"divide": "/", "multiply": "*", "add": "+", "subtract": "-"}
let mainDisplay = document.getElementById('result-p')
let subDisplay = document.getElementById('calc-input')
let mainVal = ''
let subVal = ''
let currentOp = ''
let waitNum = 1

function addNum(num) {
    if (waitNum) {
        mainDisplay.textContent = num
        waitNum = 0
    } else {
        mainDisplay.textContent += num
    }
}

function addOp(op) {
    let opVal = ''
    if (["+", "-", "*", "/"].includes(op)) {
        opVal = op
    } else {
        opVal = operatorConvertDict[op]
    }
    // no need to calculate
    if (subDisplay.value === '') {
        subVal = Number(mainDisplay.textContent)
        subDisplay.value = subVal.toString() + opVal
        // mainDisplay.textContent = ''
        waitNum = 1
        console.log(1)

    } else if (waitNum) {
        if (waitNum === 1) /* already has a currentOp, just need to update to the newest one */ {
            subDisplay.value = subDisplay.value.slice(0, -1) + opVal
        } else /* waitNum == 2: no currentOp yet, can take one */ {
            subDisplay.value += opVal
        }
        console.log(2)

    } else /* need to calculate */ {
        mainVal = mainDisplay.textContent
        let computeRes = compute()
        mainDisplay.textContent = computeRes
        subDisplay.value = computeRes.toString() + opVal
        subVal = computeRes
        waitNum = 1
        console.log(3)
    }
    currentOp = opVal
}

function compute() {
    let result = 0
    let subNum = Number(subVal)
    let mainNum = Number(mainVal)
    switch (currentOp) {
        case "+":
            result = subNum + mainNum
            break;
        case "-":
            result = subNum - mainNum
            break;
        case "*":
            result = subNum * mainNum
            break;
        case "/":
            if (mainNum == 0) {
                result = 'Error'
            } else {
                result = subNum / mainNum
            }
            break;
        default:
            result = 'Error'
    }
    return result
}

function ac() {
    waitNum = 1
    mainVal = ''
    subVal = ''
    currentOp = ''
    mainDisplay.textContent = '0'
    subDisplay.value = ''
}

function backspace() {
    if (waitNum) {
        if (waitNum === 2) {
            subDisplay.value = ''
        } else {
            return
        }
    } else {
        mainDisplay.textContent = mainDisplay.textContent.slice(0, -1)
    }
}

function dot() {
    let currentVal = mainDisplay.textContent
    if (currentVal=== '') {
        mainDisplay.textContent = '0.'
    } else {
        if (currentVal.includes('.')) {
            return
        } else {
            mainDisplay.textContent += '.'
        }
    }
}

function percent() {
    let a = Number(mainDisplay.textContent)/100
    mainDisplay.textContent = a.toString()
}

function equal() {
    mainVal = mainDisplay.textContent
    let computeRes = ''
    if (subVal === '') {
        computeRes = Number(mainVal)
        mainDisplay.textContent = computeRes
    } else {
        computeRes = compute()
        mainDisplay.textContent = computeRes
        subVal = computeRes
    }
    subDisplay.value = computeRes.toString()
    waitNum = 2
}

// Numbers Clicked
let numbers = document.querySelectorAll('.numbers')
numbers.forEach(button => {
    button.addEventListener('click', () => {
        let id = button.id
        addNum(id)
    })
});

// Dot Clicked
let dotBtn = document.getElementById('dot')
dotBtn.addEventListener('click', dot)

// Percent Clicked
let pctBtn = document.getElementById('percent')
pctBtn.addEventListener('click', percent)

// Operators Clicked
let operators = document.querySelectorAll('.operators')
operators.forEach(button => {
    button.addEventListener('click', () => {
        let id = button.id
        addOp(id)
    })
});

// Equal Button Action
let equalBtn = document.getElementById('equal')
equalBtn.addEventListener('click', equal)

// AC Button or ESC pressed 
let acBtn = document.getElementById('ac')
acBtn.addEventListener('click', ac)

// DEL Button, or Backspace or Delete pressed
let delBtn = document.getElementById('delete')
delBtn.addEventListener('click', backspace)

document.addEventListener('keyup', (e) => {
    let k = e.key
    switch (k) {
        case 'Escape':
            ac()
            break;
        case 'Backspace':
        case 'Delete':
            backspace()
            break;
        case '.':
            dot()
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            addNum(k)
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            addOp(k)
            break;
        case "=":
            equal()
            break;
        case '%':
            percent()
            break;
        default:
    }
})

