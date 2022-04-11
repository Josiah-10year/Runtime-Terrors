
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-musixmatch-Host': 'https://api.musixmatch.com/ws/1.1/',
// 		'X-musixmatch-Key': '98f31d9a8fef72644d813a626aeaf1db'
// 	}
// };

// fetch('https://api.musixmatch.com/ws/1.1/', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
// const form = document.getElementById("contactForm")
// const search = document.getElementById("search")

// const apiURL = "https://api.musixmatch.com/ws/1.1/";
// var apikey = "98f31d9a8fef72644d813a626aeaf1db";

// async function getMySearch(){
//   document.querySelector("#search");
//   try{
//       let response = await fetch(apiURL);
//       let data = await response.json();
//       displayMySearch(data);
//     }catch(e){
//         console.log(e);
//     }
// }
// getMySearch("${apiURL}${q_track}/${q_artist}/${apikey}")

// function displayMySearch(data){
//   console.log(data)
//   let result = document.querySelector("#searchResult");
//   let html= '';
//   html+=`
//     <h5>${q_track} - ${q_artist}</h5>      
//   `;

//   result.innerHTML = html; 
// }
  
// async function getLyrics(url){
//   try{
//     let response = await fetch(url);
//     let data = await response.json();
//     displayLyrics(data);
//   }catch(e){
//     console.log(e);
//   } 
// }
// getLyrics("${urlAPI}matcher.lyrics.get/${q_track}/${q_artist}/${apikey}")

// function displayLyrics(){
//   let result = document.querySelector("#lyrics");
//   let html= '';
//   html+=`
//     <h5>${q_track} - ${q_artist}</h5>
//     <p>${lyrics_body}</p>        
//   `;
//   result.innerHTML = html;
// }

// function contact(submit){
//   submit.preventDefault();

//   const contactForm = submit.target;
//   const formData = new FormData(form);
//   const data = Object.fromEntries(formData);
  
//   console.log(data);
// }

//document.forms['contactForm'].addEventListener('submit', contact);


const from = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.musixmatch.com/ws/1.1/";

async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

function showData(data) {
  console.log(data);
  result.innerHTML = `
  <ul class="songs">
    ${data.data
      .map(
        (song) => `<li>
    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
  </li>`
      )
      .join("")}
  </ul>
 `;
  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
    `;
  } else {
    more.innerHTML = "";
  }
}

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  if (data.error) {
    result.innerHTML = data.error;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

    result.innerHTML = `
              <h2><strong>${artist}</strong> - ${songTitle}</h2>
              <span>${lyrics}</span>
          `;
  }

  more.innerHTML = "";
}

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const searchTerm = search.value.trim();

//   if (!searchTerm) {
//     alert("Please type in a search term");
//   } else {
//     searchSongs(searchTerm);
//   }
// });

// Get lyrics button click
// result.addEventListener("click", (e) => {
//   const clickedEl = e.target;

//   if (clickedEl.tagName === "BUTTON") {
//     const artist = clickedEl.getAttribute("data-artist");
//     const songTitle = clickedEl.getAttribute("data-songtitle");

//     getLyrics(artist, songTitle);
//   }
// });


