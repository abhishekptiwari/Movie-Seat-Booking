const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();

// Save selected movies and Index
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and const
function updateSelectedCount() {
    // NodeList of selected seats
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    console.log(selectedSeats);

    // seatsIndex is an array of seats index that user selected
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    console.log(seatsIndex);
    
    // Storing it to localstorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get Data from localStorage and Populate UI
function populateUI() {
   const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
   console.log(selectedSeats);
   if(selectedSeats.length > 0 && selectedSeats !== null){
       seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
       });
   }

   const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
   if(selectedMovieIndex !== null){
       movieSelect.selectedIndex = selectedMovieIndex;
   }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    // console.log(e.target.selectedIndex, e.target.value);
   setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
    // 'click' only if the class is not occupied.
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // console.log(e.target);
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// Initial count and total
updateSelectedCount();