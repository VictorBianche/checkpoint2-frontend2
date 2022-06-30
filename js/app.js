let baseUrl = 'https://ctd-todo-api.herokuapp.com/v1/users';
let user = {
    firstName: document.querySelector('#name'),
    lastName: document.querySelector('#surname'),
    email: document.querySelector('#email'),
    password: document.querySelector('password'),
}
let requestPostConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
}


function userRegister() {
    fetch(baseUrl, requestPostConfig).then(
        response => {
            if (!response.ok) {
                alert("Requisição falhou!");
                return
            }
            if (response.status === 404) {
                alert('não encontrou qualquer resultado')
                return 
            }
            return response.json()
        }
    );
}

