function setBrands(list) {
    const ul = document.querySelector(`#brandsList`);

    for (let i = 0; i < list.length; i++) {
        let li = document.createElement(`li`);
        li.textContent = list[i];
        li.setAttribute(`id`, i);
        ul.insertAdjacentElement(`beforeend`, li);
    }
}

const colorDivs = document.querySelectorAll(`.colorBlock`);

colorDivs.forEach((div) => {
    div.addEventListener(`mouseenter`, () => {
        div.querySelector(`label`).style.color = `#aaaaaa`;
    })

    div.addEventListener(`mouseleave`, () => {
        div.querySelector(`label`).style.color = `#111111`;
    })
});

const filterDivs = document.querySelectorAll(`.filter`);

filterDivs.forEach((div) => {
    let img = div.querySelector(`img`);

    div.addEventListener(`click`, () => {
        if (img.getAttribute(`src`) == `../resources/images/sort.png`) {
            document.querySelector(`#${div.getAttribute(`name`)}`).style.display = `block`;
            img.setAttribute(`src`, `../resources/images/unsort.png`);
        } else {
            document.querySelector(`#${div.getAttribute(`name`)}`).style.display = `none`;
            img.setAttribute(`src`, `../resources/images/sort.png`);
        }
    });
});

document.addEventListener('DOMContentLoaded', async () => {

    setBrands(["Nike", "Adidas", "Puma", "Under Armour", "Reebok", "Asics", "New Balance", "Lacoste", "The North Face", "Bauer", "Yonex", "Lotto", "Willson", "Everlast", "Specialized", "Giant", "Merrel", "Brooks", "Saucony", "Skechers", "Salomon"]);
    correctFilterParams();
    const data = JSON.parse(localStorage.getItem(`data-params`));
    const params = new URLSearchParams({
        gender: data.Gender,
        kids: data.Kids,
        saleArray: data.Sale,
        sportsId: data.Sport,
        categoriesId: data.Category,
        team: data.Team,
        brandsId: data.Brands,
        colors: data.Colors,
        prices: data.Prices,
        sizes: data.Sizes
    });

    console.log(params.toString())

    setDefaultFilters(data);
    setFiltersListeners(data);

    const products = await fetch(`http://localhost:3000/getFilteredProducts?${params.toString()}`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching the data:', error);
        });

    console.log(products);

    console.log(params.toString().split(","))

    showProductsonPage(products);
    setSideFilters(data, products);
    setSizeListeners(data);

    if (mobileVersionHomePage())
        changeHomePageForMobile(products.length);
    window.addEventListener('resize', () => {
        if (mobileVersionHomePage())
            changeHomePageForMobile(products.length);
    });
});

