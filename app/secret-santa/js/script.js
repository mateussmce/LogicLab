const alertMessageeElement = document.querySelector('#alert-message-element');
const friendAddedElement = document.querySelector('#friend-added-element');
const drawnFriendElement = document.querySelector('#drawn-friend-element');

let friendsList = [];

function enableAddSecretFriend() {
    const nickName = document.querySelector('#nickname').value;

    if (!validationFields(nickName)) return; 

    addFriendInList(nickName);
    clearField();
}

function drawSecretFriend() {
    shuffleList(friendsList);

    drawnFriendElement.innerHTML = '';
    alertMessageeElement.innerHTML = '';

    for (let i = 0; i < friendsList.length; i++) {
        if (i === (friendsList.length - 1)) {
            drawnFriendElement.innerHTML += `
                <span class="content__message success-background content__text">
                    ${friendsList[i]} -> ${friendsList[0]}
                </span>
            `;
        } else {
            drawnFriendElement.innerHTML += `
                <span class="content__message success-background content__text">
                    ${friendsList[i]} -> ${friendsList[i + 1]}
                </span>
            `;
        }
    }

    document.querySelector('#button-restart').removeAttribute('disabled');
}

function restart() {
    alertMessageeElement.innerHTML = '';

    document.querySelector('#button-draw-secret-friend').setAttribute('disabled', true);
    document.querySelector('#button-restart').setAttribute('disabled', true);

    friendsList = [];

    showInitalMessageOnScreen();
}

function shuffleList(list) {
    return list.sort(() => Math.random() - 0.5);
}

function clearField() {
    document.querySelector('#nickname').value = '';
}

function addFriendInList(nickName) {
    friendsList.push(nickName);

    friendAddedElement.innerHTML = `
        <span class="content__message success-background content__text">
            ${friendsList.join(',')}
        </span>
    `;

    if (friendsList.length > 3) {
        document.querySelector('#button-draw-secret-friend').removeAttribute('disabled');
    }
}

function validationFields(nickName) {
    const lowercaseFriendsList = friendsList.join(',').toLowerCase();
    const lowercaseNickname = nickName.toLowerCase();

    alertMessageeElement.innerHTML = '';

    if (nickName === '') {
        showAlertMessageOnScreen('danger', 'Preencha corretamente o campo do amigo');
        return false;
    }

    if (lowercaseFriendsList.includes(lowercaseNickname)) {
        showAlertMessageOnScreen('danger', `O nickname ${nickName} já foi adicionado, tente outro diferente`);
        return false;
    }

    return true;
}

function showAlertMessageOnScreen(typeColor, text) {
    alertMessageeElement.innerHTML = `
        <span class="content__message content__message-alert ${typeColor}-background content__text">
            ${text}.
        </span>
    `;   
}

function showInitalMessageOnScreen() {
    const messageModel = (messageType) => {
        return `<span class="content__message danger-background content__text">
                    Nenhum amigo ${messageType} até o momento.
                </span>`
    }

    friendAddedElement.innerHTML = messageModel('adicionado');
    drawnFriendElement.innerHTML = messageModel('sorteado');
}

showInitalMessageOnScreen();