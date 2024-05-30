document.addEventListener('DOMContentLoaded', async () => {
    const product = JSON.parse(localStorage.getItem(`product`));
    console.log(product)

    await setProductImages(product.Id);
    await setImageZoomer();

    const brands = await fetch(`http://localhost:3000/getAllBrands`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching the data:', error);
        });

    await setProductInfo(product, brands);
    await createAlsoProducts(product.Id);
    await addButtonsListeners(product, brands);

});



async function setProductImages(id) {
    const sideBarDiv = document.querySelector(`.images .side-bar`);
    const currentImageContainer = document.querySelector(`.container .image-container`);

    for (let i = 0; true; i++) {
        const imageURL = `https://raw.githubusercontent.com/dimqacs/dqStorePhotoResources/master/resources/${id}/${i}.webp`;

        if (!(await imageExists(imageURL)))
            break;

        const image = document.createElement(`img`);
        image.setAttribute(`src`, imageURL);
        if (i == 0) {
            image.classList.add(`selected-image`);
            const currentImage = currentImageContainer.querySelector(`img`);
            currentImage.setAttribute(`src`, imageURL);
            currentImageContainer.insertAdjacentElement(`afterbegin`, currentImage);
        }

        sideBarDiv.insertAdjacentElement(`beforeend`, image);
    }
}

function imageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
}

async function setImageZoomer() {
    const container = document.querySelector(".image-container");
    const cursor = document.querySelector(".cursor");

    let image = container.querySelector(`.image-container img`);

    let result = document.querySelector(".result");

    let imageRect = image.getBoundingClientRect();
    let cursorRect = cursor.getBoundingClientRect();
    let resultRect = result.getBoundingClientRect();

    cursor.style.display = `none`;
    result.style.display = `none`;

    result.style.backgroundImage = `url(${image.src})`;

    container.addEventListener(`mouseenter`, () => {
        if (window.scrollY == 0) {
            cursor.style.display = `block`;
            result.style.display = `block`;
        }
    })

    container.addEventListener(`mouseleave`, () => {
        cursor.style.display = `none`;
        result.style.display = `none`;
    })


    container.addEventListener("mousemove", (e) => {
        let { x, y } = getMousePos(e, imageRect, cursorRect);

        cursor.style.left = x + "px";
        cursor.style.top = y + "px";

        let fx = resultRect.width / cursorRect.width;
        let fy = resultRect.height / cursorRect.height;

        result.style.backgroundSize = `${imageRect.width * fx}px ${imageRect.height * fy}px`;
        result.style.backgroundPosition = `-${x * fx}px -${y * fy}px`;
    });

    const images = document.querySelector(`.side-bar`).querySelectorAll(`img`);

    images.forEach(img => {
        img.addEventListener(`click`, () => {
            for (let i = 0; i < images.length; i++) {
                let element = images[i];
                if (element.classList.contains(`selected-image`))
                    element.classList.remove(`selected-image`);
            }
            image.src = img.src;
            img.classList.add(`selected-image`);
            result.style.backgroundImage = `url(${image.src})`;
        })
    })
}

function getMousePos(e, imageRect, cursorRect) {
    let x = e.x - imageRect.left - cursorRect.width / 2;
    let y = e.y - imageRect.top - cursorRect.height / 2;

    let maxX = imageRect.width - cursorRect.width;
    let maxY = imageRect.height - cursorRect.height;

    if (x <= 0) {
        x = 0;
    } else if (x >= maxX) {
        x = maxX;
    }
    if (y <= 0) {
        y = 0;
    } else if (y >= maxY) {
        y = maxY;
    }

    return { x, y };
}