function correctFilterParams() {
    let params = JSON.parse(localStorage.getItem(`data-params`));
    let categoriesId = [], sportsId = [], salesArray = [], colors = [];
    categoriesId.push(params.Category);
    sportsId.push(params.Sport);
    salesArray.push(params.Sale);
    colors.push(params.Colors);

    if (params.Gender) {
        if (params.Gender == `men`)
            params.Gender = `Male`;
        if (params.Gender == `women`)
            params.Gender = `Female`
    }

    if (params.Sale == `any`)
        salesArray = [10, 20, 30];

    if (params.Sport) {
        let sport = params.Sport;
        localStorage.setItem(`this`, sport)
        if (sport == `Shop by Sport`)
            sportsId = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        if (sport.includes('Running')) {
            sportsId.push(0);
        }
        if (sport.includes('Football')) {
            sportsId.push(1);
        }
        if (sport.includes('Basketball')) {
            sportsId.push(2);
        }
        if (sport.includes('Volleyball')) {
            sportsId.push(3);
        }
        if (sport.includes('Tennis')) {
            sportsId.push(4);
        }
        if (sport.includes('Cycling')) {
            sportsId.push(5);
        }
        if (sport.includes('Hiking')) {
            sportsId.push(6);
        }
        if (sport.includes('Swimming')) {
            sportsId.push(7);
        }
        if (sport.includes('Baseball')) {
            sportsId.push(8);
        }
        if (sport.includes('Rugby')) {
            sportsId.push(9);
        }
        if (sport.includes('Golf')) {
            sportsId.push(10);
        }
        if (sport.includes('Hockey')) {
            sportsId.push(11);
        }
        if (sport.includes('Boxing')) {
            sportsId.push(12);
        }
        if (sport.includes('Badminton')) {
            sportsId.push(13);
        }

    }

    if (params.Category) {

        if (params.Category.includes(`Sport Clothing`, `Clothing`)) {
            categoriesId.push(...[0, 1, 10]);
        }

        if (params.Category.includes(`All`, `Proffesional`))
            categoriesId.push(...[2, 3, 4, 5, 6, 7]);

        if (params.Category.includes(`Shoes`)) {
            categoriesId.push(...[8, 9]);
        }

        if (params.Category.includes('Shorts')) {
            categoriesId.push(0);
        }
        if (params.Category.includes('T-Shirt')) {
            categoriesId.push(1);
        }
        if (params.Category.includes('Backpack')) {
            categoriesId.push(2);

        }
        if (params.Category.includes('Gloves')) {
            categoriesId.push(3);
        }
        if (params.Category.includes('Racket')) {
            categoriesId.push(4);
        }
        if (params.Category.includes('Helmet')) {
            categoriesId.push(5);
        }
        if (params.Category.includes('Ball')) {
            categoriesId.push(6);
        }
        if (params.Category.includes('Stick')) {
            categoriesId.push(7);
        }
        if (params.Category.includes('Boots')) {
            categoriesId.push(8);
        }
        if (params.Category.includes('Trainers')) {
            categoriesId.push(9);
        }
        if (params.Category.includes('Polo')) {
            categoriesId.push(10);
        }

    }

    if (params.Colors) {
        const colorFilters = document.querySelectorAll(`#colorFilter .color-option`);
        let colorBlocks = [];
        colorFilters.forEach(color => {
            colorBlocks = colorBlocks.concat(Array.from(color.querySelectorAll('.colorBlock')));
        });

        colorBlocks.forEach(colorBlock => {
            if (params.Colors.includes(colorBlock.getAttribute('id'))) {
                const colorDiv = colorBlock.querySelector('div');
                colorBlock.classList.add('selected-color');
                let img = document.createElement('img');
                img.setAttribute('src', '../resources/images/bif.png');

                if (colorDiv.getAttribute('id') === 'wh') {
                    img.setAttribute('src', '../resources/images/BlackBif.png');
                }

                colorDiv.insertAdjacentElement('beforeend', img);
            }
        });
    }

    categoriesId = categoriesId.filter(item => !isNaN(parseFloat(item)));

    params.Category = categoriesId;
    params.Sport = sportsId;
    params.Sale = salesArray;

    localStorage.setItem(`data-params`, JSON.stringify(params));
}

function showProductsonPage(products) {
    const div = document.querySelector(`.products`);
    let pages = 1;

    if (products.length > 18) {
        pages = Math.ceil(products.length / 18);
        createDivs(div, products, 18);
        createPageCounter(div, pages, products);
    } else {
        createDivs(div, products, products.length);
        createPageCounter(div, pages, products);
    }

}

function createDivs(parent, products, count) {
    for (let i = 0; i < count; i++) {
        let product = products[i];
        let div = document.createElement(`div`);
        div.setAttribute(`class`, `product`);

        div.addEventListener(`click`, () => {
            localStorage.setItem(`product`, JSON.stringify(product));
            window.location.href = `product.html`;
        })

        let image = document.createElement(`img`);
        image.setAttribute(`src`, `https://raw.githubusercontent.com/dimqacs/dqStorePhotoResources/master/resources/${product.Id}/0.webp`)

        let h6 = document.createElement(`h6`);
        h6.textContent = product.Name;

        let span = document.createElement(`span`);
        span.textContent = product.ShortDescription;

        let span1 = document.createElement(`span`);
        span1.textContent = `1 Color`;

        let h61 = document.createElement(`h6`);
        h61.textContent = `$ ${product.Price}`;

        div.insertAdjacentElement(`beforeend`, image);
        div.insertAdjacentElement(`beforeend`, h6);
        div.insertAdjacentElement(`beforeend`, span);
        div.insertAdjacentElement(`beforeend`, span1);
        div.insertAdjacentElement(`beforeend`, h61);
        parent.insertAdjacentElement(`beforeend`, div);
    }
}

function createPageCounter(parent, count, products) {
    const div = document.querySelector(`.counter`);
    const circles = document.createElement(`div`);
    circles.setAttribute(`class`, `circles`);

    for (let i = 0; i < count; i++) {
        let circle = document.createElement(`div`);
        circle.setAttribute(`class`, `page-circle`);
        let span = document.createElement(`span`);
        span.textContent = i + 1;

        circle.addEventListener(`click`, () => {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
            if (i == 0) {
                createDivs(parent, products.slice(0, 18), 18);
            }
            if (i == 1) {
                createDivs(parent, products.slice(18, 36), 18);
            }
            if (i == 2) {
                createDivs(parent, products.slice(36, 54), 18);
            }
        })


        circle.insertAdjacentElement(`beforeend`, span);
        circles.insertAdjacentElement(`beforeend`, circle);
    }

    div.insertAdjacentElement(`beforeend`, circles);
}


