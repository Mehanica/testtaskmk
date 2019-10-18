'use strict';

(function () {

  var InputFieldsState = {
    'email': false,
    'nickname': false,
    'password': false,
    'passwordDuplicate': false,
    'checkbox': false
  };

  var link = document.querySelector('.main__button');
  var popup = document.querySelector('.pop-up');
  var popupForm = popup.querySelector('.pop-up__form');
  var fieldInputs = popupForm.querySelectorAll('.field-login__input');
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
  var regNumb = /.*\d.*/;
  var regLetterLowerUpperCase = /(?=.*[A-Z])(?=.*[a-z]).*/;
  var regLimit = /^.{6,32}$/;

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

  var checkPasswordAndMailAndNicknameMismatch = function () {
    if (passwordInput.value === mailInput.value && mailInput.value) {
      showErrorMessage(mailMatchErrorMessage);
      passwordInput.classList.add('field-login__input--error');
      InputFieldsState.password = false;
    } else if (passwordInput.value === nicknameInput.value && nicknameInput.value) {
      showErrorMessage(nicknameMatckErrorMessage);
      passwordInput.classList.add('field-login__input--error');
      InputFieldsState.password = false;
    } else if ((regNumb.test(passwordInput.value) && regLetterLowerUpperCase.test(passwordInput.value) && regLimit.test(passwordInput.value)) && (mailInput.value || nicknameInput.value)) {
      removeErrorMessage(mailMatchErrorMessage);
      removeErrorMessage(nicknameMatckErrorMessage);
      passwordInput.classList.remove('field-login__input--error');
      InputFieldsState.password = true;
    }
  };

  var checkPasswordMatch = function () {
    if (passwordInput.value !== passwordDuplicateInput.value && passwordDuplicateInput.value) {
      showErrorMessage(passwordDuplicateErrorMessage);
      passwordDuplicateInput.classList.add('field-login__input--error');
      InputFieldsState.passwordDuplicate = false;
    } else if (passwordInput.value !== passwordDuplicateInput.value && !passwordDuplicateInput.value) {
      removeErrorMessage(passwordDuplicateErrorMessage);
      passwordDuplicateInput.classList.remove('field-login__input--error');
      InputFieldsState.passwordDuplicate = false;
    } else if (passwordInput.value === passwordDuplicateInput.value && !passwordDuplicateInput.value) {
      removeErrorMessage(passwordDuplicateErrorMessage);
      passwordDuplicateInput.classList.remove('field-login__input--error');
      InputFieldsState.passwordDuplicate = false;
    } else {
      removeErrorMessage(passwordDuplicateErrorMessage);
      passwordDuplicateInput.classList.remove('field-login__input--error');
      InputFieldsState.passwordDuplicate = true;
    };
  };


  mailInput.addEventListener('input', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(validateEmailInput, doneTypingInterval);
  });

  var validateEmailInput = function () {
    var reg = /.+@.+\..+/i;

    if (reg.test(mailInput.value) && mailInput.value) {
      removeErrorMessage(mailWrongErrorMessage);
      mailInput.classList.remove('field-login__input--error');
      InputFieldsState.email = true;
    } else if (!reg.test(mailInput.value) && mailInput.value){
      showErrorMessage(mailWrongErrorMessage);
      mailInput.classList.add('field-login__input--error');
      InputFieldsState.email = false;
    } else {
      removeErrorMessage(mailWrongErrorMessage);
      mailInput.classList.remove('field-login__input--error');
      InputFieldsState.email = false;
    };
    checkPasswordAndMailAndNicknameMismatch();
  };

  nicknameInput.addEventListener('input', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(validateNicknameInput, doneTypingInterval);
  });

  var validateNicknameInput = function () {
    var reg = /^[a-zA-Z][a-zA-Z0-9-_;]{2,40}$/;

    if (reg.test(nicknameInput.value) && nicknameInput.value) {
      removeErrorMessage(nameWrongErrorMessage);
      nicknameInput.classList.remove('field-login__input--error');
      InputFieldsState.nickname = true;
    } else if (!reg.test(nicknameInput.value) && nicknameInput.value){
      showErrorMessage(nameWrongErrorMessage);
      nicknameInput.classList.add('field-login__input--error');
      InputFieldsState.nickname = false;
    } else {
      removeErrorMessage(nameWrongErrorMessage);
      nicknameInput.classList.remove('field-login__input--error');
      InputFieldsState.nickname = false;
    };
    checkPasswordAndMailAndNicknameMismatch();
  };

  passwordInput.addEventListener('input', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(validatePasswordInput, doneTypingInterval);
  });

  var validatePasswordInput = function () {
    if (regNumb.test(passwordInput.value)) {
      ruleMessageNumber.classList.add('field-login__rule-message--ok');
      ruleMessageNumber.classList.remove('field-login__rule-message--error');
    } else if (ruleMessageNumber.classList.contains('field-login__rule-message--ok') && !regNumb.test(passwordInput.value)) {
      ruleMessageNumber.classList.remove('field-login__rule-message--ok');
      ruleMessageNumber.classList.add('field-login__rule-message--error');
      passwordInput.classList.add('field-login__input--error');
      InputFieldsState.password = false;
    };

    if (regLetterLowerUpperCase.test(passwordInput.value)) {
      ruleMessageLowerUpperCase.classList.add('field-login__rule-message--ok');
      ruleMessageLowerUpperCase.classList.remove('field-login__rule-message--error');
    } else if (ruleMessageLowerUpperCase.classList.contains('field-login__rule-message--ok') && !regLetterLowerUpperCase.test(passwordInput.value)) {
      ruleMessageLowerUpperCase.classList.remove('field-login__rule-message--ok');
      ruleMessageLowerUpperCase.classList.add('field-login__rule-message--error');
      passwordInput.classList.add('field-login__input--error');
      InputFieldsState.password = false;
    };

    if (regLimit.test(passwordInput.value)) {
      ruleMessageLimit.classList.add('field-login__rule-message--ok');
      ruleMessageLimit.classList.remove('field-login__rule-message--error');
    } else if (ruleMessageLimit.classList.contains('field-login__rule-message--ok') && !regLimit.test(passwordInput.value)) {
      ruleMessageLimit.classList.remove('field-login__rule-message--ok');
      ruleMessageLimit.classList.add('field-login__rule-message--error');
      passwordInput.classList.add('field-login__input--error');
      InputFieldsState.password = false;
    };

    if (regNumb.test(passwordInput.value) && regLetterLowerUpperCase.test(passwordInput.value) && regLimit.test(passwordInput.value)) {
      passwordInput.classList.remove('field-login__input--error');
      InputFieldsState.password = true;
    } else if (!passwordInput.value) {
      passwordInput.classList.remove('field-login__input--error');
      ruleMessageLimit.classList.remove('field-login__rule-message--error');
      ruleMessageLowerUpperCase.classList.remove('field-login__rule-message--error');
      ruleMessageNumber.classList.remove('field-login__rule-message--error');
      removeErrorMessage(mailMatchErrorMessage);
      removeErrorMessage(nicknameMatckErrorMessage);
      removeErrorMessage(passwordDuplicateErrorMessage);
    } else {
      passwordInput.classList.add('field-login__input--error');
      InputFieldsState.password = false;
    }
    checkPasswordAndMailAndNicknameMismatch();
    checkPasswordMatch();
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

  var toJSONString = function (form) {
    var obj = {};
    var elements = form.querySelectorAll('input, select, textarea');

    for (var i = 0; i < elements.length; ++i) {
      var element = elements[i];
      var name = element.name;
      var value = element.value;

      if(name) {
        obj[name] = value;
      }
    }
    return JSON.stringify(obj);
  };

  popupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    console.log(toJSONString(popupForm));
    popup.classList.remove('pop-up--active');
    link.classList.add('button--disabled-green');
  });

  window.form = {
    link: link,
    popup: popup,
    resetForm: resetForm
  }
})();
