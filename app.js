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
    //This prevent form from refreshing on submit (need to passevent to anonym function)
    e.preventDefault();
    searchPhotos(searchValue);
    
});

function updateInput(e){
    searchValue = e.target.value;
}


async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>
        `;
        gallery.appendChild(galleryImg);
    });
}




async function curatedPhotos(){
    const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=15&page=1");
    generatePictures(data);
    
}

async function searchPhotos(input){
    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${input}&page=1&per_page=15`)
    generatePictures(data);
    
}

    




curatedPhotos();



