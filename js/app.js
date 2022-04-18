// NAVBAR BLUR BACKGROUND ON SCROLL vanilla
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navigation").style.backdropFilter = "blur(4px)";
        document.getElementById('navigation').style.boxShadow = "0 0 20px 0 rgba(0,0,0,.05)";
        document.getElementById('navigation').style.background = "rgba(5, 14, 41, 0.6)";
    } else {
        document.getElementById("navigation").style.backdropFilter = "none";
        document.getElementById('navigation').style.boxShadow = "none";
        document.getElementById('navigation').style.background = "transparent";
    }
};


const navbarToggler = document.querySelector(".burgerMenu");
const navbarMenu = document.querySelector(".mobileMenu");
const navbarLinks = document.querySelectorAll(".mobilenavLinks");
const exit = document.querySelector(".exitBtn");

var tl = gsap.timeline({ defaults: { duration: 1, ease: Expo.easeInOut } })
navbarToggler.addEventListener("click", navbarTogglerClick);
tl.paused(true)

tl.to(".mobileMenu", {
  height: "100%"
});
tl.to(".mobileMenu ul li", {
  opacity: 1,
  stagger: 0.1
}, "-=1");
tl.to(".exitBtn", {
  opacity: 1,
  y: "5px"
}, "-=1");
function navbarTogglerClick() {
  tl.play();
};
exit.addEventListener('click', () => {
  tl.reverse(.9);
});
navbarLinks.forEach(item => {
  item.addEventListener('click', () => {
    tl.reverse(.9);
  })
});

var time, alarm, currentH, currentM, activeAlarm = false, sound = new Audio ("./assets/audioclip.wav");

// loop alarm    
sound.loop = true;

  async function randomQuote() {
    const response = await fetch(`https://api.quotable.io/random`)
   const data = await response.json()
   console.log(data.content,data.author)
  
  }
randomQuote()

// define a function to display the current time
function displayTime() {
  var now = new Date();
  time = now.toLocaleTimeString();
  clock.textContent = time;
  // time = "1:00:00 AM";
  // watch for alarm
  if (time === alarm) {
    sound.play();
    
    // show snooze button
    snooze.className = "";
  }
  setTimeout(displayTime, 1000);
}
displayTime();

function addMinSecVals(id) {
  var select = id;
  var min = 59;
  
  for (i = 0; i <= min; i++) {
  
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i < 10 ? "0" + i : i);
  }
}
function addHours(id) {
  var select = id;
  var hour = 12;
  
  for (i = 1; i <= hour; i++) {
  
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}
addMinSecVals(minutes);
addMinSecVals(seconds);
addHours(hours);


startstop.onclick = function() {
  if (activeAlarm === false) {
    hours.disabled = true;
    minutes.disabled = true;
    seconds.disabled = true;
    ampm.disabled = true;
    
    alarm = hours.value + ":" + minutes.value + ":" + seconds.value + " " + ampm.value;
    this.textContent = "Clear Alarm";
    activeAlarm = true;
  } else {
    hours.disabled = false;
    minutes.disabled = false;
    seconds.disabled = false;
    ampm.disabled = false;
    
    sound.pause();
    alarm = "00:00:00 AM";
    this.textContent = "Set Alarm";
    snooze.className = "hide";
    activeAlarm = false;
  }
};


snooze.onclick = function() {
  if (activeAlarm === true) {
    currentH = time.substr(0, time.length - 9);
    currentM = time.substr(currentH.length + 1, time.length - 8);
    
    if (currentM >= "55") {
      minutes.value = "00";
      hours.value = parseInt(currentH) + 1;
    } else {
      if (parseInt(currentM) + 5 <= 9) {
        minutes.value = "0" + parseInt(currentM + 5);
      } else {
        minutes.value = parseInt(currentM) + 5;
      }
    }
    
    snooze.className = "hide";
    
    startstop.click();
    startstop.click();
  } else {
    return false;
  }
};

async function randomQuote() {
    const response = await fetch(`https://api.quotable.io/random`)
   const data = await response.json()
   console.log(data.content,data.author);
    
    document.querySelector('#quote').innerHTML=data.content;
    document.querySelector('#author').innerHTML=data.author;
  }
randomQuote()
document.querySelector('#startstop').addEventListener("click",randomQuote);