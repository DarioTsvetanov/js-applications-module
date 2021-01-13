loadStudent();

const submitButton = document.querySelector('button');
submitButton.addEventListener('click', addStudent);

function loadStudent() {

    fetch('https://softuni-remote-database.firebaseio.com/students-list.json')
        .then(res => res.json())
        .then(students => {

            const tbody = document.querySelector('tbody');
            tbody.innerHTML = '';

            for (let key in students) {
                
                const student = students[key];

                const newTr = document.createElement('tr');
                newTr.setAttribute('data-id', student.id)

                const idTd = document.createElement('td');
                idTd.textContent = student.id;

                const firstNameTd = document.createElement('td');
                firstNameTd.textContent = student.firstName;

                const lastNameTd = document.createElement('td');
                lastNameTd.textContent = student.lastName;

                const facultyNumberTd = document.createElement('td');
                facultyNumberTd.textContent = student.facultyNumber;

                const gradeTd = document.createElement('td');
                gradeTd.textContent = student.grade;

                newTr.appendChild(idTd);
                newTr.appendChild(firstNameTd);
                newTr.appendChild(lastNameTd);
                newTr.appendChild(facultyNumberTd);
                newTr.appendChild(gradeTd);

                tbody.appendChild(newTr);
            }
            
            Array.prototype.slice.call(tbody.children)
            .map(function (x) { return tbody.removeChild(x); })
            .sort((x, y) => x.getAttribute('data-id') - y.getAttribute('data-id'))
            .forEach(function (x) { tbody.appendChild(x); });
        })
}

function addStudent() {

    const idInput = document.querySelector('#id-number');
    const firstNameInput = document.querySelector('#first-name');
    const lastNameInput = document.querySelector('#last-name');
    const facultyNumberInput = document.querySelector('#faculty-number');
    const gradeInput = document.querySelector('#grade');

    if (idInput.value == '' || firstNameInput.value == '' || lastNameInput.value == '' ||
        facultyNumberInput.value == '' || gradeInput.value == '') return;

    let studentObj = {
        id: idInput.value,
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        facultyNumber: facultyNumberInput.value,
        grade: gradeInput.value,
    }

    idInput.value = '';
    firstNameInput.value = '';
    lastNameInput.value = '';
    facultyNumberInput.value = '';
    gradeInput.value = '';

    fetch('https://softuni-remote-database.firebaseio.com/students-list.json', {
        method: "POST",
        body: JSON.stringify(studentObj)
    })
        .then(() => loadStudent())
}