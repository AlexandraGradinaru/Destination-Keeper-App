const formBtn = document.querySelector(".form-btn");
const gallery = document.querySelector(".main-body__gallery");
const formInput = document.querySelector(".form-input");
const form = document.querySelector(".main-body__form");
const destinationFilter = document.querySelector(".destination-filter");
//Function for adding destinations
function addDestination(e) {
  e.preventDefault();
  const destinationDiv = document.createElement("div");
  destinationDiv.classList.add("destination");
  const newdestination = document.createElement("li");
  newdestination.classList.add("destination-item");
  newdestination.innerText = formInput.value;
  saveToLocalStorage(formInput.value);
  destinationDiv.appendChild(newdestination);
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-div");
  destinationDiv.appendChild(buttonDiv);
  //Adding destination to local Storage
  const visitedBtn = document.createElement("button");
  visitedBtn.innerHTML = '<i class="fas fa-check"></i>';
  visitedBtn.classList.add("visited-btn");
  buttonDiv.appendChild(visitedBtn);
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.classList.add("delete-btn");
  buttonDiv.appendChild(deleteBtn);
  gallery.appendChild(destinationDiv);
  formInput.value = "";
}
//Events
document.addEventListener("DOMContentLoaded", getDestinations);
formBtn.addEventListener("click", addDestination);
gallery.addEventListener("click", deleteCheck);
destinationFilter.addEventListener("click", filterDestinations);

//Delete Destination function
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "delete-btn") {
    const destinationItem = item.parentElement;
    const destinationItemContainer = destinationItem.parentElement;
    RemoveFromLocalStorage(destinationItem);
    destinationItemContainer.remove();
  }
  if (item.classList[0] === "visited-btn") {
    const destinationItem = item.parentElement;
    const destinationItemContainer = destinationItem.parentElement;
    destinationItemContainer.classList.toggle("visited");
  }
}
//Filter Destinations
function filterDestinations(e) {
  const destinations = gallery.childNodes;
  destinations.forEach(function (destination) {
    switch (e.target.value) {
      case "all":
        destination.style.display = "flex";
        break;
      case "visited":
        if (destination.classList.contains("visited")) {
          destination.style.display = "flex";
        } else {
          destination.style.display = "none";
        }
        break;
      case "notVisited":
        if (destination.classList.contains("visited")) {
          destination.style.display = "none";
        } else {
          destination.style.display = "flex";
        }
        break;
    }
  });
}
//Function to store the destination input in Local Storage
function saveToLocalStorage(destination) {
  let destinations;
  if (localStorage.getItem("destinations") === null) {
    destinations = [];
  } else {
    destinations = JSON.parse(localStorage.getItem("destinations"));
  }
  destinations.push(destination);
  localStorage.setItem("destinations", JSON.stringify(destinations));
}

//Function to retrieve the destinations from Local Storage
function getDestinations() {
  let destinations;
  if (localStorage.getItem("destinations") === null) {
    destinations = [];
  } else {
    destinations = JSON.parse(localStorage.getItem("destinations"));
  }
  destinations.forEach(function (destination) {
    const destinationDiv = document.createElement("div");
    destinationDiv.classList.add("destination");
    const newdestination = document.createElement("li");
    newdestination.classList.add("destination-item");
    newdestination.innerText = destination;
    destinationDiv.appendChild(newdestination);
    formInput.value = "";
    //Adding Visited and Delete Btns
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");
    destinationDiv.appendChild(buttonDiv);
    const visitedBtn = document.createElement("button");
    visitedBtn.innerHTML = '<i class="fas fa-check"></i>';
    visitedBtn.classList.add("visited-btn");
    buttonDiv.appendChild(visitedBtn);
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    buttonDiv.appendChild(deleteBtn);
    gallery.appendChild(destinationDiv);
    console.log(destination);
  });
}
//Function to remove(delete) destinations from Local Storage
function RemoveFromLocalStorage(destination) {
  let destinations;
  if (localStorage.getItem("destinations") === null) {
    destinations = [];
  } else {
    destinations = JSON.parse(localStorage.getItem("destinations"));
  }
  const destinationIndex = destination.children[0].innerText;
  destinations.splice(destinations.indexOf(destinationIndex), 1);
  localStorage.setItem("destinations", JSON.stringify(destinations));
}
