//// Global Variables ////
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,email, location, phone, dob &noinfo &nat=US`
const searchBox = document.getElementById("searchBox");
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

////Generate Modal ////
function displayModal(index) {
    let {name, dob, phone, email, location: {city, street, state,
    postcode}, picture} = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
    <img class="avatar" src="${picture.large}" alt="Picture of ${name.first}">
        <div class="text-content">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="city">${city}</p>
            <hr>
            <p class="phone">${phone}​</p>
            <p class="address">${street.number}, ${street.name}, ${state}, ${postcode}</p>
            <p class="birthday">Birthday: 
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', event => {
    if(event.target !== gridContainer) {
        const card = event.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});

 modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
 });

 //// Search Employees jquery ////

 $("#searchBox").on("keyup", function(){
    const value = $(this).val().toLowerCase();
  
    $(".card").filter(function(){
      $(this).toggle($(this).html().toLowerCase().indexOf(value) > -1)
    });
  });