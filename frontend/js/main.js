import { checkAuth} from './api/auth.js';
import {createNewCategory,deleteOneCategory,getMyCategories, selectCategories, UpdateCategory} from './api/categories.js';
import {createNewTask, GetMyTasks,SetTaskStatus, GetOneTask, UpdateTask, DeleteOneTask} from './api/tasks.js';

window.addEventListener('load', async (e) => {
	try {
		await checkAuth();
	}
	catch {
		window.location.href = '/auth.html';
	}
});

// Модальне вікно
const modal = document.getElementById('myModal');

const openModalBtn = document.getElementById("myBtn");

const closeModalBtn = document.getElementById("Close1");

const spanenetr = document.getElementById('Enter1');

openModalBtn.onclick = function() {
    modal.style.display = "block";
}

closeModalBtn.onclick = function() {
    modal.style.display = "none";
}

spanenetr.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//------------------------------------------//







//-----------------------------------------//
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


newCategoryForm.addEventListener('submit', async (e) => {
	e.preventDefault();
    
	const name = newCategoryForm.elements.namedItem('name').value;
	const color = getRandomHexColor();
	try {
		await createNewCategory({ name, color});
		window.location.href = '/';
	}
	catch (err) {
		alert('Помилка');
		console.error(err);
	}
   
});

// EVENT: Add Category
// newCategoryForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const category = newCategoryInput.value;
//     const isCategoryEmpty = !category || !category.trim().length;

//     if (isCategoryEmpty) {
//         return console.log('please enter a task');
//     }

//     categories.push({ _id: Date.now().toString(), category: category, color: getRandomHexColor() });

//     newCategoryInput.value ='';

//     saveAndRender();
// });

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
categoriesContainer.addEventListener('change', async (e) => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const newCategoryColor = e.target.value;
        const categoryId = e.target.parentElement.dataset.categoryId;
        
        await UpdateCategory(categoryId, {
            color: newCategoryColor
        })

        saveAndRender();
    }
});

// EVENT: Delete Selected Category
currentlyViewing.addEventListener('click', async (e) => {
    if (e.target.tagName.toLowerCase() === 'span') {
        await deleteOneCategory(selectedCategoryId);
        selectedCategoryId = null;

        saveAndRender();
    }
});

// EVENT: Add Todo
newTodoForm.addEventListener('submit', async (e) => {
	e.preventDefault();
    
	const name = newTodoForm.elements.namedItem('name').value;
	const description = newTodoForm.elements.namedItem('description').value;
    const importance = newTodoForm.elements.namedItem('importance').value;
    console.log(newTodoForm.elements);
    const complited = false;
    const category = newTodoForm.elements.namedItem('category').value;

	try {
		await createNewTask({ name, description, importance, complited, category});
		window.location.href = '/';
	}
	catch (err) {
		alert('Помилка');
		console.error(err);
	}
   
});
// newTodoForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     todos.push({
//         _id: Date.now().toString(),
//         CategoryId: newTodoSelect.value,
//         ToDoName: newTodoNameInput.value,
//         ToDoDescription:newTodoDescriptionInput.value,
//         ToDoStatus: false,
//         ToDoImportance: newTodoImportanceSelect.value,
//     });

//     newTodoSelect.value = '';
//     newTodoNameInput.value = '';
//     newTodoDescriptionInput.value = '';
//     newTodoImportanceSelect.value = '';

//     saveAndRender();
// });

// EVENT: Load Edit Todo Form With Values
let todoToEdit = null;
todosContainer.addEventListener('click', async (e) => {
    if (e.target.classList[1] === 'fa-edit') {
        newTodoForm.style.display = 'none';
        editTodoForm.style.display = 'flex';
        console.log(e.target.dataset.editTodo);
//        todoToEdit = todos.find((todo) => todo._id === e.target.dataset.editTodo);
        todoToEdit = await GetOneTask(e.target.dataset.editTodo);

        editTodoDescriptionInput.value= todoToEdit.description;
        editTodoNameInput.value = todoToEdit.name;
        editTodoImportanceSelect.value = todoToEdit.importance;

    }
    if (e.target.classList[1] === 'fa-trash-alt') {
        await DeleteOneTask(e.target.dataset.deleteTodo);

        saveAndRender();
    }
});

// EVENT: Update The Todo Being Edited With New Values

// editTodoForm.addEventListener('submit', async (e) => {
// 	e.preventDefault();
    
// 	const name = newTodoForm.elements.namedItem('name').value;
// 	const description = newTodoForm.elements.namedItem('description').value;
//     const importance = newTodoForm.elements.namedItem('importance').value;
//     console.log(newTodoForm.elements);
//     const complited = false;
//     const category = newTodoForm.elements.namedItem('category').value;

// 	try {
// 		await createNewTask({ name, description, importance, complited, category});
// 		window.location.href = '/';
// 	}
// 	catch (err) {
// 		alert('Помилка');
// 		console.error(err);
// 	}
   
