//Funciones de utilidad
const showError = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
};

const hideError = (elementId) => {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//mira que alla en el medio una @ que no alla espacio y depues del @ vaya algo valido
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
};

//Validación del formulario de inicio de sesión
const validateLoginForm = (event) => {
    event.preventDefault();
    let isValid = true;

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //Validación del correo electrónico
    if (!email) {
        showError('emailError', 'El correo electrónico es requerido');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('emailError', 'Ingrese un correo electrónico válido');
        isValid = false;
    } else {
        hideError('emailError');
    }

    //Validación de la contraseña
    if (!password) {
        showError('passwordError', 'La contraseña es requerida');
        isValid = false;
    } else {
        hideError('passwordError');
    }

    if (isValid) {
        // Aquí normalmente se realiza una llamada a la API para autenticarse seria lo del xamp base de datos
        console.log('Login form is valid');
        //Redireccionamiento a la página del aula después de iniciar sesión correctamente
        window.location.href = 'classroom.html';
    }

    return isValid;
};

//Validación del formulario de registro
const validateRegisterForm = (event) => {
    event.preventDefault();
    let isValid = true;

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validación del nombre
    if (!firstname.trim()) {
        showError('firstnameError', 'El nombre es requerido');
        isValid = false;
    } else {
        hideError('firstnameError');
    }

    //Validación de apellido
    if (!lastname.trim()) {
        showError('lastnameError', 'El apellido es requerido');
        isValid = false;
    } else {
        hideError('lastnameError');
    }

    //Validación de correo electrónico
    if (!email) {
        showError('emailError', 'El correo electrónico es requerido');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('emailError', 'Ingrese un correo electrónico válido');
        isValid = false;
    } else {
        hideError('emailError');
    }

    //Validación de teléfono
    if (phone && !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
        showError('phoneError', 'Ingrese un número de teléfono válido');
        isValid = false;
    } else {
        hideError('phoneError');
    }

    //Validación de contraseña
    if (!password) {
        showError('passwordError', 'La contraseña es requerida');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError('passwordError', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial');
        isValid = false;
    } else {
        hideError('passwordError');
    }

    //Confirmar validación de contraseña
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Las contraseñas no coinciden');
        isValid = false;
    } else {
        hideError('confirmPasswordError');
    }

    if (isValid) {
        // xamp
        console.log('Register form is valid');
        // Después de un registro exitoso, se redirige a la página de inicio de sesión
        window.location.href = 'login.html';
    }

    return isValid;
};