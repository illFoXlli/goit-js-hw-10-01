import './css/styles.css';
import fetchCountries from './fun-js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const content = document.querySelector('.country-list');
const body = document.querySelector('body');
const spinner = document.querySelector('.spinner-border');

const arrayCount = [];

input.addEventListener('input', debounce(onTextInput, DEBOUNCE_DELAY));

const addAllHtmlToList = ({ flags: { svg }, name: { common } }) => {
  return `<li class="list">
                <img src="${svg}" width="80" height="" alt="National Flag">
                <span class="country-title">${common}</span>
                </li>`;
};

const addOneHtmlToList = ({ population, flags: { svg }, capital, name: { common }, languages }) => {
  return `<li class="country-info">
        <img class="flag" src="${svg}" alt="National Flag">
        <h2 class="country-title">${common}</h2>
        <p class="country-text"><b>Capital:</b> ${capital}</p>
        <p class="country-text"><b>Population:</b> ${population}</p>
        <p class="country-text"><b>Languages:</b>  ${Object.values(languages)}</p>
    </li>
`;
  //     name.official - полное имя страны capital - столица population - население flags.svg - ссылка на изображение флага
  // languages - массив языков
};

const errorServer = () => {
  Notiflix.Notify.failure('Ошибка. Данных на сервере не найдено!!!22222222222');
  spinnerOff();

  spinnerOff();
  Notiflix.Notify.failure('Ошибка. Данных на сервере не найдено!!!');
};

function spinnerOff() {
  return spinner.classList.add('visually-hidden');
}

function spinnerOn() {
  return spinner.classList.remove('visually-hidden');
}

function onTextInput(event) {
  content.innerHTML = '';
  spinnerOn();

  if (event.target.value.trim() !== '') {
    fetchCountries(event.target.value)
      .then(json => {
        console.log(json);

        if (json.length > 10) {
          Notiflix.Notify.success(' Имя должно быть более специфичным!!!');
        } else if (json.length > 1 && json.length <= 10) {
          spinnerOff();
          return (content.innerHTML = json.map(addAllHtmlToList).join(''));
        } else {
          spinnerOff();
          return (content.innerHTML = addOneHtmlToList(json[0]));
        }
        spinnerOff();
      })
      .catch(errorServer);
  }

  if (input.value === '') {
    spinnerOff();
  }
}
