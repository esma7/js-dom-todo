const todoAddForm = document.querySelector("#todoAddForm");
const todoInput = document.querySelector("#todoName");
const listGroup = document.querySelector(".list-group");

todoAddForm.addEventListener("submit", getForm);

let dataBig = JSON.parse(localStorage.getItem("todos")) || [];
let currentEditIndex = null;

function getForm(e) {
    e.preventDefault();
    dataBig.push(todoInput.value);
    localStorage.setItem("todos", JSON.stringify(dataBig))
    addTodo();
    console.log(dataBig);
    todoInput.value = "";
}

function addTodo() {
    listGroup.innerHTML = "";
    dataBig.map((item, index) => {
        listGroup.innerHTML += `
            <li class="list-group-item d-flex justify-content-between" data-index="${index}">${item}
                <div class="d-flex align-items-center">
                    <a href="#" class="edit-item mx-2">
                        <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="delete-item mx-2">
                        <i class="fa fa-remove"></i>
                    </a>
                </div>
            </li>
        `;
    });



    document.querySelectorAll(".delete-item").forEach((item, index) => {
        item.addEventListener("click", () => {
            dataBig.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(dataBig))
            addTodo();
        });
    });

    document.querySelectorAll(".edit-item").forEach((item) => {
        item.addEventListener("click", (e) => {
            currentEditIndex = e.target.closest("li").dataset.index;
            editTodoName.value = dataBig[currentEditIndex];
            localStorage.setItem("todos", JSON.stringify(dataBig))
            editTodoModal.style.display = "block";
        });
    });

    
}

saveEditButton.addEventListener("click", () => {
    if (currentEditIndex !== null) {
        dataBig[currentEditIndex] = editTodoName.value;
        addTodo();
        editTodoModal.style.display = "none";
    }
});

closeModal.addEventListener("click", () => {
    editTodoModal.style.display = "none";
});

const clearData = document.getElementById("todoClearButton");

clearData.addEventListener("click", () => {
    dataBig = [];
    localStorage.setItem("todos", JSON.stringify(dataBig))
    addTodo();
});
