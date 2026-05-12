let memes = [];
let currentIndex = 0;

async function fetchMemes() {
    try {
        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();
        memes = data.data.memes;
        displayMeme(0);
    } catch (error) {
        console.error("Error loading memes:", error);
    }
}

function displayMeme(index) {
    const imgElement = document.getElementById('meme-image');
    if (memes.length > 0) {
        // Smooth fade out
        imgElement.style.opacity = '0';
        
        setTimeout(() => {
            imgElement.src = memes[index].url;
            // Smooth fade in
            imgElement.onload = () => {
                imgElement.style.opacity = '1';
            };
        }, 300);
        
        currentIndex = index;
    }
}

function nextMeme() {
    let next = (currentIndex + 1) % memes.length;
    displayMeme(next);
}

function prevMeme() {
    let prev = (currentIndex - 1 + memes.length) % memes.length;
    displayMeme(prev);
}

function randomMeme() {
    let random = Math.floor(Math.random() * memes.length);
    displayMeme(random);
}

// Initial Load
document.addEventListener('DOMContentLoaded', fetchMemes);