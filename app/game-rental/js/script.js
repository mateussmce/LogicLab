const gamesElement = document.querySelector('#games-element');
const rentedGamesCountElement = document.querySelector('#rented-games-count-element');

let numberOfRentedGames = 0;

const gamesList = [
    { id: 1, title: 'Mortal Kombat', pathImage: 'logo-mortal-kombat.png' },
    { id: 2, title: 'Street Fighter', pathImage: 'logo-street-fighter.png' },
    { id: 3, title: 'Grand Theft Auto', pathImage: 'logo-gta5.png' }
];

function rentGame(selectedGame) {
    const game = gamesElement.querySelector(`#game-${selectedGame}`);

    const gameImage = game.querySelector('img');
    const gameImageClass = gameImage.classList;

    const gameTitle = game.querySelector('h2');

    const gameTag = game.querySelector('span');
    const gameTagClass = gameTag.classList;

    const gameButton = game.querySelector('button');
    const gameButtonClass = gameButton.classList;

    if (gameButtonClass.contains('add-background')) {
        gameImageClass.add('content__opacity');

        gameTagClass.remove('success-background');
        gameTagClass.add('danger-background');
        gameTag.textContent = 'Indisponível';

        gameButtonClass.remove('add-background');
        gameButtonClass.add('restart-background');

        numberOfRentedGames++;
    } else {
        if (!checkReturnValidity(gameTitle)) return;
        
        gameImageClass.remove('content__opacity');

        gameTagClass.remove('danger-background');
        gameTagClass.add('success-background');
        gameTag.textContent = 'Disponível';

        gameButtonClass.remove('restart-background');
        gameButtonClass.add('add-background');

        numberOfRentedGames--;
    }
    
    rentedGamesCountElement.textContent = numberOfRentedGames;
} 

function checkReturnValidity(gameTitle) {
    const contentTitle = gameTitle.textContent.trim();
    const validationMessage = prompt(`Digite "${contentTitle}" para devolver o jogo: `).trim();

    const checkSelectedOption = validationMessage === contentTitle ? 'sim' : 'não';
    const successMessage = `Você escolheu ${checkSelectedOption} para devolver o jogo "${contentTitle}"`;
    alert(successMessage);

    if (contentTitle !== validationMessage) {
        return false;
    }

    return true;
}

function showGameListOnScreen() {
    gamesList.forEach((game) => {
        gamesElement.innerHTML += `
            <div class="game model__vertical model__center" id="game-${game.id}">
                <div>
                    <img src="../../../assets/game-rental/${game.pathImage}" alt="Logo - ${game.title}" class="content__image"/>
                </div>

                <h2 class="content__subtitle">
                    ${game.title}
                </h2>
                <span class="content__tag success-background">Disponível</span>
                
                <button onclick="rentGame(${game.id})" class="content__button add-background">
                    Alugar
                </button>
            </div>
        `;
    });
}

showGameListOnScreen();