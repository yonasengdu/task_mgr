
const AddTaskBtn = document.querySelector("#add_tasks")
const TaskCard = document.querySelector(".task-card")
const TaskForm = document.querySelector(".task-card--form")
const submitTask = TaskForm.querySelector(".create-btn")  
const editTaskBtn = TaskForm.querySelector(".edit-btn")
  


const  err = document.querySelector(".error")




AddTaskBtn.addEventListener("click", (e) => {
    e.preventDefault()
    TaskCard.classList.toggle("hidden")


})


submitTask.addEventListener("click", (e) => {
    e.preventDefault()
    
const NameField = TaskForm.querySelector(".task-name")
const DescriptionField = TaskForm.querySelector(".task-desc")
const selectCategory = TaskForm.querySelector(".task-status")

if (NameField && selectCategory){
    createTask(NameField.value, DescriptionField.value, selectCategory.value)
}
})


   




function createTask(name, desc, category){
    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("access_token")}` 
        },
        body: JSON.stringify({
            "name": name,
            "description": desc,
            "status": category
        })
    }).then(async response =>  await response.json())
        .then(data => {  
            if (data.statusCode == 400){
                err.innerHTML = data.message
                err.classList.toggle("hidden")
            }
            displayTasks()
        
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    
  
    }


function displayTasks(){
    console.log(localStorage.getItem("access_token"))
    fetch('http://localhost:3000/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("access_token")}` 
        }
    }).then(async response =>  await response.json())
        .then(data => { 
            console.log(data)

            let taskList = document.querySelector(".tasks")
            taskList.innerHTML = ""
            data.forEach(task => {

                let taskItem = document.createElement("div")
                taskItem.classList.add("task-item")
                taskItem.innerHTML = `
                <div class="container">
                <div class="card task-card">
                    <div class="card-border">
                        <div class="card-background">
                            <div class="card-body">
                                <div class="info-row">
                                    <span class="task-title">${task.name}</span>
                                    <span class="task-date">${task.createdAt.slice(0,10)}</span>
                                </div>
                                <div >
                                <p class="card-description">${task.description}</p>
                                </div>
                                <div class="action-row">
                                    <div class="tags-wrap">
                                        <div class="tag cat-01">${task.status}</div>
                                        <div class="">
                                        <div class="tag cat-02 delete" onclick=deleteTask(${task.id})>delete</div>
                                        <div class="tag cat-02 edit" onclick=editTaskDataProvider(${task.id})>edit</div>
                                        <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
                taskList.appendChild(taskItem)
            });

            
        })
        .catch((error) => {
            console.error('Error:', error);
        }); 
}




function deleteTask(id){
    fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
    }).then(async response =>  await response.json())
        .then(data => {
            console.log(data)
            displayTasks()
        })

            .catch((error) => { }
            );
    }



function editTaskDataProvider(id){
    TaskCard.classList.toggle("hidden")
    submitTask.classList.toggle("hidden")
    editTaskBtn.classList.toggle("hidden")
     

    editTaskBtn.addEventListener("click", (e) => {
        e.preventDefault()
        const NameField = TaskForm.querySelector(".task-name")
        const DescriptionField = TaskForm.querySelector(".task-desc")
        const selectCategory = TaskForm.querySelector(".task-status")
    
        editTask(id, NameField.value, DescriptionField.value, selectCategory.value)
     })
 }





function editTask(id, name, desc, category){
    fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
    body: JSON.stringify({
        "name": name,
        "description": desc,
        "status": category
    })

    }).then(async response =>  await response.json())
        .then(data => {
            displayTasks()
        }).catch((error) => { }
            );  
    }




window.onload = function(){
    displayTasks()

}

    