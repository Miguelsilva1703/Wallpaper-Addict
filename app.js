//PEXELS API KEY: 563492ad6f9170000100000182ae1445a87f4cc7ba0be08b25c7e1ec

//API STUFF
const auth = "563492ad6f9170000100000182ae1445a87f4cc7ba0be08b25c7e1ec";

//Main Variables
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const moreDiv = document.querySelector(".nav-btn");
const more = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

//Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
    //This prevent form from refreshing on submit (need to passevent to anonym function)
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);



function updateInput(e){
    searchValue = e.target.value;
}

//Handling API fetch requests
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

//Generating HTML for newly fetched data
function generatePictures(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galleryImg);
    });
}

//Loading initial images
async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatePictures(data);
    
}


//Taking user's input and returning appropiate imgs
async function searchPhotos(input){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;
    const data = await fetchApi(fetchLink)
    generatePictures(data);
    
}

function clear(){
    gallery.innerHTML = "";
    searchInput.value = "";
}

async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`; 
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);

    
}


curatedPhotos();



