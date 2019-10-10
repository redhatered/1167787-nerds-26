function initMap (ymaps) {
  var myMap = new ymaps.Map('map', {
    center: [59.938631, 30.323055],
    zoom: 17,
    controls: []
  });

  myMap.geoObjects
    .add(new ymaps.Placemark([59.938631, 30.323055], {
    }, {
      iconColor: '#0095b6'
    }))
}
document.addEventListener('DOMContentLoaded', function () {

  var sliderButtons = document.querySelectorAll('.slider-controls-item');
  var sliderItems = document.querySelectorAll('.slider-item');

  var writeUsButton = document.querySelector('.btn-contacts');
  var modal = document.querySelector('.modal');
  var closeButton = modal.querySelector('.modal__close');

  var form = modal.querySelector('form');
  var name = modal.querySelector('[name=name]');
  var email = modal.querySelector('[name=email]');
  var text = modal.querySelector('[name=text]');

  var isStorageSupport = true;
  var storageName = '';
  var storageEmail = '';

  var inputErrorClass = 'write-us__input--error';
  var modalActiveClass = 'modal--active';
  var modalErrorClass = 'modal--error';
  var sliderControlsActiveClass = 'slider-controls-item--active';
  var sliderItemActiveClass = 'slider-item--active';

  try {
    storageName = localStorage.getItem('name');
    storageEmail = localStorage.getItem('email');
  } catch (err) {
    isStorageSupport = false;
  }

  sliderButtons.forEach(function (sliderButton, key) {
    sliderButton.addEventListener('click', function (e) {
      e.preventDefault();

      sliderButtons.forEach(function (_sliderButton) {
        _sliderButton.classList.remove(sliderControlsActiveClass);
      });

      sliderItems.forEach(function (sliderItem) {
        sliderItem.classList.remove(sliderItemActiveClass);
      });

      sliderButton.classList.add(sliderControlsActiveClass);
      sliderItems[key].classList.add(sliderItemActiveClass);
    });
  });

  writeUsButton.addEventListener('click', function (e) {
    e.preventDefault();

    modal.classList.add(modalActiveClass);

    if (storageName && storageEmail) {
      text.focus();
      name.value = storageName;
      email.value = storageEmail;
    } else {
      name.focus();
    }
  });

  closeButton.addEventListener('click', function (e) {
    e.preventDefault();

    closeModal();
  });


  form.addEventListener('submit', function (e) {
    name.classList.remove(inputErrorClass);
    email.classList.remove(inputErrorClass);
    text.classList.remove(inputErrorClass);

    if (!name.value || !email.value || !text.value) {
      e.preventDefault();

      if (!name.value) {
        name.classList.add(inputErrorClass);
      }

      if (!email.value) {
        email.classList.add(inputErrorClass);
      }

      if (!text.value) {
        text.classList.add(inputErrorClass);
      }

      modal.classList.remove(modalErrorClass);
      modal.offsetWidth = modal.offsetWidth;
      modal.classList.add(modalErrorClass);

    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', name.value);
        localStorage.setItem('email', email.value);
      }
    }
  });

  window.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
      e.preventDefault();
      if (modal.classList.contains(modalActiveClass)) {
        closeModal();
      }
    }
  });

  function closeModal() {
    modal.classList.remove(modalActiveClass);
    name.classList.remove(inputErrorClass);
    email.classList.remove(inputErrorClass);
    text.classList.remove(inputErrorClass);
    modal.classList.remove(modalErrorClass);
    name.value = '';
    email.value = '';
    text.value = '';
  }

});
