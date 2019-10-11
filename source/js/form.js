'use strict';

(function () {

  var InputFieldsState = {
    'email': false,
    'nickname': false,
    'password': false,
    'passwordDuplicate': false,
    'checkbox': false
  };

  var popup = document.querySelector(".pop-up");
  var popupForm = popup.querySelector(".pop-up__form");
  var fieldInputs = popupForm.querySelectorAll(".field-login__input");
  var mailInput = popupForm.querySelector('#mail');
  var nicknameInput = popupForm.querySelector('#name');
  var passwordInput = popupForm.querySelector('#password-field');
  var checkboxInput = popupForm.querySelector('.checkbox__input');
  var passwordDuplicateInput = popupForm.querySelector('#password-duplicate-field');
  var buttonForm = popupForm.querySelector('.pop-up__button');
  var passwordDuplicateErrorMessage = popupForm.querySelector('.field-login__error-message--password');
  var ruleMessageNumber = popupForm.querySelector('.field-login__rule-message--number');
  var ruleMessageLowerUpperCase = popupForm.querySelector('.field-login__rule-message--letter');
  var ruleMessageLimit = popupForm.querySelector('.field-login__rule-message--limit');
  var mailMatchErrorMessage = popupForm.querySelector('.field-login__error-message--emailmatch');
  var nicknameMatckErrorMessage = popupForm.querySelector('.field-login__error-message--nicknamematch');
  var nameWrongErrorMessage = popupForm.querySelector('.field-login__error-message--name-wrong');
  var mailWrongErrorMessage = popupForm.querySelector('.field-login__error-message--mail-wrong');
  var activeErrorMessageClass = popupForm.querySelector('.field-login__error-message--active');
  var typingTimer;
  var formTypingTimer;
  var doneTypingInterval = 1000;

  var showErrorMessage = function (element) {
    if(!activeErrorMessageClass) {
      element.classList.add('field-login__error-message--active');
    }
  };

  var removeErrorMessage = function (element) {
    if(element.classList.contains('field-login__error-message--active')) {
      element.classList.remove('field-login__error-message--active');
    }
  };

  var resetForm = function () {
    popupForm.reset();

    ruleMessageNumber.classList.remove('field-login__rule-message--ok');
    ruleMessageNumber.classList.remove('field-login__rule-message--error');
    ruleMessageLowerUpperCase.classList.remove('field-login__rule-message--ok');
    ruleMessageLowerUpperCase.classList.remove('field-login__rule-message--error');
    ruleMessageLimit.classList.remove('field-login__rule-message--ok');
    ruleMessageLimit.classList.remove('field-login__rule-message--error');

    removeErrorMessage(nameWrongErrorMessage);
    removeErrorMessage(mailWrongErrorMessage);
    removeErrorMessage(mailMatchErrorMessage);
    removeErrorMessage(nicknameMatckErrorMessage);
    removeErrorMessage(passwordDuplicateErrorMessage);

    fieldInputs.forEach(function(item) {
      item.classList.remove("field-login__input--error");
    })
  };

  var checkPasswordAndEmailMismatch = function () {
    if (passwordInput.value === mailInput.value && (passwordInput.value || mailInput.value)) {
      showErrorMessage(mailMatchErrorMessage);
      passwordInput.classList.add('field-login__input--error');
      InputFieldsState.password = false;
    } else {
      removeErrorMessage(mailMatchErrorMessage);
      passwordInput.classList.remove('field-login__input--error');
    }
  };

  var checkNicknameAndPasswordMismatch = function () {
    if (passwordInput.value === nicknameInput.value && (passwordInput.value || nicknameInput.value)) {
      showErrorMessage(nicknameMatckErrorMessage);
      passwordInput.classList.add('field-login__input--error');
      InputFieldsState.password = false;
    } else {
      removeErrorMessage(nicknameMatckErrorMessage);
      passwordInput.classList.remove('field-login__input--error');
    };
  };

  var checkPasswordMatch = function () {
    if (passwordInput.value !== passwordDuplicateInput.value) {
      showErrorMessage(passwordDuplicateErrorMessage);
      passwordDuplicateInput.classList.add('field-login__input--error');
      InputFieldsState.passwordDuplicate = false;
    } else {
      removeErrorMessage(passwordDuplicateErrorMessage);
      passwordDuplicateInput.classList.remove('field-login__input--error');
      InputFieldsState.passwordDuplicate = true;
    }
  };

  mailInput.addEventListener('input', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(validateEmailInput, doneTypingInterval);
  });

  var validateEmailInput = function () {
    var reg = /^\w{1,}@\w{1,}\.\w{1,}$/;

    if (reg.test(mailInput.value) && mailInput.value) {
      InputFieldsState.email = true;
    }

    if (!reg.test(mailInput.value) && mailInput.value) {
      showErrorMessage(mailWrongErrorMessage);
      mailInput.classList.add('field-login__input--error');
      InputFieldsState.email = false;
    } else {
      removeErrorMessage(mailWrongErrorMessage);
      mailInput.classList.remove('field-login__input--error');
    };
  };

  nicknameInput.addEventListener('input', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(validateNicknameInput, doneTypingInterval);
  });

  var validateNicknameInput = function () {
    var reg = /^[a-zA-Z][a-zA-Z0-9-_;]{2,40}$/;

    if (!reg.test(nicknameInput.value) && nicknameInput.value) {
      showErrorMessage(nameWrongErrorMessage);
      nicknameInput.classList.add('field-login__input--error');
      InputFieldsState.nickname = false;
    } else {
      removeErrorMessage(nameWrongErrorMessage);
      nicknameInput.classList.remove('field-login__input--error');
      InputFieldsState.nickname = true;
    };
  };

  passwordInput.addEventListener('input', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(validatePasswordInput, doneTypingInterval);
  });

  var validatePasswordInput = function () {
    var regNumb = /.*\d.*/;
    var regLetterLowerUpperCase = /(?=.*[A-Z])(?=.*[a-z]).*/;
    var regLimit = /^.{6,32}$/;

    if (regNumb.test(passwordInput.value)) {
      ruleMessageNumber.classList.add('field-login__rule-message--ok');
      ruleMessageNumber.classList.remove('field-login__rule-message--error');
    } else if(ruleMessageNumber.classList.contains('field-login__rule-message--ok') && !regNumb.test(passwordInput.value)) {
      ruleMessageNumber.classList.remove('field-login__rule-message--ok');
      ruleMessageNumber.classList.add('field-login__rule-message--error');
      InputFieldsState.password = false;
    };

    if (regLetterLowerUpperCase.test(passwordInput.value)) {
      ruleMessageLowerUpperCase.classList.add('field-login__rule-message--ok');
      ruleMessageLowerUpperCase.classList.remove('field-login__rule-message--error');
    } else if (ruleMessageLowerUpperCase.classList.contains('field-login__rule-message--ok') && !regLetterLowerUpperCase.test(passwordInput.value)) {
      ruleMessageLowerUpperCase.classList.remove('field-login__rule-message--ok');
      ruleMessageLowerUpperCase.classList.add('field-login__rule-message--error');
      InputFieldsState.password = false;
    };

    if (regLimit.test(passwordInput.value)) {
      ruleMessageLimit.classList.add('field-login__rule-message--ok');
      ruleMessageLimit.classList.remove('field-login__rule-message--error');
    } else if (ruleMessageLimit.classList.contains('field-login__rule-message--ok') && !regLimit.test(passwordInput.value)) {
      ruleMessageLimit.classList.remove('field-login__rule-message--ok');
      ruleMessageLimit.classList.add('field-login__rule-message--error');
      InputFieldsState.password = false;
    };

    if (regNumb.test(passwordInput.value) && regLetterLowerUpperCase.test(passwordInput.value) && regLimit.test(passwordInput.value)) {
      if (passwordInput.value !== mailInput.value && passwordInput.value !== nicknameInput.value && mailInput.value && nicknameInput.value) {
        InputFieldsState.password = true;
      }
    };

    checkPasswordAndEmailMismatch();
    checkNicknameAndPasswordMismatch();
  };

  passwordDuplicateInput.addEventListener('input', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(validatePasswordDuplicateInput, doneTypingInterval);
  });

  var validatePasswordDuplicateInput = function () {
    checkPasswordMatch();
  };

  checkboxInput.addEventListener('change', function () {
    if (checkboxInput.checked) {
      InputFieldsState.checkbox = true;
    } else {
      InputFieldsState.checkbox = false;
    }
  });

  popupForm.addEventListener('input', function () {
    clearTimeout(formTypingTimer);
    formTypingTimer = setTimeout(unlockSubmit, doneTypingInterval);
  });

  var validateForm = function () {
    for (var state in InputFieldsState) {
      if(InputFieldsState[state] === false) {
        return true;
      }
    }
    return false;
  };

  var unlockSubmit = function () {
    console.log(InputFieldsState);
    buttonForm.disabled = validateForm();
  };

  window.form = {
    popup: popup,
    resetForm: resetForm,
  }
})();
