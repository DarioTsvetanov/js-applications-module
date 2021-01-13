const button = document.querySelector('#btnLoadTowns');
const townsList = document.querySelector('#root ul');

button.addEventListener('click', loadTowns);

function loadTowns(e) {

    townsList.innerHTML = '';

    e.preventDefault();

    const townsInput = document.querySelector('#towns');

    if (townsInput.value == '') return;

    const townObject = townsInput.value.split(', ').map(el => ({town: el}))

    let townView = `<li>{{town}}</li>`;
    let townTemplate = Handlebars.compile(townView);
    townsList.innerHTML += townObject.map(el => townTemplate(el)).join('');

    townsInput.value = '';
} 

