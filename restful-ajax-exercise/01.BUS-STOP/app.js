function getInfo() {
    
    const stopIdInput = document.querySelector('#stopId');
    const stopName = document.querySelector('#stopName');
    const buses = document.querySelector('#buses');
    const ids = ['1287', '1308', '1327', '2334'];

    const url = `https://judgetests.firebaseio.com/businfo/${stopIdInput.value}.json`;

    const httpRequest = new XMLHttpRequest();

    httpRequest.addEventListener('loadend', function() {

        if (!ids.includes(stopIdInput.value)) {

            stopName.textContent = 'Error';

            return;
        }

        let parsedObj = JSON.parse(this.responseText);
        
        stopName.textContent = parsedObj.name;

        for (let key in parsedObj.buses) {

            buses.innerHTML += `<li>Bus ${key} arrives in ${parsedObj.buses[key]} minutes</li>`;
        }
    });

    httpRequest.open('GET', url);

    stopName.textContent = '';
    buses.textContent = '';

    httpRequest.send();
}