async function setProductInfo(product, brands) {
    const div = document.querySelector(`.product-info`);

    const name = document.createElement(`h1`);
    name.textContent = `${brands[product.BrandId].Name} ${product.Name}`;
    div.insertAdjacentElement(`beforeend`, name);

    const title = document.querySelector(`title`);
    title.textContent = name.textContent;

    const shortDescription = document.createElement(`span`);
    shortDescription.textContent = product.ShortDescription;
    div.insertAdjacentElement(`beforeend`, shortDescription);

    const price = document.createElement(`span`);
    price.textContent = `$ ${product.Price}`;
    price.classList.add(`headSpan`);
    price.id = `priceSpan`;
    div.insertAdjacentElement(`beforeend`, price);

    if (product.Fit && product.Fit.length > 0) {
        const span = document.createElement(`span`);
        span.textContent = `Select Fit`;
        span.classList.add(`headSpan`);
        const fit = document.createElement(`div`);
        fit.classList.add(`fit`);
        for (let i = 0; i < product.Fit.length; i++) {
            let button = document.createElement(`button`);
            button.textContent = product.Fit[i];
            if (i == 0)
                button.classList.add(`selected-fit`);
            fit.insertAdjacentElement(`beforeend`, button)
        }
        div.insertAdjacentElement(`beforeend`, span);
        div.insertAdjacentElement(`beforeend`, fit);

        fit.querySelectorAll(`button`).forEach(button => {
            button.addEventListener(`click`, () => {
                fit.querySelectorAll(`button`).forEach(btn => btn.classList.remove(`selected-fit`));
                button.classList.add(`selected-fit`);
            });
        });

    }

    const size = document.createElement(`span`);
    size.textContent = `Select Size`;
    size.classList.add(`headSpan`);
    div.insertAdjacentElement(`beforeend`, size);

    const sizeDiv = document.createElement(`div`);
    sizeDiv.classList.add(`size`);
    product.Size.forEach(size => {
        const button = document.createElement(`button`);
        button.textContent = size;
        sizeDiv.insertAdjacentElement(`beforeend`, button);
    })
    div.insertAdjacentElement(`beforeend`, sizeDiv);

    const bag = document.createElement(`button`);
    bag.textContent = `Add to Bag`;
    bag.classList.add(`bag`);
    div.insertAdjacentElement(`beforeend`, bag);

    const favourite = document.createElement(`button`);
    favourite.textContent = `Favourite`;
    favourite.classList.add(`favourite`);
    div.insertAdjacentElement(`beforeend`, favourite);

    const shipping = document.createElement(`span`);
    shipping.textContent = `Shipping`;
    shipping.classList.add(`headSpan`);
    div.insertAdjacentElement(`beforeend`, shipping);

    const shippingInfo = document.createElement(`span`);
    shippingInfo.textContent = `You’ll see our shipping options at checkout `;
    div.insertAdjacentElement(`beforeend`, shippingInfo);

    const pickUp = document.createElement(`span`);
    pickUp.textContent = `Free Pickup`;
    pickUp.classList.add(`headSpan`);
    div.insertAdjacentElement(`beforeend`, pickUp);

    const findStore = document.createElement(`a`);
    findStore.setAttribute(`href`, `findStore.html`);
    findStore.textContent = `Find a Store`;
    div.insertAdjacentElement(`beforeend`, findStore);

    const description = document.createElement(`p`);
    description.textContent = product.Description;
    div.insertAdjacentElement(`beforeend`, description);

    const hr = document.createElement(`hr`);
    div.insertAdjacentElement(`beforeend`, hr);

    const returnsDiv = document.createElement(`div`);
    returnsDiv.classList.add(`shipping`);
    const returns = document.createElement(`span`);
    returns.textContent = `Shipping & Returns`;
    const arrow = document.createElement(`img`);
    arrow.setAttribute(`src`, `../resources/images/sort.png`);
    const returnshr = document.createElement(`hr`);
    returnsDiv.insertAdjacentElement(`beforeend`, returns);
    returnsDiv.insertAdjacentElement(`beforeend`, arrow);
    div.insertAdjacentElement(`beforeend`, returnsDiv);
    div.insertAdjacentElement(`beforeend`, returnshr)

    const reviewsDiv = document.createElement(`div`);
    reviewsDiv.classList.add(`reviews`);
    const reviews = document.createElement(`span`);
    reviews.textContent = `Reviews`;
    const arrow1 = document.createElement(`img`);
    arrow1.setAttribute(`src`, `../resources/images/sort.png`);
    const reviewshr = document.createElement(`hr`);
    reviewsDiv.insertAdjacentElement(`beforeend`, reviews);
    reviewsDiv.insertAdjacentElement(`beforeend`, arrow1);
    div.insertAdjacentElement(`beforeend`, reviewsDiv);
    div.insertAdjacentElement(`beforeend`, reviewshr);
}

