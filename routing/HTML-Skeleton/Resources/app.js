const routeMap = {
    '/home': document.querySelector('#home-section'),
    '/create': document.querySelector('#create-section'),
    '/details': document.querySelector('#furniture-details-section'),
    '/profile': document.querySelector('#profile-page-section'),
}

const router = (path) => {
    document.querySelectorAll('.container').forEach(el => el.style.display = 'none');

    routeMap[path].style.display = 'block';

    if (path == '/home') renderHomePage();
}

document.querySelector('nav').addEventListener('click', e => {
    if (e.target.tagName !== 'A') return;
    
    e.preventDefault();

    history.pushState({}, '', e.target.href);

    router(location.pathname);
});

const formElement = document.querySelector('#create-form');
formElement.addEventListener('submit', createNewFurniture);

routeMap[location.pathname].style.display = 'block';

function createNewFurniture(e) {
    e.preventDefault();

    const makeElement = formElement.querySelector('#new-make');
    const modelElement = formElement.querySelector('#new-model');
    const yearElement = formElement.querySelector('#new-year');
    const descriptionElement = formElement.querySelector('#new-description');
    const priceElement = formElement.querySelector('#new-price');
    const imageElement = formElement.querySelector('#new-image');
    const materialElement = formElement.querySelector('#new-material');

    if (makeElement.value.length < 4 || modelElement.value.length < 4) return;

    if (Number(yearElement.value) < 1950 || Number(yearElement.value) > 2050) return;

    if (descriptionElement.value.length < 10 || Number(priceElement.value) < 0) return;

    if (imageElement.value == '') return;

    const newFurniture = {
        make: makeElement.value,
        model: modelElement.value,
        year: yearElement.value,
        description: descriptionElement.value,
        price: priceElement.value,
        image: imageElement.value,
        material: materialElement.value,
    }

    fetch('https://routing-179ca.firebaseio.com/.json', {
        method: "POST",
        body: JSON.stringify(newFurniture)
    })
}

async function renderHomePage() {
    let rawData = await fetch('https://routing-179ca.firebaseio.com/.json');
    let data = await rawData.json();

    const furnitureListElement = document.querySelector('#furniture-list');
    furnitureListElement.innerHTML = '';

    for (let key in data) {
        furnitureListElement.innerHTML += furnitureItemTemplate(data[key]);
    }
}   