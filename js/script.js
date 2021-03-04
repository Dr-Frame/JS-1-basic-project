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

const deleteAdd = (arr) => {
  arr.forEach((item) => item.remove());
};
deleteAdd(addBlocksRef);

//2)
const makeChanges = (genre, bgRef) => {
  genre.textContent = "драма";
  bgRef.style.backgroundImage = "url(../img/bg.jpg)";
};
makeChanges(genre, promoBgRef);

filmListReneder();

formRef.addEventListener("submit", handleFilmAdd);

listItemRef.addEventListener("click", handleFilmsDelete);

// отвечает за удаление со списка и с базы данных
function handleFilmsDelete(event) {
  if (event.target.className === "delete") {
    const filmtToDelete = event.target.parentNode.textContent.slice(3);

    const filtered = movieDB.movies.filter((item) => item !== filmtToDelete);
    movieDB.movies = filtered;
    event.target.parentNode.remove();
    filmListReneder();
  }
}

//добавляет введенный фильм в список и отображает на странице
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

//проверяет галочку в чекбоксе
function checkChecked() {
  if (checkboxRef.checked) {
    console.log("Добавляем любимый фильм");
  }
}

//все для рендеринга
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

// строка рендеринга (для добавление в масив списка)
function liCreator(film, i) {
  const toInsert = `<li class="promo__interactive-item">${
    i + 1
  }. ${film}<div class="delete"></div></li>`;
  return toInsert;
}

// функция для типизации ввода (первая заглавная, остальные маленькие)
function capitalizer(string) {
  const capitalizedString =
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  return capitalizedString;
}
