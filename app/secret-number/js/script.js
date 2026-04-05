let numbersList = [];

const elementDrawnNumbers = document.querySelector('#element-drawn-numbers');
const elementMessageAlert = document.querySelector('#element-message-alert');

const MIN_NUMBER = 1;
const MAX_NUMBER = 5;

let attempt = 1;
let guess = 0;
let secretNumber = getNumberSecret();

function guessSecretNumber() {
    guess = parseInt(document.querySelector('#guess').value);

    if (!validateFields(guess)) return;

    if (guess === secretNumber) {
        const wordAttempt = attempt > 1 ? 'tentativas' : 'tentativa';
        const messageSuccess = `Você acertou o número secreto ${secretNumber} com ${attempt} ${wordAttempt}`;

        displayMessageOnScreen('h1', 'Acertou!');
        displayMessageOnScreen('label', messageSuccess);

        document.querySelector('#guess-button').setAttribute('disabled', true);
        document.querySelector('#restart-button').removeAttribute('disabled');

        addDrawnNumberToList(guess);

        elementMessageAlert.innerHTML = '';
    } else {
        if (guess > secretNumber) {
            displayMessageOnScreen('label', `O número secreto é menor que ${guess}`);
        } else {
            displayMessageOnScreen('label', `O número secreto é maior que ${guess}`);
        }

        attempt++;
    }

    document.querySelector('#guess').value = '';
}

function restartGame() {
    document.querySelector('#guess-button').removeAttribute('disabled');
    document.querySelector('#restart-button').setAttribute('disabled', true);

    displayMessageInitialOnScreen();
    attempt = 1;
    secretNumber = getNumberSecret();
}

function validateFields(guess) {
    if (isNaN(guess)) {
        showMessageAlertOnScreen('danger', `Preencha corretamente o campo chute`);
        return false;
    }

    if (guess < MIN_NUMBER || guess > MAX_NUMBER) {
        showMessageAlertOnScreen('danger', showMessageDefaultProgramming() + `, sua opção escolhida foi: [${guess}]`);
        return false;
    }

    return true;
}

function showMessageAlertOnScreen(typeColor, text) {
    elementMessageAlert.innerHTML = `
        <span class="content__message content__message-alert content__text ${typeColor}-background">
            ${text}.
        </span>
    `;
}

function getNumberSecret() {
    let randomNumber = parseInt(Math.random() * MAX_NUMBER + MIN_NUMBER);

    if (numbersList.length === MAX_NUMBER) {
        displaySelectableNumberOnScreen();
        numbersList = [];
    }

    if (numbersList.includes(randomNumber)) {
        return getNumberSecret();
    } else {
        numbersList.push(randomNumber);
        console.log(randomNumber);
        return randomNumber;
    }
}

function displaySelectableNumberOnScreen() {
    elementDrawnNumbers.innerHTML = '';

    for (let i = MIN_NUMBER; i <= MAX_NUMBER; i++) {
        elementDrawnNumbers.innerHTML += `
            <div class="content__box danger-background" id="drawn-number-${i}">
                0${i}
            </div>
        `;
    }
}

function addDrawnNumberToList(drawnNumber) {
    const element = document.querySelector(`#drawn-number-${drawnNumber}`);
    const elementClass= element.classList;

    elementClass.add('success-background');
    elementClass.remove('danger-background');
}

function displayMessageOnScreen(id, text) {
    const field = document.querySelector(id);
    field.textContent = text;
}

function displayMessageInitialOnScreen() {
    displayMessageOnScreen('h1', `Número Secreto v1`);
    displayMessageOnScreen('label', showMessageDefaultProgramming());
}

function showMessageDefaultProgramming() {
    return `Digite um número entre ${MIN_NUMBER} e ${MAX_NUMBER}`;
}

displayMessageInitialOnScreen();
displaySelectableNumberOnScreen();