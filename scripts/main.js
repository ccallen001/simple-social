const btn = document.querySelector('BUTTON');
const inp = document.querySelector('INPUT');
const display = document.querySelector('UL');

let messages = null;

function renderMessages() {
	display.innerHTML = messages
		.map(msg => `
			<li class="message">
				<h3>${msg.author}</h3>: <span>"${msg.text}"</span>
				<p>${new Date(msg.id)}</p>
			</li>
		`)
		.join('');
}

function getMessages() {
	fetch(
		'/messages',
		{ method: 'get' }
	)
		.then(resp => resp.json())
		.then(jsonData => {
			messages = jsonData;

			renderMessages();
		})
		.catch(err => {
			alert('Whoops! There was an error getting the messages.');
			console.error(err);
		});
}
getMessages();

function submitMessage() {
	const msg = inp.value;
	inp.value = null;

	if (!msg) {
		alert('Whoops! Looks like you forgot to write a message.');
	} else {
		fetch(
			'/messages',
			{
				method: 'post',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					author: 'anonymous',
					id: Date.now(),
					text: msg
				})
			}
		)
			.then(() => {
				getMessages();
				renderMessages();
			})
			.catch(err => {
				alert('Whoops! There was an error posting your message.');
				console.error(err);
			});
	}
}

btn.addEventListener('click', submitMessage);