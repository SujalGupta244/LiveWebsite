let timer 
let deleteFirstPhotoDelay

async function start(){
    try{
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        // console.log(data);
        createBreedList(data.message)
    }catch (e){
        console.log("There was a problem fetching the breed list.")
    }
}


start()

function createBreedList(breedList){
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
        <option >Choose a dog breed</option>
        ${Object.keys(breedList).map(function(breed){
            return `<option>${breed}</option>`
        }).join('')}
    </select>
    `
}


async function loadByBreed(breed){
    if(breed != "Choose a dog breed"){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideshow(data.message)
    }
}


function createSlideshow(breedImages){
    let currentPosition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)

    if(breedImages.length > 1){
        document.getElementById("slideShow").innerHTML = `
        <div class="slide" style="background-image: url('${breedImages[0]}');"></div>
        <div class="slide" style="background-image: url('${breedImages[1]}');"></div>
        `
        currentPosition += 2
        if(breedImages.length ==2){currentPosition = 0}
        timer = setInterval(nextSlide, 3000)    
    }
    else{
        document.getElementById("slideShow").innerHTML = `
        <div class="slide" style="background-image: url('${breedImages[0]}');"></div>
        <div class="slide"></div>
        `
    }

    function nextSlide(){
    document.getElementById("slideShow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${breedImages[currentPosition]}');"></div>`)
    deleteFirstPhotoDelay = setTimeout(function(){
        document.querySelector(".slide").remove()
    },1000)
    if(currentPosition +1 >= breedImages.length){
        currentPosition = 0
    }
    else{
        currentPosition++
    }
    }
}
















