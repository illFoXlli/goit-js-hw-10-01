import './css/styles.css';
import fetchCountries from './fun-js';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const content = document.querySelector('.country-list');
const body = document.querySelector('body');
const spinner = document.querySelector('.spinner-border');

const arrayCount = [];

input.addEventListener('input', onTextInput);

const addHtmlToList = ({ flags: { svg }, name: { common } }) => `<li class="list"><img src="${svg}"
  width="80" height="" alt="">${common}</li>`;

const oneCountry = ({ population, flags: { svg }, capital, name: { common }, languages }) => {
  return `<article>
        <div class="country-info-wrapper">
            <img class="flag" src="${svg}" alt="National Flag">
            <h2>${common}
            </h2>
        </div>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${languages}</p>
    </article>
`;
  //     name.official - полное имя страны capital - столица population - население flags.svg - ссылка на изображение флага
  // languages - массив языков
};

const onError = () => {
  spinner.classList.add('visually-hidden');
  Notiflix.Notify.failure('Ошибка. Данных на сервере не найдено!!!');
};

function onTextInput(event) {
  content.innerHTML = '';
  spinner.classList.remove('visually-hidden');
  if (event.target.value !== '') {
    console.log(event.target.value);
    event.target.value.trim().length;
    fetchCountries(event.target.value)
      .then(json => {
        console.log(json);

        if (json.length > 10) {
          Notiflix.Notify.success(' Имя должно быть более специфичным!!!');
        } else if (json.length > 1 && json.length <= 10) {
          spinner.classList.add('visually-hidden');
          return (content.innerHTML = json.map(addHtmlToList).join(''));
        } else {
          spinner.classList.add('visually-hidden');

          return (content.innerHTML = oneCountry(json[0]));
        }
        spinner.classList.add('visually-hidden');
      })
      .catch(onError);
  }

  if (input.value === '') {
    spinner.classList.add('visually-hidden');
  }
}
