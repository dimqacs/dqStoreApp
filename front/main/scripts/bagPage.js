document.addEventListener(`DOMContentLoaded`, () => {
    const products = JSON.parse(localStorage.getItem(`cart`));
    const cart = document.querySelector(`.cart`);

    if (products) {

        if (cart.querySelector(`#empty`)) {
            cart.removeChild(cart.querySelector(`#empty`));
        }

        products.forEach(product => {
            const div = document.createElement(`div`);
            div.classList.add(`product`);

            const info = document.createElement(`div`);
            info.classList.add(`bag-product-info`)

            const details = document.createElement(`div`);
            details.classList.add(`details`);

            const img = document.createElement(`img`);
            img.setAttribute(`src`, product.src);
            details.insertAdjacentElement(`beforeend`, img);

            img.addEventListener(`click`, async () => {
                const element = await fetch(`http://localhost:3000/getProductById/${product.id}`)
                    .then(response => response.json())
                    .catch(error => {
                        console.error('Error fetching the data:', error);
                    });

                localStorage.setItem(`product`, JSON.stringify(element[0]));
                window.location.href = `product.html`;
            });

            const settings = document.createElement(`div`);
            settings.classList.add(`settings`);

            const span = document.createElement(`span`);
            span.textContent = product.name;
            settings.insertAdjacentElement(`beforeend`, span);

            const span1 = document.createElement(`span`);
            span1.textContent = `${product.description} ${product.fit}`;
            settings.insertAdjacentElement(`beforeend`, span1);

            const span2 = document.createElement(`span`);
            span2.textContent = product.color;
            settings.insertAdjacentElement(`beforeend`, span2);

            const options = document.createElement(`div`);
            options.classList.add(`options`);

            const label = document.createElement(`label`);
            label.setAttribute(`for`, `sizeSelect`);
            label.textContent = `Size`;
            options.insertAdjacentElement(`beforeend`, label);

            const select = document.createElement(`select`);
            select.setAttribute(`id`, `sizeSelect`);

            product.sizes.forEach(productSize => {
                const option = document.createElement(`option`);
                option.textContent = productSize;
                option.setAttribute(`value`, productSize);
                if (option.textContent == product.size)
                    option.setAttribute(`selected`, true);
                select.insertAdjacentElement(`beforeend`, option);
            });

            options.insertAdjacentElement(`beforeend`, select);

            const label1 = document.createElement(`label`);
            label1.setAttribute(`for`, `quantity`);
            label1.textContent = `Quantity`;
            options.insertAdjacentElement(`beforeend`, label1);

            const select1 = document.createElement(`select`);
            select1.setAttribute(`id`, `quantity`);

            select1.addEventListener(`change`, (e) => {
                product.quantity = e.target.value;
                localStorage.setItem(`cart`, JSON.stringify(products));
                setCheckout(cart.querySelectorAll(`div.product`));
            })

            for (let i = 1; i <= 10; i++) {
                const option = document.createElement(`option`);
                option.textContent = i;
                option.setAttribute(`value`, i);
                if (i == product.quantity)
                    option.setAttribute(`selected`, true);
                select1.insertAdjacentElement(`beforeend`, option);
            }

            options.insertAdjacentElement(`beforeend`, select1);

            settings.insertAdjacentElement(`beforeend`, options);

            const buttons = document.createElement(`div`);
            buttons.classList.add(`cart-buttons`);

            const button = document.createElement(`button`);
            const bimg = document.createElement(`img`);
            bimg.setAttribute(`src`, `../resources/images/heart.png`);

            bimg.addEventListener(`click`, () => {
                let products = JSON.parse(localStorage.getItem('favourite')) || [];

                let flag = false;
                products.forEach(item => {
                    if (item.id === product.id) {
                        alert(`Product already in favourites`);
                        flag = true;
                    }
                });

                if (!flag) {
                    products.push(product);
                    localStorage.setItem(`favourite`, JSON.stringify(products));
                    alert(`Product was successfully added to Favourite Products`);
                }
            });
            button.insertAdjacentElement(`beforeend`, bimg);
            buttons.insertAdjacentElement(`beforeend`, button);

            const button1 = document.createElement(`button`);
            const bimg1 = document.createElement(`img`);
            bimg1.setAttribute(`src`, `../resources/images/bin.png`);
            button1.insertAdjacentElement(`beforeend`, bimg1);
            button1.addEventListener(`click`, () => {
                cart.removeChild(div);
                let array = products.filter(item => item !== product);
                localStorage.setItem(`cart`, JSON.stringify(array));
                setCheckout(cart.querySelectorAll(`div.product`));
                countBagProducts(cart);
            });
            buttons.insertAdjacentElement(`beforeend`, button1);

            settings.insertAdjacentElement(`beforeend`, buttons);
            details.insertAdjacentElement(`beforeend`, settings);

            const price = document.createElement(`span`);
            price.textContent = `$ ${product.price}`;
            details.insertAdjacentElement(`beforeend`, price);

            info.insertAdjacentElement(`beforeend`, details)

            const shipping = document.createElement(`div`);
            shipping.classList.add(`shipping`);

            const sspan = document.createElement(`span`);
            sspan.textContent = `Shipping`;
            shipping.insertAdjacentElement(`beforeend`, sspan);

            const sspan1 = document.createElement(`span`);
            sspan1.innerHTML = `Arrives by ${getShippingDate()} <a href="working.html">Edit Location</a>`;
            shipping.insertAdjacentElement(`beforeend`, sspan1);

            info.insertAdjacentElement(`beforeend`, shipping);

            const pick = document.createElement(`div`);
            pick.classList.add(`pickUP`);

            const pickUp = document.createElement(`span`);
            pickUp.textContent = `Free Pickup`;
            pick.insertAdjacentElement(`beforeend`, pickUp);

            const findStore = document.createElement(`a`);
            findStore.setAttribute(`href`, `findStore.html`);
            findStore.textContent = `Find a Store`;
            pick.insertAdjacentElement(`beforeend`, findStore);

            info.insertAdjacentElement(`beforeend`, pick);

            const hr = document.createElement(`hr`);
            info.insertAdjacentElement(`beforeend`, hr);

            div.insertAdjacentElement(`beforeend`, info);

            cart.insertAdjacentElement(`beforeend`, div);
        })

        setCheckout(cart.querySelectorAll(`div.product`));
    }
    countBagProducts(cart);
    createAlsoProducts();
})