// });

editTodoForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // e.target.elements.namedItem('description').value = editTodoDescriptionInput.value;
    // e.target.elements.namedItem('name').value = editTodoNameInput.value ;
    // e.target.elements.namedItem('importance').value = editTodoImportanceSelect.value;

    editTodoForm.style.display = 'none';
    newTodoForm.style.display = 'flex';

    try {
		await UpdateTask(todoToEdit._id, {
            name: e.target.elements.namedItem('name').value,
            description: e.target.elements.namedItem('description').value,
            importance: e.target.elements.namedItem('importance').value
        });
		window.location.href = '/';
	}
	catch (err) {
		alert('Помилка');
		console.error(err);
	}
    saveAndRender();
});

// *==================== Functions ====================

function saveAndRender() {
 //   save();
    render();
}

// function save() {
//     localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(categories));
//     localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todos));
// }

async function savecheckbox(_id){
    console.log(_id);

    const todo = await GetOneTask(_id);
    console.log(todo);
        if(todo._id==_id){
        todo.completed = !todo.completed;
        
        const $element = document.getElementById(`CB${_id}`);
        console.log($element.parentElement.children[1].classList);
        $element.parentElement.children[1].classList.toggle("todo-completed");
        console.log(todo.completed);
        await SetTaskStatus(todo._id,{completed: todo.completed} );
        // window.location.reload();
        
    }
};

document.addEventListener("click", async (e)=>{
  
        if(e.target.classList.contains("todo-radio")){
            console.log(e.target.getAttribute('todoid'));
            await savecheckbox(e.target.getAttribute('todoid'));
        }
    });






async function render() {
    clearChildElements(categoriesContainer);
    clearChildElements(newTodoSelect);
    clearChildElements(todosContainer);

    renderCategories();
    renderFormOptions();
    renderTodos();

    // Set the current viewing category
    if (!selectedCategoryId || selectedCategoryId === null) {
        currentlyViewing.innerHTML = `You are currently viewing <strong>All Categories</strong>`;
    } else {
        const categories = await getMyCategories();
        const currentCategory = categories.find((category) => category._id === selectedCategoryId);
        currentlyViewing.innerHTML = `You are currently viewing <strong>${currentCategory.name}</strong> <span>(delete)</span>`;
    }
}

async function renderCategories() {
    categoriesContainer.innerHTML += `<li class="sidebar-item ${selectedCategoryId === 'null' 
    || selectedCategoryId === null ? 'active' : ''}" data-category-id="">View All</li>`;

    const categories = await getMyCategories();
    categories.forEach(({ _id, name, color }) => {
        categoriesContainer.innerHTML += ` <li class="sidebar-item ${_id === selectedCategoryId ? 'active' : ''}" 
        data-category-id=${_id}>${name}<input class="sidebar-color" type="color" value=${color}></li>`;
    });
}

async function renderFormOptions() {

    newTodoSelect.innerHTML += `<option value="" disabled selected>Select сategory</option>`;

    const categories = await selectCategories();
    categories.forEach(({ _id, name}) => {
        newTodoSelect.innerHTML += `<option value=${_id}>${name}</option>`;

    });
}

async function renderTodos() {
    const todos = await GetMyTasks();
    const categories = await getMyCategories();
    const importanceMap = {0:"Low",1:"Medium",2:"High"}
    console.log(categories);
    let todosToRender = todos;

    // if their is a Selected Category Id, and selected category id !== 'null then filter the todos
    if (selectedCategoryId && selectedCategoryId !== null) {
        todosToRender = todos.filter((todo) => todo.category._id === selectedCategoryId);
    }

    console.log(todosToRender);
    // Render Todos
    
    todosToRender.forEach(({ _id,name, description, importance, completed, category}) => {

        // Get Complimentary categoryDetails Based On TaskId
        console.log(category);
        const { color, name:categori} = categories.find(({ _id }) => _id === category._id);
        const backgroundColor = convertHexToRGBA(color, 20);
        todosContainer.innerHTML += `
			<div class="todo" style="border-color: ${color}">
                <form class="form-card-todo">
                       
					<div class="todo-tag" style="background-color: ${backgroundColor}; color: ${color};">
						${categori}
                	</div>
                    <div>
                         <i class="todo-importance"> ${importanceMap[importance]}</i>
                    </div>
                </form>
                <form>
                    <div class="todo-status-name">
                        <input type="checkbox" class="todo-radio" todoid="${_id}" id="CB${ _id }" ${completed? "checked" : ""}>
                        <p  class="${completed? "todo-completed" : ""} todo-name">${name}</p>
                    </div> 
                    <p class="todo-description">${description}</p>
					<div class="todo-actions">
						<i class="far fa-edit" data-edit-todo=${_id}></i>
						<i class="far fa-trash-alt" data-delete-todo=${_id}></i>
					</div>
                </form>
			</div>`;
    });
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


