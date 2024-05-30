const slides = document.querySelector(`.slides`).querySelectorAll(`div`);
const slidesInfo = [];

for (let i = 0; i < slides.length; i++) {
    let element = {
        "src": slides[i].querySelector(`img`).getAttribute(`src`),
        "title": slides[i].querySelector(`span`).textContent,
        "button": slides[i].querySelector(`span:last-child`).textContent,
        "name": slides[i].getAttribute(`name`)
    };
    slidesInfo.push(element);
}

let hockey = {
    "src": `../resources/images/hockey.png`,
    "title": `Hockey Magic`,
    "button": `Discover`,
    "name": `11`
};

let swimming = {
    "src": `../resources/images/swimming.png`,
    "title": `Best for Swimming `,
    "button": `Uncover`,
    "name": `7`
};

slidesInfo.push(hockey);
slidesInfo.push(swimming);

const backButton = document.querySelector(`.sliderCounter img`);
const nextButton = document.querySelector('.sliderCounter img:last-child');

let position = 2;

const counter = document.querySelector(`.sliderCounter span`);

backButton.addEventListener(`click`, () => {
    if (!backButton.classList.contains(`end`)) {
        position--;
        counter.textContent = `${position - 1}/3`;
        if (position == 2)
            backButton.setAttribute(`class`, `end`);
        else
            nextButton.classList.remove(`end`);
        moveSlides();
    }
});

nextButton.addEventListener(`click`, () => {
    if (!nextButton.classList.contains(`end`)) {
        position++;
        counter.textContent = `${position - 1}/3`;
        if (position == 4)
            nextButton.setAttribute(`class`, `end`);
        else
            backButton.classList.remove(`end`);
        moveSlides();
    }
});

function moveSlides() {
    let j = position - 2;
    for (let i = 0; i < 3; i++) {
        slides[i].querySelector(`img`).setAttribute(`src`, slidesInfo[j].src);
        slides[i].querySelector(`span`).textContent = slidesInfo[j].title;
        slides[i].querySelector(`span:last-child`).textContent = slidesInfo[j].button;
        slides[i].setAttribute(`name`, slidesInfo[j].name);
        j++;
    }
}

const signUp = document.querySelector(`#signUpSale`);
const signUp1 = document.querySelector(`#signUpSale1`);

signUp.addEventListener(`click`, () => {
    window.location.href = `signUp.html`;
});

signUp1.addEventListener(`click`, () => {
    window.location.href = `signUp.html`;
});

const brands = document.querySelectorAll(`.brands img`);

brands.forEach((brand, index) => {
    brand.addEventListener(`click`, () => {
        localStorage.setItem('data-params', JSON.stringify({ Gender: [], Kids: false, Sale: [], Sport: [], Category: [], Team: [], Brands: [index], Colors: [], Prices: [], Sizes: [] }));
        window.location.href = `shop.html`;
    })
});

const eqShop = document.querySelector(`.firstMain a`);

eqShop.addEventListener(`click`, () => {
    localStorage.setItem('data-params', JSON.stringify({ Gender: [], Kids: false, Sale: [], Sport: [], Category: "All", Team: [], Brands: [], Colors: [], Prices: [], Sizes: [] }));
    window.location.href = `shop.html`;
});

slides.forEach((slide) => {
    slide.querySelector(`span:last-child`).addEventListener(`click`, () => {
        localStorage.setItem('data-params', JSON.stringify({ Gender: [], Kids: false, Sale: [], Sport: slide.getAttribute('name'), Category: [], Team: [], Brands: [], Colors: [], Prices: [], Sizes: [] }));
        window.location.href = `shop.html`;
    });
});

const dqxReal = document.querySelector(`.dqXrealInfo a`);

dqxReal.addEventListener(`click`, () => {
    localStorage.setItem('data-params', JSON.stringify({ Gender: [], Kids: false, Sale: [], Sport: [], Category: [], Team: "Real Madrid", Brands: [], Colors: [], Prices: [], Sizes: [] }));
    window.location.href = `shop.html`;
});

