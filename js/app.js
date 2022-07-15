const Title= document.getElementById('task_title'),
      Description= document.getElementById('task_description'),
      Tasks=document.getElementById('taskList');

const toggles = document.querySelectorAll('.task-toggle')

function toggleDescription(el){
        el.parentNode.parentNode.classList.toggle('active')
}

var taskNo = (Tasks.childNodes.length-1)/2+1;

function addToDo(){
    var taskTitle = Title.value,
        taskDescription = Description.value;
    
    if(taskTitle != ''){
        var taskID = "task"+taskNo;

        let newTaskDiv = document.createElement('div')
        newTaskDiv.id = taskID
        newTaskDiv.className = 'task'
    
        let hrline = document.createElement('hr')                           // Create Top-bar indicates task status
        hrline.className = 'top-bar'

        let titleContainerDiv = document.createElement('div')
        titleContainerDiv.classList.add('title-container','d-flex')

        let checkbox = document.createElement('input')                      // Create checkbox button
        checkbox.type = 'checkbox'
        checkbox.name = `checkbox-${taskID}`
        checkbox.id = `checkbox-${taskID}`
        checkbox.className = 'checkbox'
        checkbox.onclick = function(){changeStatus(this)}

        let titleContentDiv = document.createElement('div')
        titleContentDiv.classList.add('title-content')

        let titleInput = document.createElement('input')                    // Create Input Field
        titleInput.type = 'text'
        titleInput.className = 'hidden'
        titleInput.id = 'task-title'
        titleInput.value = taskTitle

        let h3Title = document.createElement('h3')                          // Create Task header
        h3Title.className = 'title-text'
        h3Title.innerText = taskTitle

        let taskToggleBtn = document.createElement('button')                // Create Description Toggle Button
        taskToggleBtn.classList.add('status', 'task-toggle')
        taskToggleBtn.onclick = function(){toggleDescription(this)}
        taskToggleBtn.innerHTML = `<i class="fas fa-chevron-down"></i>`

        let editBtn = document.createElement('button')                      // Create Task Edit Button
        editBtn.classList.add('status', 'edit-button', 'd-flex')
        editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`
        editBtn.onclick = function(){enableEdit(this)}

        let deleteBtn = document.createElement('button')                    // Create Task Delete Button
        deleteBtn.classList.add('status', 'delete-button', 'd-flex')
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
        deleteBtn.onclick = function(){deleteTask(this)}

        let descriptionDiv = document.createElement('div')
        descriptionDiv.classList.add('description-container')

        let descriptionInput = document.createElement('textarea')                    // Create Input Field
        descriptionInput.className = 'hidden'
        descriptionInput.id = 'description-input'
        descriptionInput.value = taskDescription

        let descriptionPara = document.createElement('p')
        descriptionPara.className = 'description-text'
        descriptionPara.innerHTML = taskDescription

        descriptionDiv.append(descriptionInput,descriptionPara)

        titleContentDiv.append(titleInput, h3Title)                         // Append titleInput and h3Title to titleContentDiv
    
        titleContainerDiv.append(checkbox,titleContentDiv,taskToggleBtn,editBtn,deleteBtn)

        newTaskDiv.append(hrline,titleContainerDiv,descriptionDiv)         // Append all created objects inside newtask div

        Tasks.append(newTaskDiv)

        taskNo += 1;                                                        // Increment task number.

        Title.value = ''
        Description.value = ''
    }

}


function deleteTask(el){
    var taskId = el.parentNode.parentNode.id
    Tasks.removeChild(document.getElementById(taskId))
}


function changeStatus(el){
    el.parentNode.parentNode.classList.toggle('task-complete')
}

function enableEdit(el){

    var titleContainer = document.querySelectorAll('.title-content')
    var decsContainer = document.querySelectorAll('.description-container')

    titleContainer.forEach(x => {
        if(!x.children[0].classList.contains('hidden') && x.parentNode != el.parentNode){
            x.children[0].classList.add('hidden')
            x.children[1].classList.remove('hidden')
        }
    })


    decsContainer.forEach(desc =>{
        if(!desc.children[0].classList.contains('hidden') && el.parentNode.nextElementSibling != desc){
            desc.children[0].classList.add('hidden')
            desc.children[1].classList.remove('hidden')
        }
    })

    let titleInput = el.parentNode.children[1].children[0]
    titleText = el.parentNode.children[1].children[1]

    if(titleInput.classList.contains('hidden')){
        titleInput.classList.remove('hidden')
        titleText.classList.add('hidden')
    }
    else{
        titleText.innerHTML = titleInput.value
        titleInput.classList.add('hidden')
        titleText.classList.remove('hidden')
    }

    let descInput = el.parentNode.nextElementSibling.children[0]
    let descText = el.parentNode.nextElementSibling.children[1]

    if(descInput.classList.contains('hidden')){
        descInput.classList.remove('hidden')
        descText.classList.add('hidden')
    }
    else{
        descText.innerHTML = descInput.value
        descInput.classList.add('hidden')
        descText.classList.remove('hidden')
    }

    
    el.parentNode.parentNode.classList.add('active')
}