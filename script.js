let num1 = '';
let operator = [];
let num2 = '';
let memory = [];

function createElement(element, className = '', id = '', type) {
    let elem = document.createElement(element);
    elem.setAttribute('class', className);
    elem.setAttribute('id', id);
    if (type !== '' && type !== undefined) {
        elem.setAttribute('type', type);
    }
    return elem;
}

document.body.addEventListener('keypress', (e) => {
    if (e.key != '') {
        if ((typeof (+e.key) === 'number' && !isNaN(+e.key)) || (e.key === '.')) {
            numFunction(e.key)
        } else {
            let opr = e.key;
            if (opr === '+' || opr === '-' || opr === '*' || opr === '/' || opr === '%' || opr === '=') {
                if (opr === '=')
                    equalToFunction(opr)
                else
                    operatorFunction(opr)
            } else if (e.key === 'Enter') {
                equalToFunction('=')
            }
        }
    }
})

document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
        backSpace();
    }
})


function numFunction(num) {
    let input = document.querySelector("#bottom").value;
    if (num === '.') {
        if (input.includes('.'))
            return;
    }
    if (operator.length) {
        if (operator[0] !== '=')
            num2 = num2 + num;
    } else {
        num1 = num1 + num;
    }
    if (operator[0] !== '=')
        document.querySelector("#bottom").value = input + num
}

function backSpace() {
    let input = document.querySelector("#bottom").value.split('');
    if (input.length) {
        input.pop();
        document.querySelector("#bottom").value = input.join('');
        if (num2 !== '') {
            let num = num2.split("")
            num.pop();
            num2 = num.join("");
        } else if (operator.length) {
            operator = [];
        } else if (num1 !== '') {
            let num = num1.split("")
            num.pop();
            num1 = num.join("");
        }
    }
}

function operatorFunction(op) {
    let input = document.querySelector("#bottom").value;
    let accum = document.querySelector("#top").value;
    let span = document.querySelector("#opr").innerText;
    if (accum !== '') {
        if (!operator.length) {
            operator.push(op);
            if (input !== '') {
                input += op;
                document.querySelector("#bottom").value = input;
            } else {
                document.querySelector("#opr").innerText = op;
            }

        } else {
            if (num2 != '') {
                equalToFunction(op);
                document.querySelector("#opr").innerText = op;
            } else {
                if (span === '') {
                    operator[0] = op;
                    document.querySelector("#opr").innerText = op;
                }
            }
        }
    } else {
        if (!operator.length) {
            operator.push(op);
            if (input !== '') {
                input += op;
                document.querySelector("#bottom").value = input;
            }
        } else {
            if (num2 !== '') {
                equalToFunction(op);
                document.querySelector("#opr").innerText = op;
            }
        }

    }
}

function storeNumber() {
    let input = document.querySelector("#bottom").value;
    if (memory.length) {
        alert("Memory already full");
        return;
    }
    if (input.trim() === '') {
        alert("Please enter a number")
    } else if (isNaN(+input)) {
        alert("Please enter a valid number")
    } else {
        memory.push(+input);
        alert(input + " successfully stored in memory")
    }
}

function subtractNumber() {
    let input = document.querySelector("#bottom").value;
    if (!memory.length) {
        alert("Nothing is stored in memory");
        return;
    }
    if (input.trim() === '') {
        alert("Please enter a number")
    } else if (isNaN(+input)) {
        alert("Please enter a valid number")
    } else {
        let sub = confirm("Confirm subtract this number with " + memory[0])
        if (sub) {
            document.querySelector("#bottom").value = memory[0] - (+input);
            num1 = memory[0] - (+input);
        }
    }

}

function equalToFunction(op) {
    var result;
    switch (operator[0]) {
        case '+':
            result = +num1 + (+num2);
            break;
        case '-':
            result = +num1 - (+num2);
            break;
        case '*':
            result = +num1 * (+num2);
            break;
        case '/':
            result = +num1 / (+num2);
            break;
        case '%':
            result = +num1 % (+num2);
            break;
        case '=':
            return;
    }
    result = result.toFixed(2);
    document.querySelector("#top").value = result;
    if (op === '=') {
        operator = [];
        document.querySelector("#opr").innerText = ''
    }
    num1 = result;
    num2 = '';
    operator[0] = op;
    document.querySelector("#bottom").value = ''

}

