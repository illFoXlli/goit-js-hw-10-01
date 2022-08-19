import Notiflix from 'notiflix';

let inquiry = `?fields=name,capital,population,flags,languages`;
const BASE_URL = `https://restcountries.com/v3.1/name/`;
export default function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}${inquiry}`)
    .then(response => {
      if (response.status === 404) {
        error404();
      }
      return response.json();
    })
    .catch(() => {
      errorServer(err);
    });
}

function errorServer(err) {
  console.log(`${err} что то пошло не так в файле fun-js`);
  return Notiflix.Notify.failure('Ошибка. На сервере');
}

function error404() {
  Notiflix.Notify.failure('Ошибка 404 . Данных на сервере не найдено!!! ');
}
