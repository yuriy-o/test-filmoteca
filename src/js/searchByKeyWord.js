import Notiflix from 'notiflix';
import { srcImgBase } from './markupListMovies';
import ApiServise, { IMG_URL } from './api';
import { createMarkup } from './markupListMovies';
const userFilms = new ApiServise();
import Pagination from 'tui-pagination';
import {options} from "./pagination"
import {cleanContainer} from './pagination';


const refs = {
  inputEl: document.querySelector('.search-field'),
  searchBtn: document.querySelector('.search-btn'),
  formEl: document.querySelector('.search-form'),
  moviesList: document.querySelector('.film__list'),
  pagination: document.querySelector('#tui-pagination-container'),
  searchResField: document.querySelector('.js-search-results'),
  warningField: document.querySelector('.js-warning'),
};

const pagination = new Pagination(refs.pagination, options);

const onSearchBtnClick = event => {
  //   console.log('click');
  event.preventDefault();

  userFilms.userSearch = event.target.elements.query.value.trim();

  if (!userFilms.userSearch) {
    refs.searchResField.textContent = '';
    refs.warningField.textContent = `Please write something in the field`;
    return;
  }

  // console.log(userFilms);

  userFilms
    .onSearchFilm()
    .then(data => {
      // console.log('onSearchFilm DATA', data);
      setTimeout(() => {
        cleanContainer();
        clearWarning();
        if (data.results.length === 0) {
          // Notiflix.Notify.failure(
          //   'Sorry, there are no videos matching your search query. Please try again.'
          // );

          refs.warningField.textContent = `Sorry, there no results found. Try searching for something else!`;
          refs.searchResField.textContent = '';

          refs.moviesList.innerHTML = noResults();
          refs.pagination.innerHTML = ' ';

          return;
        }

        // clearInput();

  


async function loadFirstPageOnSearch() {
 
  const response = await userFilms.onSearchFilm();

  console.log(response.total_results)

  pagination.reset(response.total_results)

  refs.moviesList.insertAdjacentHTML('beforeend', createMarkup(response))
  
};

loadFirstPageOnSearch()

        // refs.moviesList.innerHTML = createMarkup(data);
        refs.searchResField.textContent = `Hooray! We found ${data.total_results} results on request "${userFilms.userSearch}"!`;
        refs.searchResField.style.color = '#818181';
      });
    }, 1000)

    .catch(
      error => console.dir(error)
      //   Notiflix.Notify.failure("Error occured!")
    );
};
refs.formEl.addEventListener('submit', onSearchBtnClick);

function noResults() {
  clearInput();
  return `<li class="no-results"><img src='https://i.gifer.com/4m3f.gif' alt="No results"   class="img_r"/></li>`;
}
function clearInput() {
  refs.inputEl.value = '';
}

function clearWarning() {
  refs.warningField.innerHTML = '';
}



pagination.on('afterMove', loadMoreFilmsOnSearch);

async function loadMoreFilmsOnSearch(event) {

 cleanContainer();
 
 userFilms.page=event.page; 
 
  const response = await userFilms.onSearchFilm();

  console.log(response.total_results)

  pagination.setTotalItems(response.total_results)

  refs.moviesList.insertAdjacentHTML('beforeend', createMarkup(response))
  
};
