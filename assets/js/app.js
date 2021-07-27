const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");

const expresiones = {
	user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/ // 7 a 14 numeros.
}

const camps = {
    user: false,
    name: false,
    password: false,
    email: false,
    phone: false
}

const validateForm = (e) =>{
    switch (e.target.name){
        case "user":
            validateCamp(expresiones.user, e.target, "user");
        break;

        case "name":
            validateCamp(expresiones.name, e.target, "name");
        break;

        case "password":
            validateCamp(expresiones.password, e.target, "password");
            validatePassword2();
        break;

        case "password2":
            validatePassword2();
        break;

        case "email":
            validateCamp(expresiones.email, e.target, "email");
        break;

        case "phone":
            validateCamp(expresiones.phone, e.target, "phone");
        break;
    }
}

const validateCamp = (expresiones, input, campo) =>{
    if(expresiones.test(input.value)){
        document.getElementById(`group-${campo}`).classList.remove("form__group-denied");
        document.getElementById(`group-${campo}`).classList.add("form__group-ok");
        document.querySelector(`#group-${campo} .form__validate-state`).classList.add("uil-check-circle");
        document.querySelector(`#group-${campo} .form__validate-state`).classList.remove("uil-times-circle");
        document.querySelector(`#group-${campo} .form__input-error`).classList.remove("form__input-error-active")
        camps[campo] = true;

    } else {
        document.getElementById(`group-${campo}`).classList.add("form__group-denied");
        document.getElementById(`group-${campo}`).classList.remove("form__group-ok");
        document.querySelector(`#group-${campo} .form__validate-state`).classList.add("uil-times-circle");
        document.querySelector(`#group-${campo} .form__validate-state`).classList.remove("uil-check-circle");
        document.querySelector(`#group-${campo} .form__input-error`).classList.add("form__input-error-active");
        camps[campo] = false;
    }

}

const validatePassword2 = () =>{
    const inputPassword1 = document.getElementById("password");
    const inputPassword2 = document.getElementById("password2");

    if(inputPassword1.value !== inputPassword2.value){
        document.getElementById("group-password2").classList.add("form__group-denied");
        document.getElementById("group-password2").classList.remove("form__group-ok");
        document.querySelector("#group-password2 .form__validate-state").classList.add("uil-times-circle");
        document.querySelector("#group-password2 .form__validate-state").classList.remove("uil-check-circle");
        document.querySelector("#group-password2 .form__input-error").classList.add("form__input-error-active");
        camps['password'] = false;
    } else {
        document.getElementById("group-password2").classList.remove("form__group-denied");
        document.getElementById('group-password2').classList.add("form__group-ok");
        document.querySelector("#group-password2 .form__validate-state").classList.remove("uil-times-circle");
        document.querySelector("#group-password2 .form__validate-state").classList.add("uil-check-circle");
        document.querySelector("#group-password2 .form__input-error").classList.remove("form__input-error-active");
        camps['password'] = true;
    }
}

inputs.forEach((input)=>{
    input.addEventListener("keyup", validateForm);
    input.addEventListener("blur", validateForm);
})

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    const terms = document.getElementById("terms");
    if(camps.user && camps.name && camps.password && camps.email && camps.phone && terms.checked){
        form.reset();

        document.getElementById("form__messege-succes").classList.add("form__messege-succes-active");
        setTimeout(() => {
            document.getElementById("form__messege-succes").classList.remove("form__messege-succes-active");
        }, 3000);

        document.querySelectorAll(".form__group-ok").forEach((icon)=>{
            icon.classList.remove("form__group-ok");
        })

    } else {
        document.getElementById("form-message").classList.add("form__message-active");
        setTimeout(() => {
            document.getElementById("form-message").classList.remove("form__message-active");
        }, 3000);
    }

});

