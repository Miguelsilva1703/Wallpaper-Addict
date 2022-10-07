//PEXELS API KEY: 563492ad6f9170000100000182ae1445a87f4cc7ba0be08b25c7e1ec

//API STUFF
const auth = "563492ad6f9170000100000182ae1445a87f4cc7ba0be08b25c7e1ec";

//Main Variables
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const moreDiv = document.querySelector(".nav-btn");
const moreBtn = document.querySelector(".more");
let searchValue;

//Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
    searchPhotos(searchValue);
    //This prevent form from refreshing on submit (need to passevent to anonym function)
    e.preventDefault;
});

function updateInput(e){
    searchValue = e.target.value;
}


async function curatedPhotos(){
    const dataFetch = await fetch("https://api.pexels.com/v1/curated?per_page=15&page=1",{
        method: "GET",
        headers: {
            Accept: "application/json",
            authorization: auth
        } 
    }
    );
    const data = await dataFetch.json();
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>
        `;
        gallery.appendChild(galleryImg);
    });
}

async function searchPhotos(input){
    const dataFetch = await fetch(`https://api.pexels.com/v1/search?query=${searchValue}+query&per_page=15&page=1`, {
        method: "GET",
        headers:{
            Accept: "application/json",
            Authorization: auth
        }
    }
    );
    const data = await dataFetch.json();
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>`;
        gallery.appendChild(galleryImg);
    });
}

    




curatedPhotos();



