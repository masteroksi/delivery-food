const cartButton = document.querySelector('#cart-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
let login = localStorage.getItem('gloDeliver');
let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const loadCart = function () {
    if (localStorage.getitem(login + 'glo')) {
        JSON.parse(localStorage.getItem(login).forEach(function (item) {
            cart.push(item);

        }));
    }

};
const sevCart = function () {
    localStorage.setItem(login + 'glo', JSON.stringify(cart));
};

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
modalAuthClose && modalAuthClose.addEventListener('click', toggleAuthModal);

function toggleAuthModal() {
    modalAuth.classList.toggle('is-open');
}

logInForm && logInForm.addEventListener('submit', handleLogin);

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
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
const restaurantTitle = document.querySelector('.restaurant-title');
const rating = document.querySelector('.rating');
const minPrice = document.querySelector('.price');
const category = document.querySelector('.category');
const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');

const getData = async function (url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`ошибка ${url} , status{response.status! }`);
    }
    return await response.json();
};
console.log(getData('./db/partners.json'));

function createCardsRestaurants(restaurant) {
    const {
        image,
        price,
        stars,
        kitchen,
        products,
        name,
        time_of_delivery: timeOfDelivery,
    } = restaurant;

    const card = `<a href="restaurant.html" class="card card-restaurant" data-products="${products}">
						<img src="${image}" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${name}</h3>
								<span class="card-tag tag">${timeOfDelivery} мин </span>
							</div>
							<div class="card-info">
								<div class="rating">
									${stars}
								</div>
								<div class="price">От ${price} ₽</div>
								<div class="category">${kitchen}</div>
							</div>
						</div>
						</a>
`;
    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function addToCart(event) {
    const target = event.target;

    const buttonAddTuCart = target.closest('.button-add-cart');

    if (buttonAddTuCart) {
        const card = target.closest('.card');
        const title = card.querySelector('.card-title-reg').textContent;
        const cost = card.querySelector('.card-price').textContent;
        const id = buttonAddTuCart.id;

        const food = cart.find(function (item) {
            return item.id === id;
        });
        if (food) {
            food.count += 1;
        } else {
            cart.push({
                id,
                title,
                cost,
                count: 1,
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

function renderCart() {
    modalBody.textContent = '';
    modalBody.innerHTML = '';
    cart.forEach(function ({id, title, cost, count}) {
        const itemCart = `
            <div class="food-row">
					<span class="food-name">${title}</span>
					<strong class="food-price">${cost}</strong>
					<div class="food-counter">
						<button class="counter-button counter-minus" data-id="${id}">-</button>
						<span class="counter">${count}</span>
						<button class="counter-button counter-plus" data-id="${id}">+</button>
					</div>
				</div>
            `;
        modalBody.insertAdjacentHTML('afterbegin', itemCart);
    });
    const totalPrice = cart.reduce(function (result, item) {
        return result + (parseFloat(item.cost) * item.count);

    }, 0);
    modalPrice.textContent = totalPrice + '$';
}

function changeCount(event) {
    const target = event.target;
    if (target.classList.contains('counter-button')) {
        const food = cart.find(function (item) {
            return item.id === target.dataset.id;
        });
        if (target.classList.contains('counter-minus')) {
            if (--food.count < 1) {
                cart = cart.filter(item => item.id !== target.dataset.id)
            }
        }
        if (target.classList.contains('counter-plus')) food.count++;

        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}


function init() {
    getData('./db/partners.json').then(function (data) {
        data.forEach(createCardsRestaurants);
    });
    cardsRestaurants.addEventListener('click', openGoods);
    modalBody.addEventListener('click', changeCount);
    cardsMenu.addEventListener('click', addToCart);
    cartButton.addEventListener('click', function () {
        renderCart();
        toggleModal();
    });

    logo.addEventListener('click', function () {
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        menu.classList.add('hide');
    });

    function returnMain() {
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        menu.classList.add('hide');
    }

    function authorized() {

        function logaOut() {
            login = null;
            localStorage.removeItem('gloDelivery');
            buttonOut.style.display = '';
            userName.style.display = '';
            buttonOut.style.display = '';
            cartButton.style.display = '';
            buttonOut.removeEventListener('click', logaOut);
            checkAuth();
            returnMain();
        }
    };


    new Swiper('.swiper-container', {
        logo: true,
        autoplay: {
            delay: 3000,
        },
        sliderPerView: 1,
        sliderPerColumn: 1,

    });

}

init();


function createCardGood(goods) {
    const {
        description,
        id,
        image,
        name,
        price,
    } = goods;
    console.log(goods);

    const html = `
        <div class="card ${id}">
            <img src="${image}" alt="image" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <!-- /.card-heading -->
                <div class="card-info">
                    <div class="ingredients">${description}</div>
                </div>
                <!-- /.card-info -->
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart" id="${id}">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price card-price-bold">${price} ₽</strong>
                </div>
            </div>
            <!-- /.card-text -->
        </div>
    `

    cardsMenu.insertAdjacentHTML('beforeend', html);

}

function openGoods(event) {
    event.preventDefault();
    const target = event.target;
    const restaurantsCard = target.closest('.card-restaurant');

    if (restaurantsCard) {
        cardsMenu.textContent = '';
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');
        getData(`./db/${restaurantsCard.dataset.products}`).then(function (data) {
            data.forEach(createCardGood);
        });
    }


}


// cards end
