/* function solve() {

    let nextStop = 'depot';
    let currentStop = '';

    const infoBox = document.querySelector('.info');
    const departButton = document.querySelector('#depart');
    const arriveButton = document.querySelector('#arrive');

    function depart() {

        let url = `https://judgetests.firebaseio.com/schedule/${nextStop}.json`;

        let httpRequest = new XMLHttpRequest();
        
        httpRequest.addEventListener('loadend', function() {

            let response = JSON.parse(this.responseText);

            currentStop = response.name;

            infoBox.textContent = `Next stop ${currentStop}`;

            nextStop = response.next;
        });

        httpRequest.open('GET', url);
        httpRequest.send();

        departButton.setAttribute('disabled', 'disabled');
        arriveButton.removeAttribute('disabled');
    }

    function arrive() {
        
        infoBox.textContent = `Arriving at ${currentStop}`;

        arriveButton.setAttribute('disabled', 'disabled');
        departButton.removeAttribute('disabled');
    }

    return {
        depart,
        arrive
    };
}

let result = solve(); */

function solve() {
    const info = document.querySelector('.info');
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');
    let curId = 'depot';
    let curStop = '';

    function depart() {
        fetch(`https://judgetests.firebaseio.com/schedule/${curId}.json`)
            .then(res => res.json())
            .then(data => {
                departBtn.disabled = 'true';
                arriveBtn.disabled = '';
                curStop = data.name;
                info.textContent = `Next stop ${curStop}`;
                curId = data.next;
            })
            .catch(error => {
                departBtn.disabled = 'true';
                arriveBtn.disabled = 'true'; 
                info.textContent = 'Error';
            });
    }

    function arrive() {
        departBtn.disabled = '';
        arriveBtn.disabled = 'true';
        info.textContent = `Arriving at ${curStop}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();