async function createAlsoProducts(id) {
    const allProducts = await (await fetch(`http://localhost:3000/getAllProductsExcept/${id.toString()}`)).json();

    setAlsoLikedProducts(allProducts);

    if (mobileVersionHomePage())
        changeHomePageForMobile(allProducts);
    window.addEventListener('resize', () => {
        if (mobileVersionHomePage())
            changeHomePageForMobile(allProducts);
    });
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

async function addButtonsListeners(product, brands) {
    const sizeButtons = document.querySelectorAll(`.product-info .size button`);
    sizeButtons.forEach(button => button.addEventListener(`click`, () => {
        for (let i = 0; i < sizeButtons.length; i++) {
            let element = sizeButtons[i];
            if (element.classList.contains(`selected-size`)) {
                element.classList.remove(`selected-size`);
                break;
            }
        }
        button.classList.add(`selected-size`);
    }))

    const bagButton = document.querySelector(`.product-info button.bag`)
    bagButton.addEventListener(`click`, (e) => {

        let flag = false, size, sizes = [];


        for (let i = 0; i < sizeButtons.length; i++) {
            let element = sizeButtons[i];
            if (element.classList.contains(`selected-size`)) {
                flag = true;
                size = element.textContent;
                break;
            }
            flag = false;
        }

        sizeButtons.forEach(button => sizes.push(button.textContent));

        if (!flag) {
            alert(`Select Size`);
        }
        else {
            let products = JSON.parse(localStorage.getItem('cart')) || [];
            let fit = "";
            if (product.Fit && product.Fit.length > 0)
                fit = document.querySelector(`.fit button.selected-fit`).textContent;

            let element = {
                'id': `${product.Id}`,
                'src': `https://raw.githubusercontent.com/dimqacs/dqStorePhotoResources/master/resources/${product.Id}/0.webp`,
                'name': `${brands[product.BrandId].Name} ${product.Name}`,
                'description': `${product.ShortDescription}`,
                'color': `${product.Color}`,
                'size': `${size}`,
                'sizes': sizes,
                'price': `${product.Price}`,
                'quantity': `1`,
                'fit': fit
            }

            products.push(element);
            localStorage.setItem(`cart`, JSON.stringify(products));
            window.location.href = `bag.html`;
        }
    });

    const favouriteButton = document.querySelector(`.product-info button.favourite`)
    favouriteButton.addEventListener(`click`, () => {
        let products = JSON.parse(localStorage.getItem('favourite')) || [];
        let element = {
            'id': `${product.Id}`,
            'src': `https://raw.githubusercontent.com/dimqacs/dqStorePhotoResources/master/resources/${product.Id}/0.webp`,
            'name': `${brands[product.BrandId].Name} ${product.Name}`,
            'description': `${product.ShortDescription}`,
            'price': `${product.Price}`
        }
        let flag = false;
        products.forEach(item => {
            if (item.id === element.id) {
                alert(`Product already in favourites`);
                flag = true;
            }
        });

        if (!flag) {
            products.push(element);
            localStorage.setItem(`favourite`, JSON.stringify(products));
            alert(`Product was successfully added to Favourite Products`);
        }
    });

    const shippingArrow = document.querySelector(`.product-info .shipping img`);
    const shipInfoDiv = document.createElement(`div`);
    shipInfoDiv.setAttribute(`id`, `shipInfo`);
    const p = document.createElement(`p`);
    p.innerHTML = `Free standard shipping on orders $50+ and free 60-day returns for DQ Members.<br>
    <a href="working.html">Return policy exclusions apply.<a>`;
    shipInfoDiv.insertAdjacentElement(`beforeend`, p);
    shippingArrow.parentElement.insertAdjacentElement(`afterend`, shipInfoDiv);

    shippingArrow.addEventListener(`click`, () => {
        if (shipInfoDiv.classList.contains(`reveal`)) {
            shipInfoDiv.classList.remove(`reveal`);
        } else {
            shipInfoDiv.classList.add(`reveal`);
            console.log(`dfs`)
        }
    })

}

function mobileVersionHomePage() {
    return document.querySelector(`footer`).clientWidth <= 430;
}

function changeHomePageForMobile(products) {
    const priceDiv = document.querySelector(`#priceSpan`);
    const images = document.querySelector(`.images`);
    priceDiv.style.marginBottom = (images.clientHeight + 60) + 'px';

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