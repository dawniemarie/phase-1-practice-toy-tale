document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", addNewToy) 
  document.addEventListener("click", (e) => {
    if(e.target.matches(".like-btn")) {
      updateLikes(e)
    }
  })
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let addToy = false;

// When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
// Added child elements: h2, img src and class, p tag, and button tag
function renderOneToy(toy) {
  const card = document.createElement('div')
  card.className = "card"
  const image = document.createElement('img')
  image.src = toy.image;
  image.className = 'toy-avatar'
  const h2 = document.createElement('h2')
  h2.innerHTML = `${toy.name}`
  const p = document.createElement('p')
  p.textContent = `${toy.likes} likes`
  p.id = toy.id
  const button = document.createElement('button')
  button.className = 'like-btn'
  button.id = toy.id
  button.addEventListener("click", (e) => {
  })
  button.textContent = "Like ❤️"
  // Appending child elements
  document.querySelector('#toy-collection').appendChild
  (card)
  card.append(image, h2, p, button)
}


// When the page loads, make a 'GET' request to fetch all the toy objects. 
function getAllToys() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => toys.forEach(toy => renderOneToy(toy))) 
}


// Calling function to DOM
function initialize() {
  getAllToys()
}
initialize()

// Function: Add New Toy
function addNewToy(event) {
  event.preventDefault()
  const [name, image] = event.target


// Post New Toy to server
  fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },

  body: JSON.stringify({
    name: name.value,
    image: image.value,
    likes: 0
  })
})
.then(response => response.json())
.then(response => renderOneToy(response))
name.value = ""
image.value = ""
}



function updateLikes(event) {
  event.preventDefault()
  fetch(`http://localhost:3000/toys/${event.target.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: parseInt(event.target.parentElement.children[2].textContent.split(" ")[0], 10) + 1
    })
  })
  .then(response => response.json())
  .then(response => {
    const p = document.getElementById(response.id)
    p.textContent = `${response.likes} likes`
  })
}

