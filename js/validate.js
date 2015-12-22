(function() {
	'use strict';
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

		function AJAXValid() {
			var checkMailRequest;
			if (checkMailRequest) checkMailRequest.stop();
			checkMailRequest = SendRequest(CheckUniqMail,this);
		}
		if (node.id === 'email') {
			node.addEventListener('input', AJAXValid);
		}
		node.addEventListener('click', someValid);
		node.addEventListener('input', someValid);
	}
	for (var id in vaidate) {
		var type = document.getElementById(id);
		createValid(vaidate[id], type);
	}

	function SendRequest(callback,node) {
		var request = new XMLHttpRequest();
		var READY_STATE = 4;
		request.open('get', './js/mail.json');
		request.onreadystatechange = function() {
			if (request.readyState === READY_STATE) {
				callback(request.responseText,node);
			}
		};
		request.send();
		return request;
	}

	function CheckUniqMail(resp, node) {
		var stringForValid = node.value;
		var nodeID = node.id;
		var requestParse = JSON.parse(resp);
		for (var key in requestParse) {
			//debugger
			console.log(requestParse[key]);
			if (requestParse[key].indexOf(stringForValid) !== -1) {
				ShowError(node, "Email used");
				checkValid[nodeID] = false;
			} else {
				//HideError(node);
				checkValid[nodeID] = true;
			}
		}
		GlobalValid();
	}

	function findParent(node) {
		var container;

		(function findContainer(node) {
			if (node.parentNode.classList.contains('form-group')) {
				return container = node.parentNode;
			} else {
				findContainer(node.parentNode);
			}
		})(node);
		return container;
	}

	function ShowError(node, errorMassage) {
		var container = findParent(node);
		container.classList.add('has-error');
		if (node.parentNode.lastChild.className !== 'alert alert-danger') {
			var div = document.createElement('div');
			div.className = 'alert alert-danger';
			div.textContent = errorMassage;
			node.parentNode.appendChild(div);
		}
	}

	function HideError(node) {
		var container = findParent(node);
		container.classList.remove('has-error');
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
		} else {
			//event.preventDefault();
			buttonSubmit.classList.add('disabled');
			return false;
		}
	}

	form.addEventListener('submit', GlobalValid);
})();