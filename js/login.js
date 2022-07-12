const loginBaseUrl = 'http://ctd-fe2-todo-v2.herokuapp.com/v1/users/login';
const loginBtn =  document.querySelector("#accessButton");
const userInfo = document.querySelectorAll('input');

loginBtn.addEventListener('click', event => {

    event.preventDefault()

    loginUser()

})

for(let input of userInfo) {
    input.addEventListener('keyup', event => {
        const inputValue = input.value
        const inputID = input.id

        info[inputID] = inputValue

        console.log(inputValue);
    })
}

var info = {
    email: '',
    password: ''
}

let loginRequestPostConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',    
    }
}

function loginUser() {
    
    loginRequestPostConfig.body = JSON.stringify(info);

        fetch(loginBaseUrl,loginRequestPostConfig).then(
            response => {
                console.log(loginRequestPostConfig);
            }
        )
}