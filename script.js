//selection
const alert = document.querySelector('.alert');
const form = document.querySelector('.groceryForm');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');

//everything edit
let editElement;
let editFlag = false;
let editID = '';
//events
//event for adding item
form.addEventListener('submit', addItem);

const clear = document.querySelector('.clear-btn');

function addItem(e) {
    e.preventDefault(); //to prevent the form from immediate submission
    const value = grocery.value;
    //creating unique id
    const id = new Date().getTime().toString(); //getTime -> to milliseconds

    if (value && !editFlag) {
        const element = document.createElement('article');
        let attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add('grocery-item');
        element.innerHTML = (`<p class='title'> ${value} </p>
        <div class="btn-group">
            <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i> </button>
            <button type="button" class="trash-btn">
            <i class="fas fa-trash-alt"></i> </button>
        </div> `);
        //accessing delete & edit btn for later use
        const toTrash = element.querySelector('.trash-btn');
        toTrash.addEventListener('click', deleteItems);

        const toEdit = element.querySelector('.edit-btn');
        toEdit.addEventListener('click', editItems);
        //toEdit.addEventListener('click', editItems);
        // embedding / appending to other element
        list.appendChild(element);
        container.classList.add('show');
        alerts(`New item added`, `new`);
        //default text field line 67
        setBackToDefault();

    } else if (value && editFlag) {
        editElement.innerHTML = value;

        setBackToDefault();
        // console.log('item edited');
        //alerts(`Item edited`, `edit`);
    } else {
        alerts(`Please enter value`, `empty`);


    }
}


//to clear list
clear.addEventListener('click', clearItems);

function clearItems(e) {
    e.preventDefault();
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(function(item) {
            items.forEach(function(item) { list.removeChild(item) });
        });
        container.classList.remove('show');
        alerts('List Cleared', 'empty');
        setBackToDefault();
    }
}
// DELETE FUNCTION
function deleteItems(e) {
    e.preventDefault();
    const element = e.currentTarget.parentElement.parentElement;
    list.removeChild(element);
    alerts('Item Removed', 'empty');
    if (list.children.length === 0) {
        container.classList.remove('show');
    }
    setBackToDefault();

}
// EDIT FUNCTIONS
function editItems(e) {
    e.preventDefault();
    submitBtn.innerHTML = 'edit';
    const element = e.currentTarget.parentElement.parentElement;
    editElement = element.children[0];
    // submitBtn.addEventListener('click', editFinal);
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;


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

// set to   
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}