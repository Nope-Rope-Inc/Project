// Модальне вікно
const modal = document.getElementById('myModal');
const groupModal = document.getElementById('myModal2');

const openModalBtn = document.getElementById("myBtn");
const openGroupModalBtn = document.getElementById("myBtn2");

const closeModalBtn = document.getElementById("Close1");

const closeGroupModalBtn = document.getElementById("Close2");

const spanenetr = document.getElementById('Enter1');
const spanenetr2 = document.getElementById('Enter2');

openModalBtn.onclick = function() {
    modal.style.display = "block";
}
// openGroupModalBtn.onclick = function() {
//     groupModal.style.display = "block";
// }

closeModalBtn.onclick = function() {
    modal.style.display = "none";
   // modal2.style.display = "none";
}

// closeGroupModalBtn.onclick = function() {
//     groupModal.style.display = "none";
// }

spanenetr.onclick = function() {
    modal.style.display = "none";
    //modal2.style.display = "none";

}
// spanenetr2.onclick = function() {
//     groupModal.style.display = "none";
//
// }

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    // else if (event.target == groupModal) {
    //     groupModal.style.display = "none";
    // }
}
//------------------------------------------//

// Selectors for new category form
const newCategoryForm = document.querySelector('[data-new-category-form]');
const newCategoryInput = document.querySelector('[data-new-category-input]');

// Selector for categories container
const categoriesContainer = document.querySelector('[data-categories]');

// Selector for currently viewing
const currentlyViewing = document.querySelector('[data-currently-viewing]');

// Selector for new todo form
const newTodoForm = document.querySelector('[data-new-todo-form]');
const newTodoSelect = document.querySelector('[data-new-todo-select]');
const newTodoNameInput = document.querySelector('[data-new-todoname-input]');
const newTodoDescriptionInput = document.querySelector('[data-new-tododescription-input]')
const newTodoImportanceSelect = document.querySelector('[data-new-todoimportance-select]');
const newTodoStatus =  document.querySelector('[data-new-todostatus-switch]');

// Selector for edit todo form
const editTodoForm = document.querySelector('[data-edit-todo-form]');
const editTodoImportanceSelect = document.querySelector('[data-edit-todoimportance-select]');
const editTodoNameInput = document.querySelector('[data-edit-todoname-input]');
const editTodoDescriptionInput = document.querySelector('[data-edit-tododescription-input]');


// Selector for todos container
const todosContainer = document.querySelector('[data-cards]');

// Local storage keys
const LOCAL_STORAGE_CATEGORIES_KEY = 'LOCAL_STORAGE_CATEGORIES_KEY';
const LOCAL_STORAGE_TODOS_KEY = 'LOCAL_STORAGE_TODOS_KEY';
const LOCAL_STORAGE_SELECTED_CATEGORY_ID_KEY = 'LOCAL_STORAGE_SELECTED_CATEGORY_ID_KEY';

let selectedCategoryId = localStorage.getItem(LOCAL_STORAGE_SELECTED_CATEGORY_ID_KEY);
let categories = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY)) || [];
let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS_KEY)) || [];


// EVENT: Add Category
newCategoryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const category = newCategoryInput.value;
    const isCategoryEmpty = !category || !category.trim().length;

    if (isCategoryEmpty) {
        return console.log('please enter a task');
    }

    categories.push({ _id: Date.now().toString(), category: category, color: getRandomHexColor() });

    newCategoryInput.value ='';

    saveAndRender();
});

// EVENT: Get Selected Category Id
categoriesContainer.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'li') {
        if (!e.target.dataset.categoryId) {
            selectedCategoryId = null;
        } else {
            selectedCategoryId = e.target.dataset.categoryId;
        }
        saveAndRender();
    }
});

// EVENT: Get Selected Category Color
categoriesContainer.addEventListener('change', (e) => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const newCategoryColor = e.target.value;
        const categoryId = e.target.parentElement.dataset.categoryId;
        const categoryToEdit = categories.find((category) => category._id === categoryId);

        categoryToEdit.color = newCategoryColor;

        saveAndRender();
    }
});

