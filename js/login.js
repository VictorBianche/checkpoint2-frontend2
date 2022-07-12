const loginBaseUrl = 'https://ctd-todo-api.herokuapp.com/v1/users/login';
const loginBtn =  document.querySelector("#accessButton");
const userInfo = document.querySelectorAll('input');

loginBtn.addEventListener('click', event => {

    event.preventDefault()

    loginUser()

})

for(input of userInfo) {
    input.addEventListener('keyup', event => {
        const inputValue = input.value
        const inputID = input.id

        info[inputID] = inputValue

        console.log(userInfo);
    })
}

var info = {
    email: '',
    password: ''
}

let loginRequestPostConfig = {
    method: 'POST',
    Headers: {
        'Content-Type': 'application/json',    
    }
}

function loginUser() {
    requestPostConfig.body = JSON.stringify(info);

        fetch(loginBaseUrl,loginRequestPostConfig).then(
            response => {
                console.log(response);
            }
        )
}