function setSideFilters(params, products) {

    console.log(params.Category)

    if (containsOnlySpecificCategories(params.Category.toString().split(`,`), [8, 9])) {
        let allSizes = [];
        products.forEach((product) => {
            allSizes = allSizes.concat(product.Size);
        });
        let uniqueSizes = [...new Set(allSizes)];
        uniqueSizes.sort((a, b) => parseFloat(a) - parseFloat(b));
        createSizeFilterDiv(uniqueSizes);
    } else if (containsOnlySpecificCategories(params.Category, [0, 1, 2, 5, 10])) {
        let allSizes = [];
        products.forEach((product) => {
            allSizes = allSizes.concat(product.Size);
        });
        let uniqueSizes = [...new Set(allSizes)];
        createSizeFilterDiv(uniqueSizes);
    } else if (containsOnlySpecificCategories(params.Category, [6])) {
        let allSizes = [];
        products.forEach((product) => {
            allSizes = allSizes.concat(product.Size);
        });
        let uniqueSizes = [...new Set(allSizes)];
        createSizeFilterDiv(uniqueSizes);
    } else if (containsOnlySpecificCategories(params.Category, [4])) {
        let allSizes = [];
        products.forEach((product) => {
            allSizes = allSizes.concat(product.Size);
        });
        let uniqueSizes = [...new Set(allSizes)];
        createSizeFilterDiv(uniqueSizes);
    } else if (containsOnlySpecificCategories(params.Category, [7])) {
        let allSizes = [];
        products.forEach((product) => {
            allSizes = allSizes.concat(product.Size);
        });
        let uniqueSizes = [...new Set(allSizes)];
        createSizeFilterDiv(uniqueSizes);
    } else if (containsOnlySpecificCategories(params.Category, [3])) {
        let allSizes = [];
        products.forEach((product) => {
            allSizes = allSizes.concat(product.Size);
        });
        let uniqueSizes = [...new Set(allSizes)];
        createSizeFilterDiv(uniqueSizes);
    }

}

function createSizeFilterDiv(sizes) {
    const sizeFilter = document.getElementById('sizeFilter');
    sizeFilter.innerHTML = '';

    const sizeOptionDiv = (buttons, isLast) => {
        const div = document.createElement('div');
        div.className = 'size-option';
        if (isLast) {
            if (buttons.length == 2)
                div.id = 'twoButtons';
            else
                div.id = `oneButton`;
        }
        buttons.forEach(size => {
            const button = document.createElement('button');
            button.textContent = size;
            div.appendChild(button);
        });
        return div;
    };

    let sizeButtons = [];
    sizes.forEach(size => {
        sizeButtons.push(size);
        if (sizeButtons.length === 3) {
            sizeFilter.appendChild(sizeOptionDiv(sizeButtons, false));
            sizeButtons = [];
        }
    });

    if (sizeButtons.length > 0) {
        sizeFilter.appendChild(sizeOptionDiv(sizeButtons, true));
    }
}

function containsOnlySpecificCategories(categories, allowedCategories) {
    console.log(allowedCategories);
    const stringCategories = categories.map(category => category.toString());
    const stringAllowedCategories = allowedCategories.map(category => category.toString());

    console.log(stringCategories, stringAllowedCategories)
    return stringCategories.every(category => stringAllowedCategories.includes(category));
}

function setDefaultFilters(params) {
    const brandsFilters = document.querySelectorAll(`#brandsList li`);
    const genderFilters = document.querySelectorAll(`#genderFilter .option`);
    const saleFilters = document.querySelectorAll(`#saleFilter .option`);
    const sportFilters = document.querySelectorAll(`#sportFilter .option`);
    const teamFilters = document.querySelectorAll(`#teamFilter .option`);
    const priceFilters = document.querySelectorAll(`#priceFilter .option`);

    if (params.Brands) {
        brandsFilters.forEach((brand, index) => {
            if (containsOnlySpecificCategories([index], params.Brands))
                brand.setAttribute(`class`, `selectedBrand`);
        });
    }

    if (params.Gender) {
        genderFilters.forEach(gender => {
            const input = gender.querySelector(`input`);
            if (params.Gender.includes(input.getAttribute(`name`)))
                input.checked = true;
        });
    }

    if (params.Sale) {
        saleFilters.forEach(sale => {
            const input = sale.querySelector(`input`);
            if (params.Sale.toString().includes(input.getAttribute(`name`)))
                input.checked = true;
        });
    }

    if (params.Sport) {
        sportFilters.forEach((sport, index) => {
            const input = sport.querySelector(`input`);
            if (params.Sport.includes(index)) {
                input.checked = true;
            }
        });
    }

    if (params.Team) {
        teamFilters.forEach(team => {
            const input = team.querySelector(`input`);
            if (params.Team.includes(input.getAttribute(`name`)))
                input.checked = true;
        });
    }

    if (params.Prices) {
        priceFilters.forEach(price => {
            const input = price.querySelector(`input`);
            if (params.Prices.includes(input.getAttribute(`name`)))
                input.checked = true;
        })
    }
}

