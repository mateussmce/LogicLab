const reservedSeatsElement = document.querySelector('#reserved-seats-element');
const purchaseCost = document.querySelector('#purchase-cost');
const ticketPriceElement = document.querySelector('#ticket-price-element');
const seatSelectionElement = document.querySelector('#seat-selection-element');
const ticketPurchaseElement = document.querySelector('#ticket-purchase-element');
const alertMessageElement = document.querySelector('#alert-message-element');

let totalPurchasePrice = 0;

const totalNumberOfSeats = 16;
const pricePerTicket = 32;

let addedTicketList = [];
let seatsPurchasedList = [];
let customerList = [];

function activeTicketPurchase() {
    const nameUser = document.querySelector('#name-user').value;

    if (!validationFields(nameUser)) return;

    runPurchaseOperation(nameUser);
    resetOperationsAfterAddingSeats();
}

function resetOperationsAfterAddingSeats() {
    addedTicketList = [];
    refreshPurchasePrice(addedTicketList);
    clearField();
    lockSelectedSeats();
    showChosenSeats();
    validateTotalOccupiedSeats();
}

function validateTotalOccupiedSeats() {
    if (seatsPurchasedList.length === totalNumberOfSeats) {
        document.querySelector('#button-ticket-purchase').setAttribute('disabled', true);
    }
}

function showChosenSeats() {
    let innerHTMLElement = '';

    if (addedTicketList.length > 0) {
        innerHTMLElement = `<p class="content__text content__emphasis">Assento(s) escolhido(s): ${addedTicketList.join(',')}.</p>`;
    }

    if (addedTicketList.length === 0) {
        innerHTMLElement = `<p class="content__text content__emphasis">Nenhum assento escolhido</p>`;
    }

    showMessageOnScreen(seatSelectionElement, innerHTMLElement);
}

function runPurchaseOperation(nameUser) {
    customerList.push({
        lastName: nameUser, 
        listSeats: addedTicketList, 
        chairQuantity: addedTicketList.length
    });

    ticketPurchaseElement.innerHTML = '';

    customerList.forEach((ticketPurchase) => {
        ticketPurchaseElement.innerHTML += `
            <p class="content__text">
                Comprador(a): 
                    <span class="content__emphasis">${ticketPurchase.lastName}</span> / 
                Assento(s): 
                    <span class="content__emphasis">${ticketPurchase.listSeats.join(',')}</span> / 
                Quantidade de assento(s): 
                    <span class="content__emphasis">${ticketPurchase.chairQuantity}</span>
            </p>
        `;
    });
}

function validationFields(nameUser) {
    alertMessageElement.innerHTML = '';

    if (nameUser === '') {
        showMessageAlertOnScreen('danger', 'Preenche corretamente o nome do comprador(a)');
        return false;
    }

    if (addedTicketList.length === 0) {
        showMessageAlertOnScreen('danger', 'Adicione no mínimo um assento');
        return false;
    }

    return true;
}

function clearField() {
    document.querySelector('#name-user').value = '';
}

function showMessageAlertOnScreen(typeColor, text) {
    alertMessageElement.innerHTML = `
        <span class="content__message content__message-alert ${typeColor}-background content__text">
            ${text}.
        </p>
    `;
}

function renderReservedSeats() {
    for (let i = 1; i <= totalNumberOfSeats; i++) {
        reservedSeatsElement.innerHTML += `
            <div onclick="pickSeat(${i})" class="content__box success-background" id="seat-${i}">
                ${i < 10 ? '0' + i : i }
            </div>
        `;
    }
}

function toggleSelectionPattern(countChooseSeat, removalBackgroundElement, addedBackgroundElement, switchFunction) {
    const element = document.querySelector(`#seat-${countChooseSeat}`);
    const elementClass = element.classList;

    elementClass.remove(`${removalBackgroundElement}-background`);
    elementClass.add(`${addedBackgroundElement}-background`);

    element.removeAttribute('onclick');
    element.setAttribute('onclick', `${switchFunction}(${countChooseSeat})`);

    addSeatsToSelectedList(countChooseSeat);
    showChosenSeats();
}

function refreshPurchasePrice(totalAddedItemsInTicketList) {
    const computeAddedSeats = totalAddedItemsInTicketList * pricePerTicket;
    
    if (addedTicketList.length > 0 && addedTicketList != -1) {
        purchaseCost.textContent = computeAddedSeats;
    } else {
        purchaseCost.textContent = 0;
    }

    purchaseCost.textContent = computeAddedSeats;
}

function addSeatsToSelectedList(countChooseSeat) {
    configureSelectedSeatList(addedTicketList, countChooseSeat);
    configureSelectedSeatList(seatsPurchasedList, countChooseSeat);

    const totalAddedItemsInTicketList = addedTicketList.length;
    refreshPurchasePrice(totalAddedItemsInTicketList);
}

function configureSelectedSeatList(listSelected, countChooseSeat) {
    if (!listSelected.includes(countChooseSeat)) {
        listSelected.push(countChooseSeat);
    } else {
        const indexOfSelectedSeat = listSelected.indexOf(countChooseSeat);

        if (indexOfSelectedSeat != -1) {
            listSelected.splice(indexOfSelectedSeat, 1);
        }
    }
}

function lockSelectedSeats() {
    for (let i = 0; i < seatsPurchasedList.length; i++) {
        manageSelectedSeatElement(seatsPurchasedList[i]);
    }
}

function manageSelectedSeatElement(countChooseSeat) {
    const element = document.querySelector(`#seat-${countChooseSeat}`);
    const classElement = element.classList;

    classElement.remove('danger-background');
    classElement.add('restart-background', 'content__opacity');

    element.removeAttribute('onclick');
}

function pickSeat(countChooseSeat) {
    toggleSelectionPattern(
        countChooseSeat, 'success', 'danger', 'clearSeatSelection'
    );
}

function clearSeatSelection(countChooseSeat) {
    toggleSelectionPattern(
        countChooseSeat, 'danger', 'success', 'pickSeat'
    );
}

function showMessageOnScreen(element, message) {
    const field = element;
    field.innerHTML = message;
}

function showMessageInitialOnScreen() {
    showMessageOnScreen(
        seatSelectionElement, 
        `<p class="content__text content__emphasis">Nenhum assento escolhido.</p>`
    );

    showMessageOnScreen(
        ticketPurchaseElement, 
        `<p class="content__text">Nenhum ingresso comprado.</p>`
    );
}

function renderInitialDataOnScreen() {
    ticketPriceElement.textContent = pricePerTicket;
    showMessageInitialOnScreen();
}

renderReservedSeats();
renderInitialDataOnScreen();