// EVENT: Delete Selected Category
currentlyViewing.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'span') {
        categories = categories.filter((category) => category._id !== selectedCategoryId);

        todos = todos.filter((todo) => todo.categoryId !== selectedCategoryId);

        selectedCategoryId = null;

        saveAndRender();
    }
});

// EVENT: Add Todo
newTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    todos.push({
        _id: Date.now().toString(),
        CategoryId: newTodoSelect.value,
        ToDoName: newTodoNameInput.value,
        ToDoDescription:newTodoDescriptionInput.value,
        ToDoStatus: false,
        ToDoImportance: newTodoImportanceSelect.value,
    });

    newTodoSelect.value = '';
    newTodoNameInput.value = '';
    newTodoDescriptionInput.value = '';
    newTodoImportanceSelect.value = '';
    // newTodoStatus.value = '';

    saveAndRender();
});

// EVENT: Load Edit Todo Form With Values
let todoToEdit = null;
// todosContainer.addEventListener('click', (e) => {
//     if (e.target.classList[1] === 'fa-edit') {
//         newTodoForm.style.display = 'none';
//         // editTodoForm.style.display = 'flex';
//
//         todoToEdit = todos.find((todo) => todo._id === e.target.dataset.editTodo);
//
//         // editTodoDescriptionInput.value= todoToEdit.ToDoDescription;
//         editTodoNameInput.value = todoToEdit.ToDoName;
//         editTodoImportanceSelect.value = todoToEdit.ToDoImportance;
//
//     }
//     if (e.target.classList[1] === 'fa-trash-alt') {
//         const todoToDeleteIndex = todos.findIndex((todo) => todo._id === e.target.dataset.deleteTodo);
//
//         todos.splice(todoToDeleteIndex, 1);
//
//         saveAndRender();
//     }
// });

// // EVENT: Update The Todo Being Edited With New Values
// editTodoForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//
//     todoToEdit.ToDoDescription = editTodoDescriptionInput.value
//     todoToEdit.ToDoName = editTodoNameInput.value ;
//     todoToEdit.ToDoImportance = editTodoImportanceSelect.value;
//
//     editTodoForm.style.display = 'none';
//     newTodoForm.style.display = 'flex';
//
//     editTodoImportanceSelect = '';
//     editTodoNameInput = '';
//     editTodoDescriptionInput = '';
//
//     saveAndRender();
// });

// *==================== Functions ====================

function saveAndRender() {
    save();
    render();
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(categories));
    localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todos));
    // localStorage.setItem(LOCAL_STORAGE_IMPORTANCE_KEY, JSON.stringify(importance));
    // localStorage.setItem(LOCAL_STORAGE_DESCRIPTION_KEY,JSON.stringify(description) );
    // localStorage.setItem(LOCAL_STORAGE_STATUS_KEY, status );
}

function savecheckbox(_id){
    const todosKey=JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS_KEY));
    console.log(_id);
    console.log(todosKey);
    todosKey.forEach((todo)=>{
        if(todo._id==_id){
        todo.ToDoStatus = !todo.ToDoStatus;
        const $element = event.target;
        console.log($element.parentElement.children[1].classList);
        $element.parentElement.children[1].classList.toggle("todo-completed");
    }
  });
  localStorage.setItem(LOCAL_STORAGE_TODOS_KEY,JSON.stringify(todosKey));
}

function render() {
    clearChildElements(categoriesContainer);
    clearChildElements(newTodoSelect);
    // clearChildElements(editTodoImportanceSelect);
    clearChildElements(todosContainer);

    renderCategories();
    renderFormOptions();
    renderTodos();

    // Set the current viewing category
    if (!selectedCategoryId || selectedCategoryId === 'null') {
        currentlyViewing.innerHTML = `You are currently viewing <strong>All Categories</strong>`;
    } else {
        const currentCategory = categories.find((category) => category._id === selectedCategoryId);
        currentlyViewing.innerHTML = `You are currently viewing <strong>${currentCategory.category}</strong> <span>(delete)</span>`;
    }
}

