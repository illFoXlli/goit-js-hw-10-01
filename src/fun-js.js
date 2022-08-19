let inquiry = `?fields=name,capital,population,flags,languages`;
const BASE_URL = `https://restcountries.com/v3.1/name/`;
export default function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}${inquiry}`)
    .then(response => {
      // if (response.status === 404) {
      //   Notiflix.Notify.failure('Ошибка. Данных на сервере не найдено!!!22222222222');
      // }
      return response.json();
    })
    .catch(() => {
      console.log(`${err} что то пошло не так в файле fun-js`);
      Notiflix.Notify.failure('Ошибка. На сервере');
    });
}

function errorServer(err) {
  console.log(`${err} что то пошло не так в файле fun-js111111111111111111111`);
  return Notiflix.Notify.failure('Ошибка. На сервере');
}

function error404() {
  Notiflix.Notify.failure('Ошибка. Данных на сервере не найдено!!!0000000000000000000');
}
