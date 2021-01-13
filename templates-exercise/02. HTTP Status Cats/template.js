(async () => {

    function renderCatTemplate() {
        const catList = document.querySelector('#allCats ul');

        const catView = document.querySelector('#cat-template').innerHTML;
        const catTemplate = Handlebars.compile(catView);
        catList.innerHTML = cats.map(el => catTemplate(el)).join('')
    }


    await renderCatTemplate();
    
    const buttons = document.querySelectorAll('.showBtn');

    buttons.forEach(el => el.addEventListener('click', (e) => {

        const infoDiv = e.target.nextElementSibling;

        if (infoDiv.style.display == 'none') {

            infoDiv.style.display = 'block';

            e.target.textContent = 'Hide status code';
        }
        else {

            infoDiv.style.display = 'none';

            e.target.textContent = 'Show status code';
        }
    }))
})()
