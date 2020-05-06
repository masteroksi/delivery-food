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

// cards
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.queryCommandEnabled('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

function createCardsRestaurants(restoranItem) {
    const card = `<a href="${restoranItem.url}" class="card card-restaurant">
						<img src="img/pizza-plus/preview.jpg" alt="image" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">Пицца плюс </h3>
								<span class="card-tag tag">50 мин </span>
							</div>
							<div class="card-info">
								<div class="rating">
									4.5 
								</div>
								<div class="price">От 900 ₽ </div>
								<div class="category">Пицца </div>
							</div>
						</div>
						</a>
`;

    cardsRestaurants.insertAdjacentHTML('afterbegin', card);
}



function createCardGood() {
    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', `
					<div class="card">
						<img src="img/pizza-plus/pizza-girls.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Девичник</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">Соус томатный, постное тесто, нежирный сыр, кукуруза, лук, маслины,
									грибы, помидоры, болгарский перец.
								</div>
							</div>
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">450 ₽</strong>
							</div>
						</div>
					</div>
        `);
    cardsMenu.insertAdjacentElement('beforeend', card);

}

function openGoods(event) {
    const target = event.target;
    // const restaurant = target.parentElement;
    const restaurant = target.closest('.cards-restaurants');

    if (restaurant) {
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');

        cardsMenu.textContent = '';

        createCardGood();
        createCardGood();
        createCardGood();
        createCardGood();

    }


}

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function () {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
});




// cards end
