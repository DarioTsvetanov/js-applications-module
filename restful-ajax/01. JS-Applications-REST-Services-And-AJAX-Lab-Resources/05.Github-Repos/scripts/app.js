function loadRepos() {
	
	const username = document.querySelector('#username');
	
	const reposList = document.querySelector('#repos');

	const url = `https://api.github.com/users/${username.value}/repos`;

	const httpRequest = new XMLHttpRequest();

	httpRequest.addEventListener('loadend', function() {

		const parsed = JSON.parse(this.responseText);

		reposList.innerHTML = parsed.map(x => `<li><a href="${x.html_url}">${x.full_name}</a></li>`).join('');
	});

	httpRequest.open('GET', url);
	httpRequest.send();
}