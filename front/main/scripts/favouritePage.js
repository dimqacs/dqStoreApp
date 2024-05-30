document.addEventListener(`DOMContentLoaded`, () => {
    const favProducts = document.querySelector(`.favourite-products`);

    const products = JSON.parse(localStorage.getItem(`favourite`)) || [];

    if (products) {

        if (favProducts.querySelector(`#empty`)) {
            favProducts.removeChild(favProducts.querySelector(`#empty`));
        }

        products.forEach(product => {

            const div = document.createElement(`div`);
            div.setAttribute(`class`, `product`);

            const image = document.createElement(`img`);
            image.setAttribute(`src`, `https://raw.githubusercontent.com/dimqacs/dqStorePhotoResources/master/resources/${product.id}/0.webp`);

            image.addEventListener(`click`, async () => {
                const element = await fetch(`http://localhost:3000/getProductById/${product.id}`)
                    .then(response => response.json())
                    .catch(error => {
                        console.error('Error fetching the data:', error);
                    });

                localStorage.setItem(`product`, JSON.stringify(element[0]));
                window.location.href = `product.html`;
            });

            const lower = document.createElement(`div`);
            lower.classList.add(`lower`);

            const top = document.createElement(`div`);
            top.classList.add(`top`);

            const name = document.createElement(`h6`);
            name.textContent = product.name;

            const price = document.createElement(`h6`);
            price.textContent = `$ ${product.price}`;

            top.insertAdjacentElement(`beforeend`, name);
            top.insertAdjacentElement(`beforeend`, price);

            const span = document.createElement(`span`);
            span.textContent = product.description;

            const button = document.createElement(`button`);
            button.textContent = `Remove`;

            button.addEventListener(`click`, () => {
                favProducts.removeChild(div);
                let array = products.filter(item => item !== product);
                localStorage.setItem(`favourite`, JSON.stringify(array));
                countFavouriteProducts(favProducts);
            })

            lower.insertAdjacentElement(`beforeend`, image);
            lower.insertAdjacentElement(`beforeend`, top);
            lower.insertAdjacentElement(`beforeend`, span);
            lower.insertAdjacentElement(`beforeend`, button);

            div.insertAdjacentElement(`beforeend`, image);
            div.insertAdjacentElement(`beforeend`, lower);

            favProducts.insertAdjacentElement(`beforeend`, div);
        })
    }
    countFavouriteProducts(favProducts);

    createAlsoProducts();
})


function countFavouriteProducts(div) {
    if (div && div.children.length === 0) {
        const h1 = document.createElement(`h1`);
        h1.setAttribute(`id`, `empty`);
        h1.textContent = `Items added to your Favorites will be saved here.`;
        div.insertAdjacentElement(`beforeend`, h1);
    }
}

let divs = [];
let divInfo = [];
let position = 2;

function setAlsoLikedProducts(products) {
    const count = 6;
    const parent = document.querySelector(`.also .products`);

    for (let i = 0; i < count; i++) {
        const product = products[i];
        let div = document.createElement(`div`);
        div.setAttribute(`class`, `product`);

        let image = document.createElement(`img`);
        image.setAttribute(`src`, `https://raw.githubusercontent.com/dimqacs/dqStorePhotoResources/master/resources/${product.Id}/0.webp`)

        let h6 = document.createElement(`h6`);
        h6.textContent = product.Name;

        let span = document.createElement(`span`);
        span.textContent = product.ShortDescription;

        let h61 = document.createElement(`h6`);
        h61.textContent = `$ ${product.Price}`;

        div.insertAdjacentElement(`beforeend`, image);
        div.insertAdjacentElement(`beforeend`, h6);
        div.insertAdjacentElement(`beforeend`, span);
        div.insertAdjacentElement(`beforeend`, h61);
        divs.push(div);
    }

    divs.forEach((div, index) => {
        div.addEventListener(`click`, () => {
            localStorage.setItem(`product`, JSON.stringify(products[index + position - 2]));
            window.location.href = `product.html`;
        })
    })

    for (let i = 0; i < 6; i++) {
        let element = {
            "src": divs[i].querySelector(`img`).getAttribute(`src`),
            "title": divs[i].querySelector(`h6`).textContent,
            "span": divs[i].querySelector(`span`).textContent,
            "price": divs[i].querySelector(`h6:last-of-type`).textContent
        }
        divInfo.push(element);
    }

    for (let i = 0; i < 3; i++) {
        parent.insertAdjacentElement(`beforeend`, divs[i]);
    }
    const buttons = document.querySelectorAll(`.also-header .buttons button`);
    setButtonsisteners(buttons);
}

function setButtonsisteners(buttons) {
    buttons[0].classList.add(`finish`);

    buttons[0].addEventListener(`click`, () => {
        if (!buttons[0].classList.contains(`finish`)) {
            position--;
            if (position == 2)
                buttons[0].setAttribute(`class`, `finish`);
            else
                buttons[1].classList.remove(`finish`);
            moveSlides();
        }
    })

    buttons[1].addEventListener(`click`, () => {
        if (!buttons[1].classList.contains(`finish`)) {
            position++;
            if (position == 5)
                buttons[1].setAttribute(`class`, `finish`);
            else
                buttons[0].classList.remove(`finish`);
            moveSlides();
        }
    })
}

function moveSlides() {
    let j = position - 2;
    let slides = document.querySelectorAll(`.also .products div`);
    for (let i = 0; i < 3; i++) {
        slides[i].querySelector(`img`).setAttribute(`src`, divInfo[j].src);
        slides[i].querySelector(`h6`).textContent = divInfo[j].title;
        slides[i].querySelector(`span`).textContent = divInfo[j].span;
        slides[i].querySelector(`h6:last-of-type`).textContent = divInfo[j].price;
        j++;
    }
}

async function createAlsoProducts() {
    const allProducts = await (await fetch(`http://localhost:3000/getAllProducts`)).json();

    setAlsoLikedProducts(allProducts);

    if (mobileVersionHomePage())
        changeHomePageForMobile(allProducts);
    window.addEventListener('resize', () => {
        if (mobileVersionHomePage())
            changeHomePageForMobile(allProducts);
    });
}

function mobileVersionHomePage() {
    return document.querySelector(`footer`).clientWidth <= 430;
}

function changeHomePageForMobile(products) {
    const parent = document.querySelector(`.also .products`);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    divs.forEach((div, index) => {
        parent.insertAdjacentHTML('beforeend', div.outerHTML);

        const insertedDiv = parent.lastElementChild;

        insertedDiv.addEventListener('click', () => {
            localStorage.setItem('product', JSON.stringify(products[index]));
            window.location.href = 'product.html';
        });
    });
}