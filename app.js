//// Global Variables ////
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,email, location, phone, dob &noinfo &nat=US`

let employees = [];
//////////////////////////


//// Fetch API ////

fetch(urlAPI)
    .then(data => data.json())
    .then(data => data.results)
    .then(displayEmployees)
    .catch(err => console.log(err));


//// Generate HTML from API ////    
function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture
        employeeHTML += `
        <section class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" alt="A picture of ${name.first}">
            <div class="info-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="city">${city}</p>
            </div>
        </section>
        `
    });
    gridContainer.innerHTML = employeeHTML;
}