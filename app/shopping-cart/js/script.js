const productsElement = document.querySelector('#products-element');
const chosenOptionProduct = document.querySelector('#chosen-option-product');
const alertMessageElement = document.querySelector('#alert-message-element');
const cartAddedProductsElement = document.querySelector('#cart-added-products-element');
const totalPriceElement = document.querySelector('#total-price-element');

let overallPrice = 0;

const productList = [
    { id: 1, title: 'Celular', price: 1400, amount: 4 },
    { id: 2, title: 'Notebook', price: 5400, amount: 12 },
    { id: 3, title: 'Tablet', price: 2400, amount: 8 }
];

function addProductToCart() {
    const amount = parseInt(document.querySelector('#amount').value);
    const product = chosenOptionProduct.value;

    const productPrice = product.split(' ')[1];
    const productName = product.split(' ')[3];
    const productCode = parseInt(product.split(' ')[5]);

    if (!validationField(amount, product)) return;

    updateCart(amount, productPrice, productName, productCode);
    clearField();
}

function showProductsInCart(amount, productName, productPrice) {
    cartAddedProductsElement.innerHTML += `
        <div class="content__box">
            <span class="content__emphasis">${amount}x</span> - ${productName} 
            <span class="content__emphasis">R$ ${productPrice}</span>
        </div>
    `;
}

function updateCart(amount, productPrice, productName, productCode) {
    productList.forEach((product) => {
        if (product.id === productCode) {
            if (!checkQuantityWithinStock(product.amount, amount, productName, productPrice, amount)) return;

            if (amount <= product.amount) {
                product.amount -= amount;
            }
        }
    });

    showProductsOnHomeScreen();
}

function checkQuantityWithinStock(productAmount, amountUser, productName, productPrice, amount) {
    const checkQuantityWord = amountUser > 1 ? 'quantidades disponíveis' : 'quantidade disponível';

    if (amountUser > productAmount) {
        showMessageAlertOnScreen('danger', `Não temos ${amountUser} ${checkQuantityWord} para ${productName} com preço: R$ ${productPrice}`);
        return false;
    }

    showProductsInCart(amount, productName, productPrice);
    updateTotalPurchasePrice(productPrice, amount);

    return true;
}

function updateTotalPurchasePrice(productPrice, amount) {
    const pricePerProduct = productPrice * amount;

    overallPrice += pricePerProduct;
    totalPriceElement.textContent = overallPrice;
}

function validationField(amount, product) {
    alertMessageElement.innerHTML = '';

    if (isNaN(amount)) {
        showMessageAlertOnScreen('danger', 'Preencha corretamente o campo de quantidade');
        return false;
    }

    if (amount <= 0) {
        showMessageAlertOnScreen('danger', 
            `Preencha uma quantidade maior que zero, sua escolha [${amount}] não é permitida`);
        return false;
    }

    if (product === 'no-option') {
        showMessageAlertOnScreen('danger', 
            `Você deve escolher uma das opções abaixo de 'Escolha uma opção'`);
        return false;
    }

    return true;
} 

function clearField() {
    document.querySelector('#amount').value = '';
}

function showMessageAlertOnScreen(typeColor, text) {
    alertMessageElement.innerHTML = `
        <span class="content__message content__message-alert content__text ${typeColor}-background">
            ${text}.
        </span>
    `;
}

function showProductsOnHomeScreen() {
    productsElement.innerHTML = '';
    chosenOptionProduct.innerHTML = '';
    chosenOptionProduct.innerHTML = `<option value="no-option">Escolha uma opção</option>`

    let checkQuantityValue = 'restart';

    productList.forEach((product) => {
        checkQuantityValue = product.amount > 0 ? 'success' : 'danger';

        productsElement.innerHTML += `
            <div class="content__product model__vertical model__center">
                <h2 class="content__subtitle">${product.title}</h2>
                <p class="content__text">R$ ${product.price}</p>
                <span class="content__tag ${checkQuantityValue}-background">
                    Quantidade: ${product.amount}
                </span>
            </div>
        `;

        if (product.amount > 0) {
            chosenOptionProduct.innerHTML += `
                <option value="R$ ${product.price} - ${product.title} - ${product.id}">
                    R$ ${product.price} - ${product.title}
                </option>
            `;
        }
    });
}

showProductsOnHomeScreen();