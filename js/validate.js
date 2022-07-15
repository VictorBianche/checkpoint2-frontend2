const senhaFormElement = document.querySelector('#password')
const senhaConfirmElement = document.querySelector('#confirmPassword')

var formValidation = {}
var validate = 0

function validation(){
    validate = 0
    for (let [key, value] of Object.entries(formValidation)){
        validate += !value
    }
}

const formControlsElements = document.querySelectorAll('.form-control');

for (let control of formControlsElements) {

    const controlInputElement = control.children[1];

    formValidation[controlInputElement.id] = false
    validation()

    controlInputElement.addEventListener('keyup', event => {
        
        let inputValid = event.target.checkValidity()
        formValidation[event.target.id] = inputValid

        if (inputValid) {
            control.classList.remove('error')
        } else {
            control.classList.add('error')
        }
        validation()
    })

}


senhaConfirmElement.addEventListener('keyup', event => {

    if (senhaFormElement.value === senhaConfirmElement.value) {
        formControlsElements[3].classList.remove('error')
    } else {
        formControlsElements[3].classList.add('error')
    }
})