function renderCategories() {
    categoriesContainer.innerHTML += `<li class="sidebar-item ${selectedCategoryId === 'null' 
    || selectedCategoryId === null ? 'active' : ''}" data-category-id="">View All</li>`;

    categories.forEach(({ _id, category, color }) => {
        categoriesContainer.innerHTML += ` <li class="sidebar-item ${_id === selectedCategoryId ? 'active' : ''}" 
        data-category-id=${_id}>${category}<input class="sidebar-color" type="color" value=${color}></li>`;
    });
}

function renderFormOptions() {

    newTodoSelect.innerHTML += `<option value="" disabled selected>Select сategory</option>`;
    // editTodoSelect.innerHTML += `<option value="" disabled selected>Select сategory</option>`;

    categories.forEach(({ _id, category}) => {
        newTodoSelect.innerHTML += `<option value=${_id}>${category}</option>`;
        // editTodoSelect.innerHTML += `<option value=${_id}>${category}</option>`;

    });
}

function renderTodos() {
    let todosToRender = todos;

    // if their is a Selected Category Id, and selected category id !== 'null then filter the todos
    if (selectedCategoryId && selectedCategoryId !== 'null') {
        todosToRender = todos.filter((todo) => todo.categoryId === selectedCategoryId);
    }
    console.log(todosToRender);
    // Render Todos
    todosToRender.forEach(({ _id, CategoryId,ToDoName, ToDoDescription, ToDoImportance, ToDoStatus }) => {

        // Get Complimentary categoryDetails Based On TaskId
        console.log(CategoryId);
        console.log(categories);
        console.log(ToDoImportance);
        const { color, category} = categories.find(({ _id }) => _id === CategoryId);
        const backgroundColor = convertHexToRGBA(color, 20);
        todosContainer.innerHTML += `
			<div class="todo" style="border-color: ${color}">
                <form class="form-card-todo">
                       
					<div class="todo-tag" style="background-color: ${backgroundColor}; color: ${color};">
						${category}
                	</div>
                    <div>
                         <i class="todo-importance"> ${ToDoImportance}</i>
                    </div>
                </form>
                    <div class="todo-status-name">
                        <input type="checkbox" class="todo-radio"  id="CB${ _id }" onClick = savecheckbox(${_id}) ${ToDoStatus? "checked" : ""}>
                        <p class="${ToDoStatus? "todo-completed" : ""} todo-name">${ToDoName}</p>
                    </div> 
                    <p class="todo-description">${ToDoDescription}</p>
					<div class="todo-actions">
						<i class="far fa-edit" onclick="showEditTaskModal(${_id})" data-edit-todo=${_id}></i>
						<div id="editTaskModal_${_id}" class="modal" style="display: none;">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1>Edit ToDo</h1>
                                    <span class="close" id="Close2">&times;</span>
                                </div>
                                <div class="modal-body">
                                    asfdsgdfhjgkhgfgdfs
                                </div>
                            </div>
        
                        </div>
						<i class="far fa-trash-alt" data-delete-todo=${_id}></i>
					</div>
                    
			</div>`;
    });
}

function showEditTaskModal(id) {
    const modal = document.getElementById(`editTaskModal_${id}`);
    modal.style.display = 'block';
}

// HELPERS
function clearChildElements(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function convertHexToRGBA(hexCode, opacity) {
    let hex = hexCode.replace('#', '');

    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r},${g},${b},${opacity / 100})`;
}

function getRandomHexColor() {
    var hex = (Math.round(Math.random() * 0xffffff)).toString(16);
    while (hex.length < 6) hex = "0" + hex;
    return `#${hex}`;
}

window.addEventListener('load', render);


