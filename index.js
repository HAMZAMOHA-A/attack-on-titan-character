document.addEventListener('DOMContentLoaded', () => {
    const characterList = document.getElementById('character-list');
    const loadButton = document.getElementById('load-button');

    // Function to fetch character data
    function loadCharacters() {
        fetch('http://localhost:3000/characters') // for json-server
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
                        <h2 class="character-name" data-id="${character.id}">${character.name}</h2>
                        <p>${character.detail}</p>
                    `;
                    characterList.appendChild(card);
                });

                // Add event listeners for updating character details
                const characterNames = document.querySelectorAll('.character-name');
                characterNames.forEach(name => {
                    name.addEventListener('click', () => {
                        const characterId = name.dataset.id;
                        updateCharacterDetail(characterId);
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching character data:', error);
            });
    }

    // Function to update a character's detail
    function updateCharacterDetail(id) {
        const newDetail = prompt("Enter new detail for the character:");
        if (newDetail) {
            fetch(`http://localhost:3000/characters/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ detail: newDetail })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(() => {
                // Reload characters to reflect the update
                loadCharacters();
            })
            .catch(error => {
                console.error('Error updating character detail:', error);
            });
        }
    }

    // Add event listener to the button
    loadButton.addEventListener('click', loadCharacters);
});