function setFiltersListeners(params) {
    const brandsFilters = document.querySelectorAll(`#brandsList li`);
    const genderFilters = document.querySelectorAll(`#genderFilter .option`);
    const saleFilters = document.querySelectorAll(`#saleFilter .option`);
    const colorFilters = document.querySelectorAll(`#colorFilter .color-option`);
    const priceFilters = document.querySelectorAll(`#priceFilter .option`);
    const sportFilters = document.querySelectorAll(`#sportFilter .option`);
    const teamFilters = document.querySelectorAll(`#teamFilter .option`);

    brandsFilters.forEach(li => {
        li.addEventListener(`click`, () => {
            if (li.classList.contains(`selectedBrand`)) {
                li.classList.remove(`selectedBrand`)
            }
            else {
                li.setAttribute(`class`, `selectedBrand`);
            }
            let brands = checkSelectedOptionsByCriteria(document.querySelector(`#brandsList`), `.selectedBrand`);
            localStorage.setItem(`this`, JSON.stringify(params.Gender));
            localStorage.setItem('data-params', JSON.stringify({ Gender: params.Gender, Kids: params.Kids, Sale: params.Sale, Sport: params.Sport, Category: params.Category, Team: params.Team, Brands: brands, Colors: params.Colors, Prices: params.Prices, Sizes: params.Sizes }));
            window.location.reload();
        })
    });

    genderFilters.forEach(gender => {
        const input = gender.querySelector(`input`);
        input.addEventListener(`change`, () => {
            let genders = checkSelectedOptionsForInput(document.querySelector(`#genderFilter`));
            localStorage.setItem('data-params', JSON.stringify({ Gender: genders, Kids: params.Kids, Sale: params.Sale, Sport: params.Sport, Category: params.Category, Team: params.Team, Brands: params.Brands, Colors: params.Colors, Prices: params.Prices, Sizes: params.Sizes }));
            window.location.reload();
        })
    });

    saleFilters.forEach(sale => {
        const input = sale.querySelector(`input`);
        input.addEventListener(`change`, () => {
            let sales = checkSelectedOptionsForInput(document.querySelector(`#saleFilter`));
            localStorage.setItem('data-params', JSON.stringify({ Gender: params.Gender, Kids: params.Kids, Sale: sales, Sport: params.Sport, Category: params.Category, Team: params.Team, Brands: params.Brands, Colors: params.Colors, Prices: params.Prices, Sizes: params.Sizes }));
            window.location.reload();
        })
    });

    colorFilters.forEach(color => {
        const blocks = color.querySelectorAll(`.colorBlock`);
        blocks.forEach(block => {
            block.addEventListener(`click`, () => {
                const colorDiv = block.querySelector(`div`);
                if (block.classList.contains(`selected-color`)) {
                    block.classList.remove(`selected-color`);
                    colorDiv.removeChild(colorDiv.firstChild)
                } else {
                    block.classList.add(`selected-color`);
                    let img = document.createElement(`img`);
                    img.setAttribute(`src`, `../resources/images/bif.png`);

                    if (colorDiv.getAttribute(`id`) == `wh`)
                        img.setAttribute(`src`, `../resources/images/BlackBif.png`);

                    colorDiv.insertAdjacentElement(`beforeend`, img);
                }
                let colors = checkSelectedOptionsByCriteria(document.querySelector(`#colorFilter`), `.selected-color`);

                localStorage.setItem('data-params', JSON.stringify({ Gender: params.Gender, Kids: params.Kids, Sale: params.Sale, Sport: params.Sport, Category: params.Category, Team: params.Team, Brands: params.Brands, Colors: colors, Prices: params.Prices, Sizes: params.Sizes }));
                window.location.reload();
            })
        });
    });

    priceFilters.forEach(price => {
        const input = price.querySelector(`input`);
        input.addEventListener(`change`, () => {
            let prices = checkSelectedOptionsForInput(document.querySelector(`#priceFilter`));
            localStorage.setItem('data-params', JSON.stringify({ Gender: params.Gender, Kids: params.Kids, Sale: params.Sale, Sport: params.Sport, Category: params.Category, Team: params.Team, Brands: params.Brands, Colors: params.Colors, Prices: prices, Sizes: params.Sizes }));
            window.location.reload();
        })
    });

    sportFilters.forEach(sport => {
        const input = sport.querySelector(`input`);
        input.addEventListener(`change`, () => {
            let sports = checkSelectedOptionsForInput(document.querySelector(`#sportFilter`));
            localStorage.setItem('data-params', JSON.stringify({ Gender: params.Gender, Kids: params.Kids, Sale: params.Sale, Sport: sports, Category: params.Category, Team: params.Team, Brands: params.Brands, Colors: params.Colors, Prices: params.Prices, Sizes: params.Sizes }));
            window.location.reload();
        })
    });

    teamFilters.forEach(team => {
        const input = team.querySelector(`input`);
        input.addEventListener(`change`, () => {
            let teams = checkSelectedOptionsForInput(document.querySelector(`#teamFilter`));
            localStorage.setItem('data-params', JSON.stringify({ Gender: params.Gender, Kids: params.Kids, Sale: params.Sale, Sport: params.Sport, Category: params.Category, Team: teams, Brands: params.Brands, Colors: params.Colors, Prices: params.Prices, Sizes: params.Sizes }));
            window.location.reload();
        })
    });
}

