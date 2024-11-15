const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit' , function(e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();            // إزاله المسافات من علي الجوانب
    if (todoText.length > 0) {                          // لو اكتر من 0 ، إذا فيه حاجه مكتوبه نضيفها
        const todoObject = {
            text : todoText,
            completed : false               // by default
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";                           // نفضي مكان الكتابه
    }
}
function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo , todoIndex )=>{
        todoItem = createTodoItem(todo , todoIndex);
        todoListUL.append(todoItem);
    })
}
function createTodoItem(todo , todoIndex) {
    const todoId = "todo-" + todoIndex ;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
            <input type="checkbox" id="${todoId}">
            <label class="custom-checkbox" for="${todoId}">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
            </label>
            <label class="todo-text" for="${todoId}">
                ${todoText}
            </label>
            <button class="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
    `
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click" , () => {
        deleteTodoItem(todoIndex);
    })
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change" , () => {
        allTodos[todoIndex].completed = checkbox.checked;       // checked return true or false to completed
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLI;
}
function deleteTodoItem (todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);  // Function: if true keep the item , if false delete
    saveTodos();
    updateTodoList();
}
function saveTodos() {
    const todosJson = JSON.stringify(allTodos); 
    localStorage.setItem("todos" , todosJson);
}
function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}