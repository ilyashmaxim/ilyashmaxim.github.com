var savedEmails = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];
(function(emails) {
	'use strict';
	var usedEmails = emails.slice();
	var form = document.forms[0];
	var buttonSubmit = form.querySelector('button');
	var vaidate = {
		email: {
			errorType: 'Error in email',
			func: function(someString) {
				return someString.search(/\w+@\w+\.\w+/) === -1;
			},
		},
		password: {
			errorType: 'Short or non correct password (only number or char)',
			func: function(someString) {
				return someString.length < 5 || someString.search(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/) === -1;
			},
		},
		phone: {
			errorType: 'Not international standart (+380*********)',
			func: function(someString) {
				return someString.search(/^[\+](?=380)\d*$/) === -1;
			},
		},
		rulse: {
			errorType: 'Must be checked',
			func: function(someString, node) {
				return !node.checked;
			},
		},
	};
	var checkValid = {
		email: false,
		password: false,
		phone: null,
		rulse: false,
	};

	function createValid(rulse, node) {
		function someValid() {
			var rulseToValid = rulse;
			var stringForValid = node.value;
			var nodeID = node.id;
			if (rulseToValid.func(stringForValid, node)) {
				ShowError(node, rulseToValid.errorType);
				checkValid[nodeID] = false;
			} else {
				HideError(node);
				checkValid[nodeID] = true;
			}
			GlobalValid();
		}
		node.addEventListener('click', someValid);
		node.addEventListener('input', someValid);
	}
	for (var id in vaidate) {
		var type = document.getElementById(id);
		createValid(vaidate[id], type);
	}

	function ShowError(node, errorMassage) {
		node.classList.add('alert');
		node.classList.add('alert-danger');
		node.parentNode.classList.add('has-error');
		if (node.parentNode.lastChild.className !== 'alert alert-danger') {
			var div = document.createElement('div');
			div.className = 'alert alert-danger';
			div.textContent = errorMassage;
			node.parentNode.appendChild(div);
		}
	}

	function HideError(node) {
		node.classList.remove('alert');
		node.classList.remove('alert-danger');
		node.parentNode.classList.remove('has-error');
		node.classList.add('form-control');
		if (node.parentNode.lastChild.className === 'alert alert-danger') {
			node.parentNode.removeChild(node.parentNode.lastChild);
		}
	}

	function GlobalValid() {
		var keys = [];
		for (var prop in checkValid) {
			keys.push(checkValid[prop]);
		}
		if (keys.indexOf(false) === -1) {
			buttonSubmit.classList.remove('disabled');
			return true;
		} else {
			//event.preventDefault();
			buttonSubmit.classList.add('disabled');
			return false;
		}
	}

	form.addEventListener('submit', GlobalValid);
})(savedEmails);