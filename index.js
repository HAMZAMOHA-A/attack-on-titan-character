document.addEventListener('DOMContentLoaded', () => {
    const characterList = document.getElementById('character-list');
    const loadButton = document.getElementById('load-button');

    // Function to fetch character data
    function loadCharacters() {
        // Change this URL based on how you're serving the JSON
        fetch('http://localhost:3000/characters') // for json-server
        // fetch('db.json') // for static server
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                characterList.innerHTML = ''; // Clear previous characters
                data.forEach(character => {
                    const card = document.createElement('div');
                    card.className = 'character-card';
                    card.innerHTML = `
                        <img src="${character.image}" alt="${character.name}">
                        <h2>${character.name}</h2>
                        <p>${character.detail}</p>
                    `;
                    characterList.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error fetching character data:', error);
            });
    }

    // Add event listener to the button
    loadButton.addEventListener('click', loadCharacters);
});
