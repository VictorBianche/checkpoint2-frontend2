let token = localStorage.getItem('jwt')
const nomeUsuario = document.getElementById('nomeUsuario')
const apiUrl = 'https://ctd-fe2-todo-v2.herokuapp.com/v1'
const createTaskButtonElement = document.querySelector('#createTaskButton')
const skeletonElement = document.querySelector('#skeleton')
const pendingTasks = document.querySelector('.tarefas-pendentes')
const concludedTasks = document.querySelector('.tarefas-terminadas')
const finishSession = document.querySelector('#closeApp')
const headersAuthRequest = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token
}

function getUserInfo() {

    fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/users/getMe', { headers: headersAuthRequest }).then(
        response => {
            if(response.ok) {
                response.json().then(
                    user => {
                        nomeUsuario.innerHTML = user.firstName;
                    }
                )
            } else {
                localStorage.clear()
                window.location.href = './../index.html'
            }
        }
    )
}

// Função que Obtem as Tarefas
function getTasks() {

    fetch(`${apiUrl}/tasks`, { headers: headersAuthRequest }).then(

        response => {

            response.json().then(

                tasks => {

                    // Remoção dos itens que estavam antes dentro da Lista inicial
                    pendingTasks.innerHTML = ''
                    concludedTasks.innerHTML = ''
                    
                    for(let task of tasks) {
                        const dataFormatada = new Date(task.createdAt).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: 'numeric',
                              minute: 'numeric',
                            }
                          );
                        if(task.completed) {
                          concludedTasks.innerHTML += `
                            <li class="tarefa">
                              <div onclick="updateTask(${task.id}, false)" class="not-done"></div>
                              <div class="descricao">
                              <p class="nome">${task.description}</p>
                              <p class="timestamp">Criada em: ${dataFormatada}</p>
                              <div class="close" onclick="deleteTask(${task.id})">X</div>
                              </div>
                            </li>
                          `;
                        }else{
                          pendingTasks.innerHTML += `
                            <li class="tarefa">
                              <div onclick="updateTask(${task.id},true)" class="not-done"></div>
                              <div class="descricao">
                              <p class="nome">${task.description}</p>
                              <p class="timestamp">Criada em: ${dataFormatada}</p>
                              <div class="close" onclick="deleteTask(${task.id})">X</div>
                              </div>
                            </li>
                          `;
                        }
                    }

                }

            )

        }

    )

}

// Função que Cria uma Task
function createTask() {

    // Objeto que será enviado para a API
    let data = {
        description: document.querySelector("#novaTarefa").value,
        completed: false
    }

    // Objeto que servira como Configuração da Requisição de POST
    let postRequestConfiguration = {
        method: 'POST',
        headers: headersAuthRequest,
        body: JSON.stringify(data)
    }

    fetch(`${apiUrl}/tasks`, postRequestConfiguration).then(

        response => {

            if(response.ok) {
                response.json().then(
                    task => {
                        const dataFormatada = new Date(task.createdAt).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: 'numeric',
                              minute: 'numeric',
                            }
                          );
                        pendingTasks.innerHTML += `
                        <li class="tarefa">
                          <div onclick="updateTask(${task.id},true)" class="tarefas-terminadas">${task.id}</div>
                          <div class="descricao">
                          <p class="nome">${task.description}</p>
                          <p class="timestamp">Criada em: ${dataFormatada}</p>
                          <div class="close" onclick="deleteTask(${task.id})">X</div>
                          </div>
                        </li>
                        `;
                    }
                )
                .then(
                  getTasks()
                )  
            }

        }

    )

}

function deleteTask(id) {
    let configuracaoRequisicao = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    };

    fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${id}`, configuracaoRequisicao)
      .then((response) => response.json())

      .then(() => { 
            getTasks()
      })

      .catch((err) => {
          console.log(err);
    });
  
}

function updateTask(id, completedStatus) {
    let updateHeader = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({completed: completedStatus}),
      };
      fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${id}`, updateHeader)
      .then((response) => response.json())

      .then(() => {
        getTasks()
      })

      .catch((err) => {
          console.log(err);
    });
  
}

// Event Listener do Botão para criar Task
createTaskButtonElement.addEventListener('click', event => {

    event.preventDefault()

    // Chama a função que Cria uma Tarefa
    createTask()

})

// Verificação se o Token Existe
if(token === null) {

    // Caso o Token não Exista ele redireciona para o Index
    //window.location.href = './../index.html'

} else {

    // Chama a função que obtem os Dados do Usuários
    getUserInfo()


    // Chama a função que obtem as Tarefas
    getTasks()

}

finishSession.addEventListener('click', () => {
  window.location.href = './../index.html'
  localStorage.clear();
});