let btnAdd = document.querySelector(".btn_add");
let inputTodo = document.querySelector("input[name='inputTodo']");
let listTodo = document.querySelector(".todos_list");

let countIdTodo;

const todoApp = {

    start(){
        
        if(localStorage.getItem("todoApp") !== null){

            let todoAppData = JSON.parse(localStorage.getItem("todoApp"));

            countIdTodo = todoAppData.countIdTodo;

            todoAppData.tasks.forEach(task => {
                this.createElementLI(task.id, task.title, task.status);
            });

        }else{
            countIdTodo = 0;
        }

    },

    create(){

        // Pegando valor do Input
        let taskName = inputTodo.value;
    
        if(taskName === ""){
            alert("Por favor digite o nome de uma tarefa.");
            return
        }
    
        // incrementa o novo ID
        countIdTodo++;
    
        // Adiciona a nova task na lista
        this.createElementLI(countIdTodo, taskName, 0);
        this.setTaskStorage(countIdTodo, taskName);
    
        // Limpa o input
        this.clearInput();
    },

    setTaskStorage(id, taskName){

        if(localStorage.getItem("todoApp") !== null){

            let todoAppData = JSON.parse(localStorage.getItem("todoApp"));

            let taskData = {
                id,
                title: taskName,
                status: 0
            }
            todoAppData.countIdTodo = countIdTodo;
            todoAppData.tasks.push(taskData);

            let todoAppUpdate = JSON.stringify(todoAppData);

            localStorage.setItem("todoApp", todoAppUpdate);

            console.log("olá entrou no true");

        } else{
            let todoAppData = {
                countIdTodo: countIdTodo,
                tasks: [{
                    id,
                    title: taskName,
                    status: 0
                }]
            }

            let todoAppDataStringfy = JSON.stringify(todoAppData);

            localStorage.setItem("todoApp", todoAppDataStringfy);

            console.log("olá entrou no else");

        }
    },
    

    // Metodo Delete ToDo
    delete(idTodo){

        let confirmDel = confirm("Deseja realmente deletar essa tarefa?");

        if(confirmDel){
            let todoAppData = JSON.parse(localStorage.getItem("todoApp"));

            let idFindArr = todoAppData.tasks.map((task) => {
                return task.id
            }).indexOf(idTodo);
    
            todoAppData.tasks.splice(idFindArr, 1);
    
            let todoAppDataStringfy = JSON.stringify({
                ...todoAppData
            });
    
            localStorage.setItem("todoApp", todoAppDataStringfy);
    
            let itemTodo = document.querySelector(`main .todos_list li[todo-id="${idTodo}"]`);
            itemTodo.remove();
        }
        
    },
    
    //Metodo Complete ToDo
    completed(idTodo){

        let todoAppData = JSON.parse(localStorage.getItem("todoApp"));

        todoAppData.tasks.map((task) => {
            if(task.id === idTodo){
                if(task.status === 0){
                    task.status = 1;
                }else{
                    task.status = 0;
                }
            }
        })

        let todoAppDataStringfy = JSON.stringify({
            ...todoAppData
        });

        localStorage.setItem("todoApp", todoAppDataStringfy);

        let itemTodo = document.querySelector(`main .todos_list li[todo-id="${idTodo}"]`);
        itemTodo.classList.toggle("complete");
    },
    
    // Metodo create LI ToDo
    createElementLI(id, taskName, status){
        listTodo.innerHTML += `
        <li todo-id="${id}" class="item_todo ${status == 1 ? "complete" : ""}">
            <span class="title_task">${taskName}</span>
            <div class="actions">
                <button class="btn btn-success btn-sm mr-1" onclick="todoApp.completed(${id})">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="todoApp.delete(${id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </li>`;
    },
    
    
    // Events Elements
    pressEnter(event){
        if(event.key === 'Enter' || event.keyCode ===13){
            this.create();
        }
    },
    
    clearInput(){
        inputTodo.value = "";
    }
}


todoApp.start();