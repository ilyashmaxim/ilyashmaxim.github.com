var savedEmails = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];
(function(emails) {
	'Use Strict';
	var usedEmails = emails.slice();
	var form = document.forms[0];
	var buttonSubmit = form.querySelector('button');
	var regExp = {
		mail: /\w+@\w+\.\w+/,
		password: /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/,
		phone: /^[\+](?=380)\d*$/,
	};
	var errorType = {
		mail: 'Error in email',
		pass: 'Short or non correct password (only number or char)',
		phone: 'Not international standart (+380*********)',
		ruls: null,
	};
	var checkValid = {
		mail: false,
		pass: false,
		phone: null,
		ruls: null,
	};

	function EmeilDynamicValid() {
		var email = document.getElementById('email');
		var mailString = email.value;
		if (mailString.search(regExp.mail) === -1) {
			ShowError(this, errorType.mail);
			checkValid.mail = false;
		} else {
			HideError(this);
			checkValid.mail = true;
		}
	}
	email.addEventListener('input', EmeilDynamicValid);

	function ShowError(_this, errorMassage) {
		_this.classList.add('alert');
		_this.classList.add('alert-danger');
		_this.parentNode.classList.add('has-error');
		if (_this.parentNode.lastChild.className !== 'alert alert-danger') {
			var div = document.createElement('div');
			div.className = 'alert alert-danger';
			div.textContent = errorMassage;
			_this.parentNode.appendChild(div);
		}
	}

	function HideError(_this) {
		_this.classList.remove('alert');
		_this.classList.remove('alert-danger');
		_this.parentNode.classList.remove('has-error');
		_this.classList.add('form-control');
		if (_this.parentNode.lastChild.className === 'alert alert-danger') {
			_this.parentNode.removeChild(_this.parentNode.lastChild);
		}
	}

	function PasswordValid() {
		var password = document.getElementById('password');
		var passwordString = password.value;
		if (passwordString.length < 5 || passwordString.search(regExp.password) < 0) {
			ShowError(this, errorType.pass);
			checkValid.pass = false;
		} else {
			HideError(this);
			checkValid.pass = true;
		}
	}
	password.addEventListener('input', PasswordValid);

	function PhoneValid() {
		var phone = document.getElementById('phone');
		var phoneString = phone.value;
		if (phoneString.search(regExp.phone) === -1) {
			ShowError(this, errorType.phone);
			checkValid.phone = false;
		} else {
			HideError(this);
			checkValid.phone = true;
		}
	}
	phone.addEventListener('input', PhoneValid);

	function CheckValid() {
		if (form.elements[4].checked) {
			buttonSubmit.classList.remove('disabled');
			checkValid.ruls = true;
		} else {
			buttonSubmit.classList.add('disabled');
			checkValid.ruls = false;
		}
	}
	form.elements[4].addEventListener('click', CheckValid);

	function GlobalValid() {
		var keys = [];
		for (var prop in checkValid) {
			keys.push(checkValid[prop]);
		}
		if (keys.indexOf(false) === -1) {
			return true;
		} else {
			return false;
		}
	}

	form.addEventListener('submit', GlobalValid);
})(savedEmails);