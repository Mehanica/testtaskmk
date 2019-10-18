'use strict';

(function () {

  var close = window.form.popup.querySelector(".pop-up__close");

  var linkClickHandler = function (evt) {
    evt.preventDefault();

    window.form.popup.classList.add("pop-up--active");
  };

  window.form.link.addEventListener('click', linkClickHandler);

  var closeClickHandler = function () {
    window.form.resetForm();

    window.form.popup.classList.remove("pop-up--active");
  };

  var escKeydownHandler = function (evt){
    if (evt.keyCode === 27) {
      evt.preventDefault();

      window.form.resetForm();

      if (window.form.popup.classList.contains("pop-up--active")) {
        window.form.popup.classList.remove("pop-up--active");
      }
    }
  }

  window.addEventListener("keydown", escKeydownHandler);
  close.addEventListener('click', closeClickHandler);
})();
