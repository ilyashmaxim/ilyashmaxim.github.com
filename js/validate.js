"Use Strict";
(function() {

	var usedEmails = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];
	var form = document.forms[0];
	var buttonSubmit = form.querySelector('button');
	var mailString;
	var passwordString;
	var phoneString;
	var mailRegExp = /\w+@\w+\.\w+/;
	var passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/;
	var phoneRegExp = /^[\+](?=380)\d*$/;
	var timing;
	var checkValid = {
		mail: false,
		pass: false,
		phone: null,
		ruls: null,
	};

	function EmeilDynamicValid() {
		var _self = this;
		timing = setInterval(function() {
			mailString = email.value;
			console.log(mailString);
			if (mailString.search(mailRegExp) === -1) {
				AddClassError(_self);
				checkValid.mail = false;
			} else {
				AddClassNormal(_self);
				clearInterval(timing);
				checkValid.mail = true;
			}
		}, 3000);
	}
	email.addEventListener('input', EmeilDynamicValid);

	function AddClassError(_this) {
		_this.classList.add('alert');
		_this.classList.add('alert-danger');
		_this.parentNode.classList.add('has-error');
		if (_this.parentNode.lastChild.className !== 'alert alert-danger') {
			var div = document.createElement('div');
			div.className = 'alert alert-danger';
			div.textContent = 'Error!';
			_this.parentNode.appendChild(div);
		}
	}

	function AddClassNormal(_this) {
		_this.classList.remove('alert');
		_this.classList.remove('alert-danger');
		_this.parentNode.classList.remove('has-error');
		_this.classList.add('form-control');
		if (_this.parentNode.lastChild.className === 'alert alert-danger') {
			_this.parentNode.removeChild(_this.parentNode.lastChild);
		}
	}

	function PasswordValid() {
		passwordString = password.value;
		if (passwordString.length < 5 || passwordString.search(passwordRegExp) < 0) {
			AddClassError(this);
			checkValid.pass = false;
		} else {
			AddClassNormal(this);
			checkValid.pass = true;
		}
	}
	password.addEventListener('input', PasswordValid);

	function PhoneValid() {
		var _self = this;
		var timing1 = setInterval(function() {
			phoneString = phone.value;
			console.log(phoneString);
			if (phoneString.search(phoneRegExp) === -1) {
				AddClassError(_self);
				checkValid.phone = false;
			} else {
				AddClassNormal(_self);
				clearInterval(timing1);
				checkValid.phone = true;
			}
		}, 4000);
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
})();