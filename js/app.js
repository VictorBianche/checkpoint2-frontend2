const baseUrl = 'https://ctd-fe2-todo-v2.herokuapp.com/v1/users';
const createUserButtonElement = document.querySelector('#createUserButton')
const allInputsElements = document.querySelectorAll('input')

createUserButtonElement.addEventListener('click', event => {

    event.preventDefault()

    createUser()

})

for(let input of allInputsElements) {

    input.addEventListener('keyup', event => {

        const inputValue = input.value
        const inputId = input.id
        formData[inputId] = inputValue
    })
}

var formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

let requestPostConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

function createUser() {

    if(validate > 0) {
        return false
    }

    requestPostConfig.body = JSON.stringify(formData)

      fetch(baseUrl, requestPostConfig).then(

        response => {

            response.json().then(

                info => {

                    if(response.ok == true) {
                        alert('Parabens! Usuário criado com sucesso.')
                        window.location.href = './index.html'

                    } else {
                        if(info === 'El usuario ya se encuentra registrado') {
                            alert('O e-mail digitado ja esta cadastrado')
                            console.log(response);
                        }
                    }

                })
        }
    )
}