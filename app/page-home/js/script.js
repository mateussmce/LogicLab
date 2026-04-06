const projectElement = document.querySelector('#project-element');

const projectsList = [
    { id: 1, title: 'Projeto Base', tag: 'Base Project' },
    { id: 2, title: 'Número Secreto', tag: 'Secret Number' },
    { id: 3, title: 'Sorteador de Números', tag: 'Number Picker' },
    { id: 4, title: 'Aluguel de Jogos', tag: 'Game Rental' },
    { id: 5, title: 'Carrinho de Compras', tag: 'Shopping Cart' },
    { id: 6, title: 'Compra de Ingressos', tag: 'Ticket Purchase' },
    { id: 7, title: 'Amigo Secreto', tag: 'Secret Santa' }
];

function displayProjectListOnScreen() {
    projectsList.forEach((project) => {
        projectElement.innerHTML += `
        <div class="projects model__vertical model__center" id="project-${project.id}">
            <p class="content__subtitle">${project.title}</p>
            <span class="content__tag success-background">
                ${createTitleTag(project.tag)}
            </span>

            <a href="app/${createTitleTag(project.tag)}" target="_blank" class="content__button add-background">
                Visualizar
            </a>
        </div>
        `;
    });
}

function createTitleTag(title) {
    return title.split(' ').join('-').toLowerCase();
}

displayProjectListOnScreen();