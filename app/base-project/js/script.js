const elementMessageAlert = document.querySelector('#element-message-alert');

function activeAddButton() {
    const amount = parseInt(document.querySelector('#amount').value);
    const chosenOption = parseInt(document.querySelector('#chosen-option').value);

    if (!validateFields(amount, chosenOption)) return;

    showMessageAlertOnScreen(
        'success', 
        `Quantidade: ${amount} | Opção escolhida: ${chosenOption}`
    );

    document.querySelector('#amount').value = '';
    document.querySelector('#button-add').setAttribute('disabled', true);
    document.querySelector('#button-restart').removeAttribute('disabled');
}

function activeRestartButton() {
    elementMessageAlert.innerHTML = '';
    document.querySelector('#button-add').removeAttribute('disabled');
    document.querySelector('#button-restart').setAttribute('disabled', true);
}

function validateFields(amount, chosenOption) {
    elementMessageAlert.innerHTML = '';

    if (isNaN(amount) || isNaN(chosenOption)) {
        showMessageAlertOnScreen('danger', `Preencha corretamente todos os campos`);
        return false;
    }

    return true;
}

function showMessageAlertOnScreen(type, text) {
    elementMessageAlert.innerHTML = `
        <span class="content__message content__message-alert content__text ${type}-background">
            ${text}.
        </span>
    `;
} 