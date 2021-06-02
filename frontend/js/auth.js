import { signIn, signUp } from './api/auth.js';

const signUpForm = document.querySelector('#signup form');
const signInForm = document.querySelector('#login form');

signUpForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const name = signUpForm.elements.namedItem('name').value;
	const email = signUpForm.elements.namedItem('email').value;
	const password = signUpForm.elements.namedItem('password').value;

	try {
		await signUp({ name, email, password });
		window.location.href = '/';
	}
	catch (err) {
		alert('Помилка');
		console.error(err);
	}
});

signInForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const email = signInForm.elements.namedItem('email').value;
	const password = signInForm.elements.namedItem('password').value;

	try {
		await signIn({ email, password });
		window.location.href = '/';
	}
	catch (err) {
		alert('Помилка');
		console.error(err);
	}
});

// View
$('.form').find('input, textarea').on('keyup blur focus', function (e) {

	const $this = $(this),
		label = $this.prev('label');

	if (e.type === 'keyup') {
		if ($this.val() === '') {
			label.removeClass('active highlight');
		}
		else {
			label.addClass('active highlight');
		}
	}
	else if (e.type === 'blur') {
		if ($this.val() === '') {
			label.removeClass('active highlight');
		}
		else {
			label.removeClass('highlight');
		}
	}
	else if (e.type === 'focus') {

		if ($this.val() === '') {
			label.removeClass('highlight');
		}
		else if ($this.val() !== '') {
			label.addClass('highlight');
		}
	}

});

$('.tab a').on('click', function (e) {

	e.preventDefault();

	$(this).parent().addClass('active');
	$(this).parent().siblings().removeClass('active');

	const target = $(this).attr('href');

	$('.tab-content > div').not(target).hide();

	$(target).fadeIn(600);
});
