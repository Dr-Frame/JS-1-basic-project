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
    "Игра пристолов",
  ],
};

//1)
const addBlocksRef = document.querySelectorAll(".promo__adv img");
addBlocksRef.forEach((item) => item.remove());

//2)
const genre = document.querySelector(".promo__genre");
genre.textContent = "драма";

// 3)
const promoBgRef = document.querySelector(".promo__bg");
promoBgRef.style.backgroundImage = "url(../img/bg.jpg)";

/* promoBgRef.style.background =
  "url(../img/bg.jpg) center center/cover no-repeat"; */

// 4,5))
movieDB.movies.sort();

// ==== вариант если всегда показывает только 5 фильмов на странице ===============

/* const listItemRef = document.querySelectorAll(".promo__interactive-item");

listItemRef.forEach((item, i) => {
  item.textContent = `${i + 1}. ${movieDB.movies[i]}`;
}); */

// === вариант если рендерим страницу где больше чем 5 вариантов может быть ==============

const listItemRef = document.querySelector(".promo__interactive-list");
listItemRef.innerHTML = "";

movieDB.movies.forEach((film, i) => {
  const toInsert = `<li class="promo__interactive-item">${
    i + 1
  }. ${film}<div class="delete"></div></li>`;

  listItemRef.insertAdjacentHTML("beforeend", toInsert);
});
