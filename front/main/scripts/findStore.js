const locationDivs = document.querySelector(`.center`).querySelectorAll(`.location`);
const link = document.querySelector(`.lower`).querySelector(`a`);
const iframe = document.querySelector(`iframe`);

const links = [`https://maps.app.goo.gl/uC1bV3RLC1Qbe4JR6`, `https://maps.app.goo.gl/PjhFWNzpT9ee39ax8`, `https://maps.app.goo.gl/KqKjKBK5kDYHk9HE6`, `https://maps.app.goo.gl/nosA9ntLazDNwc3D9`, `https://maps.app.goo.gl/RfLqLZ3mBw8LSxMd9`, `https://maps.app.goo.gl/uucwqUPhWkSu2S9x5`];
const srcs = [`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.814546277045!2d28.83814037691387!3d47.004614271141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97ea01a3e6089%3A0x8b7bd74bc15dd0cf!2sShopping%20MallDova!5e0!3m2!1sen!2s!4v1716228283678!5m2!1sen!2s`, `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2717.4607503566954!2d28.886025076916727!3d47.07042757114561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97d4115d8be31%3A0x316469e1902d0689!2sPort%20Mall!5e0!3m2!1sen!2s!4v1716228258783!5m2!1sen!2s`, `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.9368862930205!2d28.813264991966115!3d47.00221219672965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97e855bf5e4b1%3A0xf9670d0301162453!2sStrada%20Vasile%20Dokuceaev%2013%2C%20Chi%C8%99in%C4%83u%2C%20Moldova!5e0!3m2!1sen!2s!4v1716228237451!5m2!1sen!2s`, `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2712.9987567175303!2d27.586453876920775!3d47.15787877115226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cafb9c2af50f1d%3A0xe4c014f1ca16475a!2sPalas%20Iasi!5e0!3m2!1sen!2s!4v1716228207830!5m2!1sen!2s`, `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2542.5398231163376!2d30.519730577073226!3d50.41241317158493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf3960fff74d%3A0x324a5854eb3f1a2b!2sOcean%20Plaza!5e0!3m2!1sen!2s!4v1716228172799!5m2!1sen!2s`, `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.221743999958!2d30.735118576890113!3d46.48392147110893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c631978dcd3a1d%3A0xdb310a891cc0a5c8!2sEuropa!5e0!3m2!1sen!2s!4v1716228136157!5m2!1sen!2s`];

locationDivs.forEach((div, index) => {
    div.addEventListener('click', (e) => {
        if (link.getAttribute(`href`) != links[index]) {
            removeSelectedId();
            div.setAttribute(`id`, `selected`);
            setLink(index);
            setIframe(index);
        }
    });
});

function removeSelectedId() {
    for (let i = 0; i < locationDivs.length; i++) {
        const element = locationDivs[i];
        if (element.getAttribute(`id`) == 'selected')
            element.removeAttribute(`id`);
    }
}

function setLink(id) {
    link.setAttribute(`href`, links[id]);
}

function setIframe(id) {
    iframe.setAttribute(`src`, srcs[id]);
}

const input = document.querySelector(`#searchLocation`);

input.addEventListener(``, () => {
    locationDivs.forEach((div) => {
        div.style = `display: none !important;`;
    })
});