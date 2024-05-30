const searchBar = document.querySelector(`.search-bar`);
const searchBarInput = searchBar.querySelector(`input`);

searchBarInput.addEventListener(`mouseenter`, () => {
    searchBarInput.style.backgroundColor = `#e5e5e5`;
    searchBar.style.backgroundColor = `#e5e5e5`;
    searchBarInput.setAttribute(`class`, `search-bar-hover`);
});

searchBarInput.addEventListener(`mouseleave`, () => {
    searchBarInput.style.backgroundColor = `#eeeeee`;
    searchBar.style.backgroundColor = `#eeeeee`;
    searchBarInput.removeAttribute(`class`, `search-bar-hover`);
});

const headerMenu = document.querySelector('.menu');
const info = document.querySelector('.infoPanel');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
        headerMenu.style.position = 'static';
        displayMenu.style.position = `absolute`;
        displayMenu.style.top = `100px`;
        headerMenu.classList.remove('slideIn');
    } else {
        if (currentScrollY > info.offsetHeight) {
            headerMenu.style.position = 'fixed';
            displayMenu.style.position = `fixed`;
            headerMenu.style.top = 0;
            displayMenu.style.top = `64px`;
            headerMenu.classList.add('slideIn');
        } else {
            headerMenu.style.position = 'static';
            displayMenu.style.top = `100px`;
            displayMenu.style.position = `absolute`;
            headerMenu.classList.remove('slideIn');
        }
    }

    lastScrollY = currentScrollY;
});

const dqLogo = document.querySelector(`#DQLogo`);

dqLogo.addEventListener(`click`, () => {
    window.location.href = `home.html`;
});

const menuListElements = headerMenu.querySelector(`.content`).querySelector(`ul`).querySelectorAll(`li`);
const menuElements = [];
const displayMenu = document.querySelector(`.display-menu`);
const displayContent = displayMenu.querySelector(`div`);
const blurDiv = document.querySelector(`.transparent`);

blurDiv.style.height = `${document.querySelector(`body`).clientHeight}px`;

const shoesList = ["Shoes", "Trainers", "Boots"];
const clothingList = ["Sport Clothing", "Shorts", "T-Shirt", "Polo"];
const sportsList = ["Shop by Sport", "Running", "Football", "Basketball", "Volleyball", "Tennis", "Cycling", "Hiking", "Swimming", "Baseball", "Rugby", "Golf", "Hockey", "Boxing", "Badminton"];
const equipmentList = ["Proffessional", "Backpack", "Gloves", "Racket", "Helmet", "Ball", "Stick"];
const teamList = ["Shop by Favourite Teams", "Real Madrid", "Barcelona"];
const saleList1 = ["All Sale", "Sale Shoes", "Sale Clothing", "Sale Equipment"];
const saleList2 = ["Shoes", "Clothing", "Equipment"];


menuListElements.forEach((li) => {
    menuElements.push(li.querySelector(`a`));
});

const menuList = headerMenu.querySelector(`.content`).querySelector(`ul`);

let filters = [];

menuElements.forEach((a, index) => {
    a.addEventListener(`mouseenter`, () => {
        clearTags(menuElements);
        a.setAttribute(`class`, `selected`);
        clearDisplayDiv(displayContent);
        insertCategories(index, displayContent);
        displayMenu.style.display = `flex`;
        blurDiv.style.display = `block`;
        displayContent.style.width = `max-content`;
        displayContent.style.height = `max-content`;
        displayContent.style.width = `${displayContent.clientWidth + 100}px`;
        displayContent.style.height = `${displayContent.clientHeight + 40}px`;
        blurDiv.style.top = `${displayContent.clientHeight + 100}px`;
        setFilters(a.textContent, index, displayContent);
    });

    menuList.addEventListener(`mouseleave`, () => {
        a.classList.remove(`selected`);
        displayMenu.style.display = `none`;
        blurDiv.style.display = `none`;
    });

});

