'use strict';

var namesData = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var surnamesData = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColorData = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColorData = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var SIMILAR_HEROES_QUANTITY = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomIndexArray = function (arr) {
  var randomIndexArray = Math.floor(Math.random() * arr.length);
  return arr[randomIndexArray];
};

var getSimilarRandomHeroes = function (quantity, names, surnames, coats, eyes) {
  var similarRandomHeroesArray = [];
  for (var i = 0; i < quantity; i++) {
    var similarRandomHero = {};
    similarRandomHero['name'] = getRandomIndexArray(names) + ' ' + getRandomIndexArray(surnames);
    similarRandomHero['coatColor'] = getRandomIndexArray(coats);
    similarRandomHero['eyesColor'] = getRandomIndexArray(eyes);
    similarRandomHeroesArray.push(similarRandomHero);
  }
  return similarRandomHeroesArray;
};

var heroes = getSimilarRandomHeroes(SIMILAR_HEROES_QUANTITY, namesData, surnamesData, coatColorData, eyesColorData);


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var pasteWizardsInMarkup = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  similarListElement.appendChild(fragment);
};

pasteWizardsInMarkup(heroes);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
