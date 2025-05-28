// // init username var and create prompt
let username ;
// window.prompt("What is your username: ");
// // get user input 
// console.log(username);

// Used to get a user name after user input and give them a message back welcoming to website 
document.getElementById("mySubmitButton").onclick = function() {
    username = document.getElementById("usernameInput").value;
    document.getElementById("myH1").textContent = `Howdy ${username}`;
}


const images = [
  "images/execution.png",
  "images/FB.png",
  "images/FirstPortal.png",
  "images/itemfound.png",
  "images/parry.png",
  "images/Player.png",
  "images/playerportal.png"
];


  
  let index = 0;
  const group = document.getElementById("slide-group");
  
  function showSlides() {
    group.innerHTML = "";
    for (let i = 0; i < 1; i++) {
      const img = document.createElement("img");
      img.src = images[(index + i) % images.length];
      group.appendChild(img);
    }
  }
  
  function nextSlide() {
    index = (index + 3) % images.length;
    showSlides();
  }
  
  function prevSlide() {
    index = (index - 3 + images.length) % images.length;
    showSlides();
  }
  
  showSlides(); // Show initial images


  
