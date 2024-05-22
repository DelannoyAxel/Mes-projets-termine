document.getElementById('searchButton').addEventListener('click', searchSeries);

function searchSeries() {
    const searchTerm = document.getElementById('search').value.trim().toLowerCase();
    // value.trim recupere la valeur et supprime les espaces inutiles, toLowerCase s'assure de convertir la valeur en miniscule pour ne pas être sensible au majuscule
    const apiUrl = `https://api.tvmaze.com/search/shows?q=${searchTerm}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displaySeries(data);
    })
    .catch(error => {
        console.error('Error fetching series:', error);
    });
}

function displaySeries(series) {
    const seriesContainer = document.getElementById('series');
    seriesContainer.innerHTML = '';
    // Cette ligne vide le contenu HTML du conteneur de séries, elle supprime tout le contenu à l'intérieur de l'élément HTML avec l'ID "series"

    series.forEach(show => {
        const showCard = document.createElement('div');
        seriesContainer.appendChild(showCard);
        showCard.classList.add('show-card'); 

        const summary = truncateSummary(show.show.summary, 50);
        // Je demande à la fonction d'afficher seulement les 50 premiers mot du résumé 

        showCard.innerHTML = `
            <h2>${show.show.name}</h2>
            <img src="${show.show.image ? show.show.image.medium : 'placeholder.jpg'}" alt="Photo de l'affiche du film, ${show.show.name}">
             <p>${summary}</p>
            <button onclick="showEpisodeList(${show.show.id})">Voir les épisodes</button>
        `;
        //  C'est une propriété qui permet d'insérer du contenu HTML à l'intérieur de l'élément showCard
    });
}

function showEpisodeList(showId) {
    const apiUrl = `https://api.tvmaze.com/shows/${showId}/episodes`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(episodes => {
        alert(`Nombre d'épisodes: ${episodes.length}`);
    })
    .catch(error => {
        console.error('Error fetching episodes:', error);
    });
}

// Fonction pour tronquer le résumé à un maximum de mots
function truncateSummary(summary, maxWords) {
    const words = summary.split(' ');
    // On utilise la méthode split pour séparer chaque mot du résumé  avec un espace et en faire un tableau 
    if (words.length > maxWords) {
        // On dit alors que si le "tableau des mots" est supérieur au maxWords defini alors on tronque le résultat
        return words.slice(0, maxWords).join(' ') + '...';
        // On extrait les mot de 0 à maxWords et on Ensuite, utilise join(' ') pour reconstituer en une seule chaîne de caractères, en séparant chaque mot par un espace.
    } else {
        return summary;
    }
}