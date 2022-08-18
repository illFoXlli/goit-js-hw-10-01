let inquiry = `?fields=name,capital,population,flags,languages`;

export default function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}${inquiry}`)
    .then(response => {
      if (response.status === 404) {
        Notiflix.Notify.failure('Ошибка. Данных на сервере не найдено!!!');
      }
      return response.json();
    })
    .catch(err => {
      Notiflix.Notify.failure('Ошибка. Данных на сервере не найдено!!!');
      console.log(`${err} что то пошло не так в файле fun-js`);
    });
}
// ‘errors: ’ + err.message
