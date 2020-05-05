const cartButton = document.querySelector('#cart-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');

cartButton.addEventListener('click', toggleModal);
close.addEventListener('click', toggleModal);

function toggleModal() {
    modal.classList.toggle('is-open');
}

// auth
const modalAuth = document.querySelector('.modal-auth');
const modalAuthButton = document.querySelector('.button-auth');
const modalAuthClose = document.querySelector('.close-auth');
const logoutButton = document.querySelector('#logout-button');
const logInForm = document.getElementById('logInForm');

modalAuthButton.addEventListener('click', toggleAuthModal);
modalAuthClose.addEventListener('click', toggleAuthModal);

function toggleAuthModal() {
    modalAuth.classList.toggle('is-open');
}

logInForm.addEventListener('submit', handleLogin);

function handleLogin(ev) {
    ev.preventDefault();
    const data = new FormData(ev.target);
    // dataObj = {login: value, password: value}
    const dataObj = Object.fromEntries(data.entries());

    const login = document.getElementById('login');
    const password = document.getElementById('password');
    login.style.borderColor = 'inherit';
    password.style.borderColor = 'inherit';

    if (dataObj.login === '') {
        login.style.borderColor = 'red';
    }
    if (dataObj.password === '') {
        password.style.borderColor = 'red';
    }
    const isFieldValid = dataObj.login && dataObj.password;
    if (!isFieldValid) {
        alert('Заполните все поля');
    }
    if (isFieldValid) {
        clearLoginForm();
        toggleAuthModal();
        logoutButton.classList.remove('button-out');
        cartButton.style.display = 'flex';
        modalAuthButton.classList.add('button-out');
    }
}

function clearLoginForm() {
    const login = document.getElementById('login');
    const password = document.getElementById('password');
    login.value = '';
    password.value = '';
}

// auth end
