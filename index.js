document.addEventListener('DOMContentLoaded',()=>{
document.getElementById('load-button').addEventListener('click', loadCharacters);

function loadCharacters() {
    fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(data => displayCharacters(data))
        .catch(error => console.error('Error fetching data:', error));
}

function displayCharacters(characters) {
    const characterList = document.getElementById('character-list');
    characterList.innerHTML = ''; 

    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.className = 'character';
        characterDiv.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}">
            <p>${character.description}</p>
        `;
        characterList.appendChild(characterDiv);
    });
}
});