function getShippingDate() {
    const currentDate = new Date();

    let string = `holiday`;

    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    };

    const holidays = [
        { name: `Anul Nou`, date: new Date(currentDate.getFullYear(), 0, 1) },
        { name: `Ziua de Crăciun ortodoxă`, date: new Date(currentDate.getFullYear(), 0, 7) },
        { name: `Sărbătoarea ortodoxă de Crăciun`, date: new Date(currentDate.getFullYear(), 0, 8) },
        { name: `Mărţişorul`, date: new Date(currentDate.getFullYear(), 2, 1) },
        { name: `Ziua internaţională a femeii`, date: new Date(currentDate.getFullYear(), 2, 8) },
        { name: `Ziua internaţională a solidarităţii oamenilor muncii`, date: new Date(currentDate.getFullYear(), 4, 1) },
        { name: `Paștele Ortodox`, date: new Date(currentDate.getFullYear(), 4, 1) },
        { name: `Ziua Victoriei şi a comemorării eroilor căzuţi pentru Independenţa Patriei`, date: new Date(currentDate.getFullYear(), 4, 9) },
        { name: `Ziua ocrotirii copilului`, date: new Date(currentDate.getFullYear(), 5, 1) },
        { name: `Ziua Independenţei`, date: new Date(currentDate.getFullYear(), 7, 27) },
        { name: `Crăciunul`, date: new Date(currentDate.getFullYear(), 11, 25) },
        { name: `Crăciunul`, date: new Date(currentDate.getFullYear(), 2, 18) },
        { name: `Revelion`, date: new Date(currentDate.getFullYear(), 11, 31) }
    ];

    let date = new Date();

    if (checkIfCanDeliver(date)) {
        if (date.getHours() < 12 || (date.getHours() === 12 && date.getMinutes() === 0))
            return date.toLocaleDateString('en-US', options);
        else {
            date.setDate(date.getDate() + 1);
            date = closestAvaibleDate(date);
            return date.toLocaleDateString('en-US', options);
        }
    } else {
        let day = string;
        date = closestAvaibleDate(date);
        if (day == `weekend`)
            return date.toLocaleDateString('en-US', options);
        else
            return date.toLocaleDateString('en-US', options);
    }

    function checkIfCanDeliver(date) {
        for (let i = 0; i < holidays.length; i++) {
            if (date.toLocaleDateString() === holidays[i].date.toLocaleDateString()) {
                index = i;
                return false;
            }
        }

        if (date.getDay() == 0 || date.getDay() == 6) {
            string = `weekend`;
            return false;
        }

        return true;
    }

    function closestAvaibleDate(date) {
        while (!checkIfCanDeliver(date)) {
            date.setDate(date.getDate() + 1);
        }
        return date;
    }
}

function countBagProducts(div) {
    if (div && div.children.length === 1) {
        const h1 = document.createElement(`h1`);
        h1.setAttribute(`id`, `empty`);
        h1.textContent = `Items added to your Bag will be saved here.`;
        div.insertAdjacentElement(`beforeend`, h1);
    }
}

const promocodeImg = document.querySelector('.promocode img');
const div = document.querySelector('.uncover');

promocodeImg.addEventListener('click', () => {
    if (div.classList.contains('hide')) {
        div.classList.remove('hide');
        div.classList.add('show');
        promocodeImg.classList.add('rotate');
    } else {
        div.classList.remove('show');
        div.classList.add('hide');
        promocodeImg.classList.remove('rotate');
    }
});

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

        div.addEventListener(`click`, () => {
            localStorage.setItem(`product`, JSON.stringify(products[i + position - 2]));
            window.location.href = `product.html`;
        })

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
        console.log(divs[1])
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

function setCheckout(divs) {
    const summary = document.querySelector(`.checkout`);
    const subtotal = summary.querySelector(`.subtotal`);
    const delivery = summary.querySelector(`.estimated`);
    const total = summary.querySelector(`.total`);
    let price = 0;

    divs.forEach(div => {
        const itemPrice = parseFloat(div.querySelector(`.bag-product-info .details span:last-child`).textContent.slice(2));
        const quantity = parseFloat(div.querySelector(`#quantity`).value);
        price += (itemPrice * quantity);
    });

    subtotal.querySelector(`span:last-child`).textContent = `$ ${price.toFixed(2)}`;

    if (price < 100) {
        delivery.querySelector(`span:last-child`).textContent = `$ 50`;
        total.querySelector(`span:last-child`).textContent = `$ ${(50 + price).toFixed(2)}`;
    } else {
        delivery.querySelector(`span:last-child`).textContent = `Free`;
        total.querySelector(`span:last-child`).textContent = `$ ${price.toFixed(2)}`;
    }
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