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
        'Accept': 'aplication/json',
        'Content-Type': 'aplication/json',
    },
    body: JSON.stringify(user)
}

function userRegister() {
    fetch(baseUrl, requestConfig).then(
        success => {
            if(Response.ok) {
                alert    
            } else {   
                if(success === 'El usuario ya se encuentra registrado') {
                    alert("Usuario já registrado")
                }
            }
        }
    );
}