function clearFunction() {
    document.querySelector("#bottom").value = '';
    document.querySelector("#top").value = '';
    document.querySelector("#opr").innerText = '';
    num1 = '';
    operator = [];
    num2 = '';

}

function createRowForNumber(num, color, id) {
    let row = createElement('div', 'col-md-4 col-sm-4');
    let button = createElement('button',
        'btn btn-' + color + ' btn-lg btn-block',
        id,
        'button');
    if (num === 'C')
        button.onclick = () => { clearFunction(); }
    else
        button.onclick = () => { numFunction(num); }
    button.innerText = num
    row.append(button);
    return row;
}

function createRowforOperator(opr, color, id) {
    let row = createElement('div', 'col-sm-6');
    let op = createElement('button',
        'btn btn-' + color + ' btn-lg btn-block',
        id,
        'button');
    op.innerText = opr
    if (opr === '=')
        op.onclick = () => equalToFunction(opr)
    else if (opr === 'M+')
        op.onclick = () => storeNumber();
    else if (opr === 'M-')
        op.onclick = () => subtractNumber();
    else
        op.onclick = () => operatorFunction(opr)
    row.append(op);
    return row;
}

function createRow(num1, num2, num3) {
    let row = createElement('div', 'row');
    if (num1 === 'C')
        var col1 = createRowForNumber(num1, 'danger', num1);
    else
        var col1 = createRowForNumber(num1, 'primary', num1);

    let col2 = createRowForNumber(num2, 'primary', num2);
    let col3 = createRowForNumber(num3, 'primary', num3);
    row.append(col1, col2, col3);
    return row;
}

function createBottomRow(op1, op2) {
    let row = createElement('div', 'row');
    let col1 = createRowforOperator(op1, 'secondary', 'plus')
    let col2 = createRowforOperator(op2, 'secondary', 'minus')
    row.append(col1, col2);
    return row;
}

let hr = document.createElement('hr');
let hr1 = document.createElement('hr');
let hr2 = document.createElement('hr');
let hr3 = document.createElement('hr');
let hr4 = document.createElement('hr');
let hr5 = document.createElement('hr');
let hr6 = document.createElement('hr');
let hr7 = document.createElement('hr');
let hr8 = document.createElement('hr');


//top container
let containerTop = createElement('div', 'container top');
let topRow = createElement('div', 'row justify-content-md-center');
let col5 = createElement('div', 'col-md-5 col-sm-5 main');
let paragraph = createElement('p', 'h1');
paragraph.innerHTML = 'Calculator'
let input1 = createElement('input', 'form-control', 'top', 'text');
input1.setAttribute('disabled', 'true');
let inputdiv = createElement('div', 'input-group input-group-lg');
let spandiv = createElement('div', 'input-group-prepend');
let span = createElement('span', 'input-group-text', 'opr');
spandiv.append(span);
let input2 = createElement('input', 'form-control', 'bottom', 'text');
input2.setAttribute('disabled', 'true')
inputdiv.append(spandiv, input2)
col5.append(paragraph, hr, input1, inputdiv, hr1);
topRow.append(col5);
containerTop.append(topRow);
//end of top container


//bottom container
let bottomContainer = createElement('div', 'container');
let bottomRow = createElement('div', 'row justify-content-md-center');
let col3Main = createElement('div', 'col-md-3 col-sm-3 main');
let row1 = createRow(1, 2, 3);
let row2 = createRow(4, 5, 6);
let row3 = createRow(7, 8, 9);
let row4 = createRow('C', 0, '.')
col3Main.append(row1, hr2, row2, hr3, row3, hr4, row4);
let col2Main = createElement('div', 'col-sm-2 main');
let row5 = createBottomRow('+', '-');
let row6 = createBottomRow('*', '/');
let row7 = createElement('div', 'row');
let row7col1 = createRowforOperator('%', 'secondary', 'mod')
let row7col2 = createRowforOperator('=', 'dark', '=')
row7.append(row7col1, row7col2);
let row8 = createElement('div', 'row');
let row8col1 = createRowforOperator('M+', 'info', 'm+')
let row8col2 = createRowforOperator('M-', 'info', 'm-')
row8.append(row8col1, row8col2);
col2Main.append(row5, hr5, row6, hr6, row7, hr7, row8);
bottomRow.append(col3Main, col2Main);
bottomContainer.append(bottomRow);
//bottom container end

document.body.append(containerTop, bottomContainer);
