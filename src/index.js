import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const refs = {
    selector: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

const { selector, catInfo, loader, error } = refs;

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');
let arrayId = [];


fetchBreeds().then(data => {
    data.forEach(e => {
        arrayId.push({
            text: e.name, 
            value: e.id});
        // console.log(e);
        // console.log(e.name);
        // console.log(e.id);
    });  
    
    new SlimSelect({
        select: selector,
        data: arrayId
    });
    // console.log(selector);
    })
.catch(fetchError);

selector.addEventListener('change', selectBreed);

function selectBreed(evt) {
    loader.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden');
    catInfo.classList.add('is-hidden');
    breedId = evt.currentTarget.value;

    console.log(breedId);

    fetchCatByBreed(breedId).then(data => {
        loader.classList.replace('loader', 'is-hidden');
        selector.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        catInfo.classList.remove('is-hidden');
    })
    .catch(fetchError);
};


function fetchError() {
    selector.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');
    Notify.warning('Oops! Something went wrong! Choose another cat breed!');
};




