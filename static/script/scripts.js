window.addEventListener('load', () => {
  showData()

  const form = document.querySelector('#new-task-form')
  const input = document.querySelector('#new-task-inp')
  const task_l = document.querySelector('#tasks')
  const task_list = document.querySelector('.task')

  task_l.addEventListener('click',
    function (event) {
      if (event.target.matches('.edit-task')) {
        task_edit = event.target;
        const task_input_element = task_edit.parentNode.querySelector(".custom-task-input");
        if (task_edit.innerText == "Edit") {
          task_input_element.removeAttribute("readonly");
          task_input_element.focus();
          task_edit.innerText = "Save"
        }
        else {
          task_input_element.setAttribute("readonly", "readonly")
          console.log("Save");
          task_edit.innerText = "Edit"
        }
        saveData();
      }
    });

  task_l.addEventListener('click',
    function (event) {
      if (event.target.matches('.delete-task')) {
        if (task_l.contains(event.target.parentNode)) {
          task_list.removeChild(event.target.parentNode);
          saveData();
        }
      }
    });
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const task_edit = document.createElement('button')
    const task_delete = document.createElement("input")
    task_delete.type = "checkbox";

    const task = input.value;
    input.value = "";

    if (!task) return;
    console.log("submit");

    const task_element = document.createElement("div");
    task_element.classList.add("task", "flex");

    const task_input_element = document.createElement("input")
    task_input_element.setAttribute("name", `task_${Date.now()}`);
    task_input_element.classList.add("custom-task-input");
    task_input_element.classList.add("rounded", "resize-y", "max-w-fit", "text-ellipsis", "text-slate-500", "m-1", "p-2")
    task_input_element.value = task
    task_input_element.setAttribute("readonly", "readonly")


    task_edit.classList.add("edit-task", "bg-cyan-900", "cursor-pointer", "rounded", "p-2", "m-1", "hover:bg-cyan-700")
    task_edit.innerHTML = "Edit"

    task_delete.classList.add("delete-task", "cursor-pointer", "rounded-full", "p-2");

    task_element.appendChild(task_delete)
    task_element.appendChild(task_input_element);
    task_element.appendChild(task_edit)
    task_list.appendChild(task_element)
    task_l.appendChild(task_list);

    saveData();
  })
})

function saveData() {
  const task = document.querySelector(".task");
  localStorage.setItem("data", task.innerHTML);
  const input_elements = task.querySelectorAll("input");
  let inp_vals = [];
  for (const iterator of input_elements) {
    inp_vals.push(iterator.value);
  }
  localStorage.setItem("myInputValues", JSON.stringify(inp_vals));
}

function showData() {
  const task = document.querySelector(".task");
  task.innerHTML = localStorage.getItem("data");
  const input_elements = task.querySelectorAll("input");
  const storedValues = JSON.parse(localStorage.getItem("myInputValues"));

  let i = 0;
  for (const iterator of input_elements) {
    iterator.value = storedValues[i];
    i++;
  }
}