let category, gender, kids, sale, equipment;

function insertCategories(id, divContent) {
    if (id < 3) {
        let shoes = document.createElement(`div`);
        shoes.setAttribute(`class`, `category`);
        shoes.classList.add('falling-content');

        for (let i = 0; i < shoesList.length; i++) {
            let a = document.createElement(`a`);
            a.textContent = shoesList[i];
            shoes.insertAdjacentElement(`beforeend`, a);
        }

        let clothing = document.createElement(`div`);
        clothing.setAttribute(`class`, `category`);
        clothing.setAttribute(`id`, `clothing`);
        clothing.classList.add('falling-content');

        for (let i = 0; i < clothingList.length; i++) {
            let a = document.createElement(`a`);
            a.textContent = clothingList[i];
            clothing.insertAdjacentElement(`beforeend`, a);
        }

        let sport = document.createElement(`div`);
        sport.setAttribute(`class`, `category`);
        sport.setAttribute(`name`, `sport`);
        sport.classList.add('falling-content');

        for (let i = 0; i < sportsList.length; i++) {
            let a = document.createElement(`a`);
            a.textContent = sportsList[i];
            sport.insertAdjacentElement(`beforeend`, a);
        }

        let div = document.createElement(`div`);
        div.setAttribute(`class`, `category`);

        div.insertAdjacentElement(`beforeend`, shoes);
        div.insertAdjacentElement(`beforeend`, clothing);

        divContent.insertAdjacentElement(`beforeend`, div);
        divContent.insertAdjacentElement(`beforeend`, sport);
    } else if (id == 3) {

        let eqp = document.createElement(`div`);
        eqp.setAttribute(`class`, `category`);
        eqp.classList.add('falling-content');

        for (let i = 0; i < equipmentList.length; i++) {
            let a = document.createElement(`a`);
            a.textContent = equipmentList[i];
            eqp.insertAdjacentElement(`beforeend`, a);
        }

        let team = document.createElement(`div`);
        team.setAttribute(`class`, `category`);
        team.setAttribute(`name`, `team`);
        team.classList.add('falling-content');
        team.setAttribute(`id`, `clothing`);

        for (let i = 0; i < teamList.length; i++) {
            let a = document.createElement(`a`);
            a.textContent = teamList[i];
            team.insertAdjacentElement(`beforeend`, a);
        }

        let sport = document.createElement(`div`);
        sport.setAttribute(`class`, `category`);
        sport.setAttribute(`name`, `sport`)
        sport.classList.add('falling-content');

        for (let i = 0; i < sportsList.length; i++) {
            let a = document.createElement(`a`);
            a.textContent = sportsList[i];
            sport.insertAdjacentElement(`beforeend`, a);
        }

        let div = document.createElement(`div`);
        div.setAttribute(`class`, `first-column`);

        div.insertAdjacentElement(`beforeend`, eqp);
        div.insertAdjacentElement(`beforeend`, team);

        divContent.insertAdjacentElement(`beforeend`, div);
        divContent.insertAdjacentElement(`beforeend`, sport);
    } else {
        let all = document.createElement(`div`);
        all.setAttribute(`class`, `category`);
        all.classList.add('falling-content');

        for (let i = 0; i < saleList1.length; i++) {
            let a = document.createElement(`a`);
            a.textContent = saleList1[i];
            all.insertAdjacentElement(`beforeend`, a);
        }

        let men = document.createElement(`div`);
        men.setAttribute(`class`, `category`);
        men.setAttribute(`name`, `men`);
        men.classList.add('falling-content');
        let a1 = document.createElement(`span`);
        a1.textContent = `Men`;
        men.insertAdjacentElement(`beforeend`, a1);

        for (let i = 0; i < saleList2.length; i++) {
            let a = document.createElement(`a`);
            a.textContent = saleList2[i];
            men.insertAdjacentElement(`beforeend`, a);
        }

        let women = document.createElement(`div`);
        women.setAttribute(`class`, `category`);
        women.setAttribute(`name`, `women`);
        women.classList.add('falling-content');
        let a2 = document.createElement(`span`);
        a2.textContent = `Women`;
        women.insertAdjacentElement(`beforeend`, a2);

        for (let i = 0; i < saleList2.length; i++) {
            let a = document.createElement(`a`);
            a.textContent = saleList2[i];
            women.insertAdjacentElement(`beforeend`, a);
        }

        let kids = document.createElement(`div`);
        kids.setAttribute(`class`, `category`);
        kids.setAttribute(`name`, `kids`);
        kids.classList.add('falling-content');
        let a3 = document.createElement(`span`);
        a3.textContent = `Kids`;
        kids.insertAdjacentElement(`beforeend`, a3);

        for (let i = 0; i < saleList2.length; i++) {
            let a = document.createElement(`a`);
            a.textContent = saleList2[i];
            kids.insertAdjacentElement(`beforeend`, a);
        }

        divContent.insertAdjacentElement(`beforeend`, all);
        divContent.insertAdjacentElement(`beforeend`, men);
        divContent.insertAdjacentElement(`beforeend`, women);
        divContent.insertAdjacentElement(`beforeend`, kids);
    }
}