let choices = document.querySelectorAll(`.offers .choices a`);

choices.forEach((a, index) => {
    a.style.cursor = `pointer`;
    a.addEventListener(`click`, () => {
        if (index == 2)
            localStorage.setItem('data-params', JSON.stringify({ Gender: [], Kids: true, Sale: [], Sport: [], Category: [], Team: [], Brands: [], Colors: [], Prices: [], Sizes: [] }));
        else
            localStorage.setItem('data-params', JSON.stringify({ Gender: a.getAttribute('name'), Kids: false, Sale: [], Sport: [], Category: [], Team: [], Brands: [], Colors: [], Prices: [], Sizes: [] }));
        window.location.href = `shop.html`;
    });
});

const blocks = document.querySelectorAll(`.brandBlocks div`);

blocks.forEach((block) => {
    block.querySelector(`a`).style.cursor = `pointer`;

    block.addEventListener(`click`, () => {
        localStorage.setItem('data-params', JSON.stringify({ Gender: [], Kids: false, Sale: [], Sport: [], Category: [], Team: [], Brands: [block.querySelector('a').getAttribute('name')], Colors: [], Prices: [], Sizes: [] }));
        window.location.href = `shop.html`;
    });

});

function mobileVersionHomePage() {
    return document.querySelector(`footer`).clientWidth <= 430;
}

document.addEventListener('DOMContentLoaded', () => {
    if (mobileVersionHomePage())
        changeHomePageForMobile();
    window.addEventListener('resize', () => {
        if (mobileVersionHomePage())
            changeHomePageForMobile();
    });
});

function changeHomePageForMobile() {
    const slides = document.querySelector(`.slides`);
    setFullSlides(slides);
    
    const brandBlocks = document.querySelector(`.brandBlocks`);
    const h = document.createElement(`h1`);
    h.textContent = `SHOP THE BEST OFFERS`;
    h.id = `bestOffers`;
    brandBlocks.insertAdjacentElement(`beforebegin`, h);

    const h1 = document.querySelector(`.firstMain h1`);
    h1.querySelectorAll(`br`).forEach(br => {
        br.insertAdjacentText(`afterend`, " ");
        br.remove();
    });
}

function setFullSlides(div) {
    const slide = div.querySelector('.slide');
    const div1 = slide.cloneNode(true), div2 = slide.cloneNode(true);

    div1.querySelector(`img`).setAttribute(`src`, slidesInfo[3].src);
    div1.querySelector(`span`).textContent = slidesInfo[3].title;
    div1.querySelector(`span:last-child`).textContent = slidesInfo[3].button;
    div1.setAttribute(`name`, slidesInfo[3].name);

    div2.querySelector(`img`).setAttribute(`src`, slidesInfo[4].src);
    div2.querySelector(`span`).textContent = slidesInfo[4].title;
    div2.querySelector(`span:last-child`).textContent = slidesInfo[4].button;
    div2.setAttribute(`name`, slidesInfo[4].name);

    div.insertAdjacentElement(`beforeend`, div1);
    div.insertAdjacentElement(`beforeend`, div2);

    div1.addEventListener(`click`, () => {
        localStorage.setItem('data-params', JSON.stringify({ Gender: [], Kids: false, Sale: [], Sport: div1.getAttribute('name'), Category: [], Team: [], Brands: [], Colors: [], Prices: [], Sizes: [] }));
        window.location.href = `shop.html`;
    });

    div2.addEventListener(`click`, () => {
        localStorage.setItem('data-params', JSON.stringify({ Gender: [], Kids: false, Sale: [], Sport: div2.getAttribute('name'), Category: [], Team: [], Brands: [], Colors: [], Prices: [], Sizes: [] }));
        window.location.href = `shop.html`;
    });
}