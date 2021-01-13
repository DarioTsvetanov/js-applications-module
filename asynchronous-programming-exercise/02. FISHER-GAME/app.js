function attachEvents() {
    
    document.querySelector('.update').addEventListener('click', updateCatch);
    document.querySelector('.delete').addEventListener('click', deleteCatch);

    const loadButton = document.querySelector('.load');
    loadButton.addEventListener('click', loadCatches);

    const addButton = document.querySelector('.add');
    addButton.addEventListener('click', addCatch);
}

function deleteCatch(e) {

    let catchId = e.target.parentElement.getAttribute('data-id');
    
    fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, { method: 'DELETE'});

    e.target.parentElement.remove();
}

function updateCatch(e) {

    let catchId = e.target.parentElement.getAttribute('data-id');

    let catchObj = {
        angler: e.target.parentElement.querySelector('.angler').value,
        weight: e.target.parentElement.querySelector('.weight').value,
        species: e.target.parentElement.querySelector('.species').value,
        location: e.target.parentElement.querySelector('.location').value,
        bait: e.target.parentElement.querySelector('.bait').value,
        captureTime: e.target.parentElement.querySelector('.captureTime').value
    }

    fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(catchObj)
    })

    loadCatches();
}

function loadCatches() {

    const catchesDiv = document.querySelector('#catches');

    fetch('https://fisher-game.firebaseio.com/catches.json')
        .then(res => res.json())
        .then(catches => {

            catchesDiv.innerHTML = '';

            for (let key in catches) {

                const catchDiv = document.createElement('div');
                catchDiv.classList.add('catch');
                catchDiv.setAttribute('data-id', key);

                const anglerLabel = document.createElement('label');
                anglerLabel.textContent = 'Angler';
                const anglerInput = document.createElement('input');
                anglerInput.type = 'text';
                anglerInput.classList.add('angler');
                anglerInput.value = catches[key].angler;
                catchDiv.appendChild(anglerLabel);
                catchDiv.appendChild(anglerInput);
                catchDiv.appendChild(document.createElement('hr'));
                
                const weightLabel = document.createElement('label');
                weightLabel.textContent = 'Weight';
                const weightInput = document.createElement('input');
                weightInput.type = 'number';
                weightInput.classList.add('weight');
                weightInput.value = catches[key].weight;
                catchDiv.appendChild(weightLabel);
                catchDiv.appendChild(weightInput);
                catchDiv.appendChild(document.createElement('hr'));

                const speciesLabel = document.createElement('label');
                speciesLabel.textContent = 'Species';
                const speciesInput = document.createElement('input');
                speciesInput.type = 'text';
                speciesInput.classList.add('species');
                speciesInput.value = catches[key].species;
                catchDiv.appendChild(speciesLabel);
                catchDiv.appendChild(speciesInput);
                catchDiv.appendChild(document.createElement('hr'));

                const locationLabel = document.createElement('label');
                locationLabel.textContent = 'Location';
                const locationInput = document.createElement('input');
                locationInput.type = 'text';
                locationInput.classList.add('location');
                locationInput.value = catches[key].location;
                catchDiv.appendChild(locationLabel);
                catchDiv.appendChild(locationInput);
                catchDiv.appendChild(document.createElement('hr'));

                const baitLabel = document.createElement('label');
                baitLabel.textContent = 'Bait';
                const baitInput = document.createElement('input');
                baitInput.type = 'text';
                baitInput.classList.add('bait');
                baitInput.value = catches[key].bait;
                catchDiv.appendChild(baitLabel);
                catchDiv.appendChild(baitInput);
                catchDiv.appendChild(document.createElement('hr'));

                const captureLabel = document.createElement('label');
                captureLabel.textContent = 'Capture Time';
                const captureInput = document.createElement('input');
                captureInput.type = 'number';
                captureInput.classList.add('captureTime');
                captureInput.value = catches[key].captureTime;
                catchDiv.appendChild(captureLabel);
                catchDiv.appendChild(captureInput);
                catchDiv.appendChild(document.createElement('hr'));

                const uploadButton = document.createElement('button');
                uploadButton.classList.add('upload');
                uploadButton.textContent = 'Upload';
                uploadButton.addEventListener('click', updateCatch);
                catchDiv.appendChild(uploadButton);

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', deleteCatch);
                catchDiv.appendChild(deleteButton);

                catchesDiv.appendChild(catchDiv);
            }
        })
}

function addCatch() {

    const anglerInput = document.querySelector('#addForm .angler');
    const weightInput = document.querySelector('#addForm .weight');
    const speciesInput = document.querySelector('#addForm .species');
    const locationInput = document.querySelector('#addForm .location');
    const baitInput = document.querySelector('#addForm .bait');
    const captureTimeInput = document.querySelector('#addForm .captureTime');

    if (anglerInput.value == '' || weightInput.value == '' || speciesInput.value == '' ||
        locationInput.value == '' || baitInput.value == '' || captureTimeInput.value == '') return;

    let newCatchObject = {
        angler: anglerInput.value,
        weight: weightInput.value,
        species: speciesInput.value,
        location: locationInput.value,
        bait: baitInput.value,
        captureTime: captureTimeInput.value
    }

    fetch(`https://fisher-game.firebaseio.com/catches.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCatchObject)
    })

    loadCatches();
}

attachEvents();
