const elementDrawNumbers = document.querySelector('#element-draw-numbers');
const elementMessageAlert = document.querySelector('#element-message-alert');

function drawNumbers() {
    const chosenOption = parseInt(document.querySelector('#chosen-option').value);
    const minNumber = parseInt(document.querySelector('#min-number').value);
    const maxNumber = parseInt(document.querySelector('#max-number').value);
    const quantity = parseInt(document.querySelector('#quantity').value);

    if (!validateFields(chosenOption, minNumber, maxNumber, quantity)) return;

    runNumberDraw(chosenOption, minNumber, maxNumber, quantity);
    clearFields();

    document.querySelector('#restart-button').removeAttribute('disabled');
}

function restartGame() {
    document.querySelector('#restart-button').setAttribute('disabled', true);

    elementMessageAlert.innerHTML = '';
    elementDrawNumbers.innerHTML = '';

    showMessageInitialOnScreen();
    clearFields();
}

function runNumberDraw(chosenOption, minNumber, maxNumber, quantity) {
    let numberDrawList = [];
    let randomNumber = 0;

    for (let i = 0; i < quantity; i++) {
        randomNumber = getNumberDraw(minNumber, maxNumber);

        while (numberDrawList.includes(randomNumber) || !checkSelectedOption(randomNumber, chosenOption)) {
            randomNumber = getNumberDraw(minNumber, maxNumber);
        }

        numberDrawList.push(randomNumber);
    }

    displayDrawNumbersMessageOnScreen(numberDrawList);
    displayDrawNumbersInSequence(minNumber, maxNumber, numberDrawList);
}

function checkSelectedOption(randomNumber, chosenOption) {
    if (chosenOption === 2) {
        return randomNumber % 2 === 0;
    }

    if (chosenOption === 3) {
        return randomNumber % 2 !== 0;
    }

    return true;
}

function compareNumbersListOrder(numberOne, numberTwo) {
    return numberOne - numberTwo;
}

function displayDrawNumbersMessageOnScreen(numberDrawList) {
    numberDrawList.sort(compareNumbersListOrder);

    showMessageAlertOnScreen(
        'success',
        `Números sorteados: ${numberDrawList.join(', ')}`
    );
}

function showDefaultForbiddenQuantityMessage(checkedVariable, criteriaValue) {
    return `A quantidade [${checkedVariable}] não é permitida para esse intervalo, escolha outro número, exemplo: ${criteriaValue} ou menos`;
}

function validateFields(chosenOption, minNumber, maxNumber, quantity) {
    elementMessageAlert.innerHTML = '';

    const minMaxNumberRange = (maxNumber - minNumber) + 1;

    if (isNaN(chosenOption) || isNaN(minNumber) || isNaN(maxNumber) || isNaN(quantity)) {
        showMessageAlertOnScreen('danger', `Preencha corretamente todos os campos!`);
        return false;
    }

    if (quantity > minMaxNumberRange) {
        showMessageAlertOnScreen('danger', showDefaultForbiddenQuantityMessage(quantity, minMaxNumberRange));
        return false;
    }

    if (!validateLimitQuantity(chosenOption, quantity, minMaxNumberRange)) return;

    return true;
}

function validateLimitQuantity(chosenOption, quantity, minMaxNumberRange) {
    const quantityLimitForCriteria = Math.ceil(minMaxNumberRange / 2);

    if (chosenOption !== 1 && quantity > quantityLimitForCriteria) {
        showMessageAlertOnScreen('danger', showDefaultForbiddenQuantityMessage(quantity, quantityLimitForCriteria));
        return false;
    }

    return true;
}

function showMessageAlertOnScreen(typeColor, text) {
    elementMessageAlert.innerHTML = `
        <span class="content__message content__text content__message-alert ${typeColor}-background">
            ${text}.
        </span>
    `;   
}

function clearFields() {
    document.querySelector('#chosen-option').value = '1';
    document.querySelector('#min-number').value = '';
    document.querySelector('#max-number').value = '';
    document.querySelector('#quantity').value = '';
}

function getNumberDraw(minNumber, maxNumber) {
    return parseInt(Math.random() * (maxNumber - minNumber + 1) + minNumber);
}

function displayDrawNumbersInSequence(minNumber, maxNumber, numberDrawList) {
    elementDrawNumbers.innerHTML = '';

    for (let i = minNumber; i <= maxNumber; i++) {
        elementDrawNumbers.innerHTML += `
            <div class="content__box ${checkDrawNumbersList(numberDrawList, i)}-background" id="number-draw-${i}">
                ${i >= 10 ? i : `0${i}`}
            </div>
        `;
    }
}

function checkDrawNumbersList(numberDrawList, numberDraw) {
    return numberDrawList.includes(numberDraw) ? 'success' : 'danger';
}

function showMessageOnScreen(element, typeAction, elementShow) {
    if (typeAction === 'textContent') {
        element.textContent = elementShow;
    } else if (typeAction === 'innerHTML') {
        element.innerHTML = elementShow;
    } else {
        console.log('Ocorreu um erro!');
    }
}

function showMessageInitialOnScreen() {
    showMessageOnScreen(
        elementDrawNumbers, 'innerHTML',
        `
            <p class="content__text content__emphasis">
                Nenhum sorteio realizado até o momento :(
            </p>
        `
    );
}

showMessageInitialOnScreen();