function checkSelectedOptionsByCriteria(div, criteria) {
    let elements = div.querySelectorAll(`${criteria}`);
    let result = [];
    elements.forEach(element => {
        result.push(element.getAttribute(`id`));
    })
    return result;
}

function checkSelectedOptionsForInput(div) {
    let elements = div.querySelectorAll(`input`);
    let result = [];
    elements.forEach(element => {
        if (element.checked)
            result.push(element.getAttribute(`name`));
    })
    return result;
}

function setSizeListeners(params) {
    const sizeFilters = document.querySelectorAll(`#sizeFilter div`);
    let buttonsParam = [];
    buttonsParam.push(...params.Sizes);

    sizeFilters.forEach(size => {
        const buttons = size.querySelectorAll(`button`);

        buttons.forEach(button => {
            if (params.Sizes.includes(button.textContent))
                button.classList.add(`selected-size`);

            button.addEventListener(`click`, () => {
                if (button.classList.contains(`selected-size`))
                    button.classList.remove(`selected-size`);
                else {
                    button.classList.add(`selected-size`);
                    buttonsParam.push(button.textContent);
                    localStorage.setItem('data-params', JSON.stringify({ Gender: params.Gender, Kids: params.Kids, Sale: params.Sale, Sport: params.Sport, Category: params.Category, Team: params.Team, Brands: params.Brands, Colors: params.Colors, Prices: params.Prices, Sizes: buttonsParam }));
                    console.log(buttonsParam)
                    window.location.reload();
                }
            })
        })
    });
}

function mobileVersionHomePage() {
    return document.querySelector(`footer`).clientWidth <= 430;
}

function changeHomePageForMobile(count) {
    const upper = document.querySelector(`.upper`);
    const hr = document.createElement(`hr`);

    const dataDiv = document.createElement(`div`);

    const span = document.createElement(`span`);
    span.textContent = `${count} Results`;

    const button = document.createElement(`button`);
    button.innerHTML = `<span>Filter </span><img src="../resources/images/settings.png"></img>`;

    button.addEventListener(`click`, () => {
        document.body.style.overflow = 'hidden';
        const divi = document.createElement(`div`);
        divi.classList.add(`cover-filters`);

        const side= document.querySelector(`.lower .side`);
        side.setAttribute(`id`, `filtersDiv`);
        
        const button = document.createElement(`button`);
        button.innerHTML = `<img src="../resources/images/cancel.png"></img>`;
        button.classList.add(`cancelButton`);
    
        button.addEventListener(`click`, () => {
            divi.style.display = `none`;
            document.body.style.overflow = 'visible';
        })
    
        divi.insertAdjacentElement(`beforeend`, button);
        divi.insertAdjacentElement(`beforeend`, side);

        upper.insertAdjacentElement(`afterend`, divi);
    })

    dataDiv.insertAdjacentElement(`beforeend`, span);
    dataDiv.insertAdjacentElement(`beforeend`, button)

    upper.insertAdjacentElement(`beforeend`, hr);
    upper.insertAdjacentElement(`beforeend`, dataDiv);
}