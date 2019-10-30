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

var fireballColorData = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var SIMILAR_HEROES_QUANTITY = 4;


// Вызов модального окна
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var inputUsername = setup.querySelector('.setup-user-name');


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== inputUsername) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomElement = function (arr) {
  var randomIndexArray = Math.floor(Math.random() * arr.length);
  return arr[randomIndexArray];
};

var getSimilarRandomHeroes = function (quantity, names, surnames, coats, eyes) {
  var similarRandomHeroesArray = [];
  for (var i = 0; i < quantity; i++) {
    var similarRandomHero = {};
    similarRandomHero['name'] = getRandomElement(names) + ' ' + getRandomElement(surnames);
    similarRandomHero['coatColor'] = getRandomElement(coats);
    similarRandomHero['eyesColor'] = getRandomElement(eyes);
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

var fragment = document.createDocumentFragment();
for (var i = 0; i < heroes.length; i++) {
  fragment.appendChild(renderWizard(heroes[i]));
}
similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');


// Настройка цветов волшебника
var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardCoatHiddenInput = document.querySelector('.setup-wizard-appearance input[name=coat-color]');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardEyesHiddenInput = document.querySelector('.setup-wizard-appearance input[name=eyes-color]');
var fireballSetup = document.querySelector('.setup-fireball-wrap');
var fireballSetupHiddenInput = fireballSetup.querySelector('input[name=fireball-color]');


// функция getNextValueFromArr последовательно перебирающая массив, переходя на следующий индекс при условии, что текущее значение не последнее в массиве (если последнее, то начинается сначала)

var getNextValueFromArr = function (dataArr, currentValue) {
  var currentArrIndex = dataArr.indexOf(currentValue);
  if (currentArrIndex < dataArr.length - 1) {
    return dataArr[currentArrIndex + 1];
  } else {
    return dataArr[0];
  }
};

// Изменение цвета мантии по нажатию
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getNextValueFromArr(coatColorData, wizardCoat.style.fill);
  wizardCoatHiddenInput.value = wizardCoat.style.fill;
});

// Изменение цвета глаз волшебника по нажатию
wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getNextValueFromArr(eyesColorData, wizardEyes.style.fill);
  wizardEyesHiddenInput.value = wizardEyes.style.fill;
});

// Изменение цвета фаербола по нажатию
fireballSetup.addEventListener('click', function () {
  var randomElement = getRandomElement(fireballColorData);
  fireballSetup.style.backgroundColor = randomElement;
  fireballSetupHiddenInput.value = randomElement;
});

