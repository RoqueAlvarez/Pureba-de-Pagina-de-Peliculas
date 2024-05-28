class Catalogo {
    #peliculas = [];

    constructor() {
        const peliculasIniciales = [
            { id: '1', title: 'El Hombre Araña', director: 'Sam Raimi', sinopsis: 'Peter Parker, un estudiante tímido y marginado, adquiere poderes especiales después de ser picado por una araña genéticamente modificada en un laboratorio. Ahora, como el increíble Hombre Araña, debe enfrentarse a sus propios demonios internos mientras lucha contra el crimen en la ciudad de Nueva York.', image: 'https://media.vandal.net/i/1200x1200/39844/spiderman-201812201242252_1.jpg' },
            { id: '2', title: 'The Batman', director: 'Matt Reeves', sinopsis: 'En las oscuras calles de Gotham City, Bruce Wayne asume el manto del legendario justiciero conocido como Batman. Con la ayuda de su aliada, la intrépida Selina Kyle, también conocida como Catwoman, Batman se embarca en una peligrosa misión para detener una oscura conspiración que amenaza con sumir a la ciudad en el caos.', image: 'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2020/08/hipertextual-puedes-ver-primer-trailer-the-batman-4k-2020956533-scaled.jpg?fit=2560%2C1714&quality=50&strip=all&ssl=1' },
            { id: '3', title: 'Maze Runner: correr o morir', director: 'Wes Ball', sinopsis: 'En un mundo post-apocalíptico, un grupo de jóvenes lucha por sobrevivir en un laberinto lleno de peligros mortales. Con sus vidas en juego, deberán descubrir los secretos ocultos detrás de este laberinto y encontrar una manera de escapar antes de que sea demasiado tarde.', image: 'https://m.media-amazon.com/images/M/MV5BMjUyNTA3MTAyM15BMl5BanBnXkFtZTgwOTEyMTkyMjE@._V1_FMjpg_UX1000_.jpg' },
            { id: '4', title: 'Gantz:O', director: 'Yasushi Kawamura', sinopsis: 'Un grupo de personas recientemente fallecidas se encuentra inexplicablemente revividas y obligadas a participar en un siniestro juego mortal. Armados con trajes de combate de alta tecnología, son enviados a luchar contra monstruos y criaturas grotescas para ganar su libertad y descubrir la verdad detrás de su resurrección.', image: 'https://m.media-amazon.com/images/M/MV5BZmRiNWVmZDctM2Q2Ny00NzMwLTkwYTItMmU0ZmE5MDUwNTBiL2ltYWdlXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_FMjpg_UX1000_.jpg' },
            { id: '5', title: 'Deadpool 3', director: 'Shawn Levy', sinopsis: 'El irreverente y sarcástico mercenario con el poder de la regeneración, Deadpool, regresa en una nueva aventura llena de acción y humor. Esta vez, se enfrenta a su mayor desafío hasta el momento cuando se ve envuelto en un complot que amenaza con destruir el mundo tal como lo conocemos.', image: 'https://i0.wp.com/www.musicmundial.com/wp-content/uploads/2024/04/Deadpool-3-El-nuevo-trailer-de-la-pelicula-emociona-aun-mas-a-los-fanaticos.jpg?ssl=1' },
        ];
        this.#peliculas = peliculasIniciales;
        this.render();
    }
    

    render = () => {
        const listaPeliculas = document.getElementById('peliculas-list');
        listaPeliculas.innerHTML = '';
        this.#peliculas.forEach(pelicula => {
            const peliculaDiv = document.createElement('div');
            peliculaDiv.className = 'movie';

            peliculaDiv.innerHTML = `
                <img src="${pelicula.image}" alt="${pelicula.title}">
                <div class="movie-info">
                    <h3>${pelicula.title}</h3>
                    <p>${pelicula.director}</p>
                </div>
                <button onclick="catalogo.showSinopsis('${pelicula.id}')">Sinopsis</button>
                <button onclick="catalogo.editMovie('${pelicula.id}')">Editar</button>
                <button onclick="catalogo.deleteMovie('${pelicula.id}')">Eliminar</button>
            `;
            listaPeliculas.appendChild(peliculaDiv);
        });
    }

    addMovie = () => {
        this.openModal();
    }

    editMovie = (id) => {
        const movie = this.#peliculas.find(p => p.id === id);
        if (movie) {
            this.openModal(movie);
        }
    }

    saveMovie = () => {
        const id = document.getElementById('movie-id').value;
        const title = document.getElementById('title').value;
        const director = document.getElementById('director').value;
        const sinopsis = document.getElementById('sinopsis').value;
        const image = document.getElementById('image').value;

        if (id) {
            // Edit existing movie
            const movieIndex = this.#peliculas.findIndex(p => p.id === id);
            this.#peliculas[movieIndex] = { id, title, director, sinopsis, image };
        } else {
            // Add new movie
            const newId = Date.now().toString();
            const newMovie = { id: newId, title, director, sinopsis, image };
            this.#peliculas.push(newMovie);
        }

        this.closeModal();
        this.render();
    }

    deleteMovie = (id) => {
        this.#peliculas = this.#peliculas.filter(p => p.id !== id);
        this.render();
    }

    showSinopsis = (id) => {
        const movie = this.#peliculas.find(p => p.id === id);
        if (movie) {
            alert(movie.sinopsis);
        }
    }

    openModal = (movie = {}) => {
        const modal = document.getElementById('movie-modal');
        document.getElementById('modal-title').textContent = movie.id ? 'Editar Película' : 'Agregar Película';
        document.getElementById('movie-id').value = movie.id || '';
        document.getElementById('title').value = movie.title || '';
        document.getElementById('director').value = movie.director || '';
        document.getElementById('sinopsis').value = movie.sinopsis || '';
        document.getElementById('image').value = movie.image || '';
        modal.style.display = 'block';
    }

    closeModal = () => {
        const modal = document.getElementById('movie-modal');
        modal.style.display = 'none';
    }
}

const catalogo = new Catalogo();
document.getElementById('add-movie-btn').addEventListener('click', () => catalogo.addMovie());
document.getElementById('save-movie-btn').addEventListener('click', () => catalogo.saveMovie());
document.querySelector('.close').addEventListener('click', () => catalogo.closeModal());
window.onclick = (event) => {
    const modal = document.getElementById('movie-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
