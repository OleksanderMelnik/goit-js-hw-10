import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = {
    selector: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

const { selector, catInfo, loader, error } = refs;
let breedArr = [];

loader.classList.toggle('loader');
error.classList.add('is-hidden');
catInfo.classList.remove('cat-info');

fetchBreeds().then(data => {
    loader.classList.add('loader-text')
    data.map(e => {
        breedArr.push({
            text: e.name, 
            value: e.id});
    });  
    
    new SlimSelect({
        select: '.breed-select',
        data: breedArr
    });
    
    })
.catch(fetchError);

selector.addEventListener('change', selectBreed);

function selectBreed(e) {
    loader.classList.replace('is-hidden', 'loader');
    catInfo.classList.add('cat-info');
    const breedId = e.currentTarget.value;
    fetchCatByBreed(breedId).then(data => { 
        loader.classList.add('loader', 'is-hidden');
        const { url, breeds } = data[0];
        catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        catInfo.classList.remove('is-hidden');
    })
    .catch(fetchError);
};


function fetchError() {

    Notify.warning('Oops! Something went wrong! Choose another cat breed!', {
        timeout: 5000,
    });   
};
