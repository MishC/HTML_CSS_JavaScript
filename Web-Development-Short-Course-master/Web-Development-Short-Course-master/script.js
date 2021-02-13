let submitButton = document.querySelector('#submit-button');
let dummy=['crap', 'fuck'];

function emailValidate(email) {
	return email.includes('@');
}

function validateNSFW(message, dummy) {	
	let value =0;	
	dummy.forEach(function(word){
		value = value + message.split(" ").includes(word)});
	return (value>0)		
}

function clickListener(event) {
	event.preventDefault();
	let emailInput = document.querySelector('#email');
	let messageInput = document.querySelector('#message');

	let emailText = emailInput.value;
	let messageText = messageInput.value;

	if(emailValidate(emailText) !== true) {
		console.log('The email address must contain @');
		return false;
	}

	if(validateNSFW(messageText, dummy) == true) {
		console.log('Please, do not use expressive words')
		return false;
	}
	else {
	console.log('Thanks for your message');
	 return true;}
	}
submitButton.addEventListener('click', clickListener);
 


