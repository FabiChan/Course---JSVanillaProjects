const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectcedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
function updateSelectedCount() {
    //Seleccionamos todos los asientos seleccionados
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length; //Es una node list, devolvemos el tamaño
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    //Copy selected seats into arr
    //Map through array
    //Return a new array indexes

    //The spread operator (...) copies the elements of the node list into the array
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

}

//Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie select event - cuando seleccionamos una peli hay un cambio
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value; //se actualiza el nuevo valor precio peli
    setMovieData(e.target.selectedIndex, e.target.value); //Guardamos el indice de la pelicula de la lista y el precio de la peli
    updateSelectedCount();
});

//Seat click event
container.addEventListener('click', e => {
    //seleccionamos aquellos asientos que no están ocupados dentro de la clase container
    if( e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount()
    }
});

//Initial count and total set
updateSelectedCount();