function clearDisplayDiv(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function clearTags(element) {
    element.forEach((a) => {
        if (a.classList.contains('selected')) {
            a.classList.remove('selected');
        }
    })
}

function setFilters(text, id, divContent) {
    let filters = divContent.querySelectorAll(`a`);
    let gender = "", kids = false, equipment = false, sale = "", sport = "", category = "", team = "";

    if (id < 2)
        gender = text.toLowerCase();
    else if (id == 2)
        kids = true;
    else if (id == 3)
        equipment = true;
    else
        sale = `any`;

    filters.forEach((a) => {
        a.addEventListener(`click`, () => {
            let parent = a.parentElement;
            let type = parent.getAttribute(`name`);
            if (id < 3) {
                if (type != `sport`) {
                    category = a.textContent;
                    sport = ""
                }
                else {
                    sport = a.textContent;
                    category = "";
                }

            } else if (id == 3) {
                if (type == `sport`) {
                    sport = a.textContent;
                    team = "";
                    category = "";
                }
                else if (type == `team`) {
                    team = a.textContent;
                    category = "";
                    sport = "";
                }
                else {
                    category = a.textContent;
                    team = "";
                    sport = "";
                }

            } else {
                if (type == `kids`) {
                    kids = true;
                    gender = "";
                } else if (type == `men` || type == `women`) {
                    gender = type;
                    kids = false;
                }
                else {
                    kids = false;
                    gender = "";
                }


                if (category.includes(`Sale`))
                    category = category.replace('Sale', '').trim();
            }

            localStorage.setItem('data-params', JSON.stringify({ Gender: gender, Kids: kids, Equipment: equipment, Sale: sale, Sport: sport, Category: category, Team: team, Brands: "", Colors: "", Prices: "", Sizes: "" }));
            if (window.location.href == `shop.html`)
                window.location.reload();
            else
                window.location.href = `shop.html`;
        });
    })
}

function mobileVersionPage() {
    return document.querySelector(`footer`).clientWidth <= 430;
}

document.addEventListener('DOMContentLoaded', () => {
    if (mobileVersionPage())
        changePageForMobile();
    window.addEventListener('resize', () => {
        if (mobileVersionPage())
            changePageForMobile();
    });
});

function changePageForMobile() {
    const iconsDiv = document.querySelector(`header .menu .content .icons`);

    const search = document.createElement(`img`);
    search.setAttribute(`src`, `../resources/images/search.png`);

    const searchA = document.createElement(`a`);
    searchA.classList.add(`HeaderIcon`);
    searchA.href = `#`;
    searchA.insertAdjacentElement(`afterbegin`, search);

    iconsDiv.insertAdjacentElement(`afterbegin`, searchA);

    const menuImg = document.createElement(`img`);
    menuImg.setAttribute(`src`, `../resources/images/menu.png`);

    const menu = document.createElement(`a`);
    menu.classList.add(`HeaderIcon`);
    menu.href = `#`;
    menu.insertAdjacentElement(`afterbegin`, menuImg);

    menu.addEventListener(`click`, () => {
        createMenuDiv(menu);
        document.querySelector(`.menuClick`).style.display = `flex`;
        document.body.style.overflow = 'hidden';
    });

    iconsDiv.insertAdjacentElement(`beforeend`, menu);
}

function createMenuDiv(parent) {
    const div = document.createElement(`div`);
    div.classList.add(`menuClick`);

    const button = document.createElement(`button`);
    button.innerHTML = `<img src="../resources/images/cancel.png"></img>`;
    button.classList.add(`cancelButton`);

    button.addEventListener(`click`, () => {
        div.style.display = `none`;
        document.body.style.overflow = 'visible';
    })

    div.insertAdjacentElement(`afterbegin`, button);

    const sample = document.querySelector(`.infoPanel ul`);
    const settings = sample.cloneNode(true);
    settings.classList.add(`mCategories`);

    const sign = document.createElement(`div`);
    sign.classList.add(`signMobile`);

    const p = document.createElement(`p`);
    p.textContent = `Become a DQ Member for the best products, inspiration and stories in sport.`;

    const up = document.createElement(`a`);
    up.textContent = `Sign Up`;
    up.href = `signUp.html`;

    const inn = document.createElement(`a`);
    inn.textContent = `Sign In`;
    inn.href = `logIn.html`;

    const buts = document.createElement(`div`);
    buts.insertAdjacentElement(`beforeend`, up);
    buts.insertAdjacentElement(`beforeend`, inn);
    buts.classList.add(`buttons`);

    sign.insertAdjacentElement(`beforeend`, p);
    sign.insertAdjacentElement(`beforeend`, buts);

    const sample1 = document.querySelector(`.content ul`);
    const ul = sample1.cloneNode(true);
    ul.classList.add(`mCategories`);

    const mobileDisplayMenu = ul.querySelector(`.display-menu`);
    const mobileDisplayContent = mobileDisplayMenu.querySelector(`.display-content`);

    const cancelButton = document.createElement(`button`);
    cancelButton.innerHTML = `<img src="../resources/images/cancel.png"></img>`;
    cancelButton.classList.add(`cancelButton`);

    cancelButton.addEventListener(`click`, () => {
        mobileDisplayMenu.style.display = `none`;
        clearTags(ul.querySelectorAll(`li a`));
    })

    ul.querySelectorAll(`li`).forEach((li, index) => li.addEventListener(`click`, () => {
        console.log(mobileDisplayMenu)
        const a = li.querySelector(`a`);
        clearTags(ul.querySelectorAll(`li a`));
        a.setAttribute(`class`, `selected`);
        clearDisplayDiv(mobileDisplayContent);
        insertCategories(index, mobileDisplayContent);
        mobileDisplayMenu.style.display = `flex`;
        mobileDisplayContent.style.width = `max-content`;
        mobileDisplayContent.style.height = `max-content`;
        mobileDisplayContent.style.width = `100dvw`;
        mobileDisplayContent.style.height = `100dvh`;
        setFilters(a.textContent, index, mobileDisplayContent);
        mobileDisplayContent.insertAdjacentElement(`afterbegin`, cancelButton);
    }))

    div.insertAdjacentElement(`beforeend`, ul);
    div.insertAdjacentElement(`beforeend`, sign);
    div.insertAdjacentElement(`beforeend`, settings);

    

    parent.insertAdjacentElement(`afterend`, div);

}