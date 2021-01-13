$(() => {
    
    const monkeyList = document.querySelector('.monkeys');

    const monkeyTemplate = Handlebars.compile(document.querySelector('#monkey-template').innerHTML);
    monkeyList.innerHTML = monkeys.map(monkey => monkeyTemplate(monkey)).join('');

    document.querySelectorAll('.monkey button').forEach(button => button.addEventListener('click', showInfo));
})

function showInfo(e) {

    let infoDiv = e.target.nextElementSibling;

    if (infoDiv.style.display == 'none') infoDiv.style.display = 'block';
    else infoDiv.style.display = 'none';
}