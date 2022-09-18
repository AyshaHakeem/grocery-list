//selection
const alert = document.querySelector('.alert');
const form = document.querySelector('.groceryForm');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');

let index = localStorage.length
let itemId = ''
let id = ''

//event run upon load

form.addEventListener('submit', addItem);
const clear = document.querySelector('.clear-btn');

window.addEventListener('load', () => {
    
    Object.keys(localStorage).forEach((x)=>{

            id = new Date().getTime().toString(); //getTime -> to milliseconds

            const element = document.createElement('article');
            element.classList.add('grocery-item');
            element.innerHTML = (`<p class='title'> ${localStorage.getItem(x)} </p>
            <div class="btn-group">
                <button type="button" class="trash-btn">
                <i class="fas fa-trash-alt"></i> </button>
            </div> `);

            //accessing delete btn for later use
            const toTrash = element.querySelector('.trash-btn');
            toTrash.addEventListener('click', deleteItems);

            // embedding / appending to other element
            list.appendChild(element);
            container.classList.add('show');

    })

})

// event for adding item

function addItem(e) {
    e.preventDefault(); //to prevent the form from immediate submission
    const value = grocery.value;
    //creating unique id
    id = new Date().getTime().toString(); //getTime -> to milliseconds
    if (value) {
        itemId = `item${id}`  // key to save item to localStorage
        localStorage.setItem( itemId , value)

        const element = document.createElement('article');
        element.classList.add('grocery-item');
        element.innerHTML = (`<p class='title'> ${localStorage.getItem(itemId)} </p>
        <div class="btn-group">
            <button type="button" class="trash-btn">
            <i class="fas fa-trash-alt"></i> </button>
        </div> `);
        
        //accessing delete btn for later use
        const toTrash = element.querySelector('.trash-btn');
        toTrash.addEventListener('click', deleteItems);

        // embedding / appending to other element
        list.appendChild(element);
        container.classList.add('show');
        alerts(`New item added`, `new`);
        grocery.value = "";

    } else {
        alerts(`Please enter value`, `empty`);
    }
}


//to clear list
clear.addEventListener('click', clearItems);

function clearItems(e) {
    e.preventDefault();
    localStorage.clear();
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(item => list.removeChild(item));
        container.classList.remove('show');
        alerts('List Cleared', 'empty');
        grocery.value = "";
    }
}
// DELETE FUNCTION
function deleteItems(e) {
    e.preventDefault();
    const element = e.currentTarget.parentElement.parentElement;
    // remove from local storage
    let toDelete = Object.values(localStorage).indexOf(`${element.firstChild.innerText}`)
    localStorage.removeItem(Object.keys(localStorage)[toDelete])
    list.removeChild(element);
    alerts('Item Removed', 'empty');
    if (list.children.length === 0) {
        container.classList.remove('show');
    }
}

// alerts function
function alerts(text, action) {
    alert.textContent = (`${text}`);
    alert.classList.add(`alert-${action}`);
    //remove alert
    setTimeout(function() {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}
