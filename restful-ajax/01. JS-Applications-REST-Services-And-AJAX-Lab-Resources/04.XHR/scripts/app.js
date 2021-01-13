function loadRepos() {
   
   const url = 'https://api.github.com/repos/testnakov/test-nakov-repo/issues/1051';
   const httpRequest = new XMLHttpRequest();
   const div = document.querySelector('#res');

   httpRequest.open('GET', url);

   httpRequest.addEventListener('readystatechange', function() {

      if (httpRequest.readyState == '4') div.textContent = this.responseText;
   });

   httpRequest.send();
}