/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

"use strict";

const movieDB = {
  movies: [
    "Логан",
    "Лига справедливости",
    "Ла-ла лэнд",
    "Одержимость",
    "Скотт Пилигрим против...",
  ],
};

const addBlocksRef = document.querySelectorAll(".promo__adv img");
const genre = document.querySelector(".promo__genre");
const promoBgRef = document.querySelector(".promo__bg");
const listItemRef = document.querySelector(".promo__interactive-list");
const formRef = document.querySelector("#js-form");
const inputRef = formRef.querySelector("input");
const checkboxRef = formRef.querySelector('input[type="checkbox"]');
console.dir(checkboxRef);

//1)
addBlocksRef.forEach((item) => item.remove());

//2)
genre.textContent = "драма";

// 3)
promoBgRef.style.backgroundImage = "url(../img/bg.jpg)";

// 4,5))

filmListReneder();

formRef.addEventListener("submit", handleFilmAdd);

listItemRef.addEventListener("click", handleFilmsDelete);

function handleFilmsDelete(event) {
  if (event.target.className === "delete") {
    const filmtToDelete = event.target.parentNode.textContent.slice(3);

    const filtered = movieDB.movies.filter((item) => item !== filmtToDelete);
    movieDB.movies = filtered;
    event.target.parentNode.remove();
    filmListReneder();
  }
}

function handleFilmAdd(event) {
  event.preventDefault();
  const filmToAdd = capitalizer(inputRef.value);

  if (filmToAdd.length > 21) {
    const newWord = `${filmToAdd.split("").slice(0, 20).join("")}...`;
    movieDB.movies.push(newWord);
  } else if (filmToAdd === "") {
    return;
  } else {
    movieDB.movies.push(filmToAdd);
  }

  checkChecked();
  formRef.reset();
  filmListReneder();
}

function checkChecked() {
  if (checkboxRef.checked) {
    console.log("Добавляем любимый фильм");
  }
}

function filmListReneder() {
  // фильтр уникальных значений
  movieDB.movies = [...new Set(movieDB.movies)];

  //сортируем по алфавиту
  movieDB.movies.sort();

  // чистим список
  listItemRef.innerHTML = "";

  //рендерим разметки списка
  const newArray = movieDB.movies.map((item, i) => liCreator(item, i));
  listItemRef.insertAdjacentHTML("afterbegin", newArray.join(""));
}

function liCreator(film, i) {
  const toInsert = `<li class="promo__interactive-item">${
    i + 1
  }. ${film}<div class="delete"></div></li>`;
  return toInsert;
}

function capitalizer(string) {
  const capitalizedString =
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  return capitalizedString;
}

// ==== вариант если всегда показывает только 5 фильмов на странице ===============

/* const listItemRef = document.querySelectorAll(".promo__interactive-item");

listItemRef.forEach((item, i) => {
  item.textContent = `${i + 1}. ${movieDB.movies[i]}`;
}); */

/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */
