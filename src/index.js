console.log('This is the nµa frontend project!');

fetch('/api/').then(response => {
  response.json().then(data => console.log(
    `Recieved from backend: ${data.text}`
  ));
});
