//// Global Variables ////
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,email, location, phone, dob &noinfo &nat=US`
const searchBox = document.getElementById("searchBox");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
let employees = [];
let currentModal = 0;
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

    currentModalString = index;
    currentModal = parseInt(currentModalString, 10);

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
    overlay.classList.add("show");
    modalContainer.innerHTML = modalHTML;
}
// Set display to show
function displayShow(event) {
    setTimeout(function(){ event.style.opacity = 1 }, 100);
};
// Set display to hide
function displayHide(event) {
    setTimeout(function(){ event.style.display = 'none' }, 1000);
};

overlay.style.opacity = 0;
overlay.style.display = 'none';

gridContainer.addEventListener('click', event => {
    if(event.target !== gridContainer) {
        const card = event.target.closest(".card");
        const index = card.getAttribute('data-index');
        if(overlay.style.display === "none") {
            displayModal(index);
            overlay.style.display = "";
            displayShow(overlay);
        }
    }
});

 modalClose.addEventListener('click', () => {
    if(overlay.style.display === "") {
        overlay.style.opacity = 0;
        displayHide(overlay);
    }
 });

 //// Search Employees jquery ////

 $("#searchBox").on("keyup", function(){
    const value = $(this).val().toLowerCase();
  
    $(".card").filter(function(){
      $(this).toggle($(this).html().toLowerCase().indexOf(value) > -1)
    });
  });

  //// Modal arrow toggles ////
  arrowRight.addEventListener('click', event => {
    let nextEmployee = currentModal;
    if(nextEmployee <= employees.length - 2) {
        nextEmployee += 1
        displayModal(nextEmployee);
    } else if(currentModal === 11) {
        nextEmployee = 0;
        displayModal(nextEmployee);
    }
  });

  arrowLeft.addEventListener('click', event => {
    let nextEmployee = currentModal;
    if(nextEmployee >= 1) {
        nextEmployee += -1
        displayModal(nextEmployee);
    } else if(currentModal === 0) {
        nextEmployee = 11;
        displayModal(nextEmployee);
    }
  });