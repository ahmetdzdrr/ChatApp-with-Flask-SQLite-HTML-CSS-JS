document.addEventListener("DOMContentLoaded", function() {
  var welcomeHeader = document.getElementById("welcome-header");
  var animationShown = localStorage.getItem("headerAnimationShown");

  if (!animationShown) {
    welcomeHeader.style.display = "block";

    setTimeout(function() {
      welcomeHeader.classList.remove("slide-down");
      
      setTimeout(function() {
        welcomeHeader.classList.add("slide-down");
        localStorage.setItem("headerAnimationShown", "true");
      }, 3000);
    });  
  }
  localStorage.clear();
});



function checkPasswordLength(inputId, checkmarkId) {
  var input = document.getElementById(inputId);
  var checkmark = document.getElementById(checkmarkId);


  if (input.type === 'password') {
      if (input.value.length >= 8) {
          checkmark.innerHTML = '<img class="check-cross" src="static/icons/show.png" alt="Hide"><ion-icon name="checkmark"></ion-icon>';
      } else if (input.value.length > 0) {
          checkmark.innerHTML = '<img class="check-cross" src="static/icons/show.png" alt="Hide"><ion-icon name="close"></ion-icon>';
      } else {
          checkmark.innerHTML = '';
      }
  } else if (input.type === 'text') {
      if (input.value.length >= 8) {
          checkmark.innerHTML = '<img class="check-cross" src="static/icons/hide.png" alt="Hide"><ion-icon name="checkmark"></ion-icon>';
      } else if (input.value.length > 0) {
          checkmark.innerHTML = '<img class="check-cross" src="static/icons/hide.png" alt="Hide"><ion-icon name="close"></ion-icon>';
      } else {
          checkmark.innerHTML = '';
      }
  }

  var imgElement = checkmark.querySelector("img.check-cross");
  imgElement.addEventListener("click", function () {
      if (input.type === 'password') {
          input.type = 'text';
          imgElement.src = '/static/icons/hide.png';
      } else if (input.type === 'text') {
          input.type = 'password';
          imgElement.src = '/static/icons/show.png';
      }
  });
}




document.addEventListener("DOMContentLoaded", function () {
  const chatsLink = document.getElementById("chats");
  const roomPopup = document.getElementById("roomPopup");
  const formPopup = document.getElementById("room-form-container");
  const closeFormIcon = document.querySelector(".title ion-icon[name='close']")
  const closeIcon = document.querySelector(".room-header ion-icon[name='close']");
  const openIcon = document.querySelector(".room-header ion-icon[name='add']");

  chatsLink.addEventListener("click", function (e) {
    e.preventDefault();
    roomPopup.style.display = "block";
  });

  closeIcon.addEventListener("click", function () {
    roomPopup.style.display = "none";
  });

  closeFormIcon.addEventListener("click", function () {
    formPopup.style.display = "none";
  });

  openIcon.addEventListener("click", function () {
    formPopup.style.display = "block";
  });

  window.addEventListener("click", function (e) {
    if (e.target === roomPopup) {
      roomPopup.style.display = "block";
    }
  });
});



document.getElementById("generate").addEventListener("click", function(e) {
    e.preventDefault();
    var generatedCode = generateRandomCode(4);
    document.getElementById("code").value = generatedCode;
  });

  function generateRandomCode(length) {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var code = "";
    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
}


document.querySelectorAll('.delete-room').forEach(button => {
  button.addEventListener('click', function() {
      const roomId = this.getAttribute('data-room-id');
      deleteRoom(roomId);
  });
});

function deleteRoom(roomId) {
  fetch(`/delete_room/${roomId}`, {
      method: 'DELETE',
  })
  .then(response => {
      if (response.ok) {
          const roomElement = document.querySelector(`[data-room-id="${roomId}"]`).closest('li');
          if (roomElement) {
            roomElement.remove();
              Swal.fire({
                title: "Room deleted successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 3000
            });
          }
      }
  })
  .catch(error => {
      console.error('Error deleting room:', error);
  });
}



document.querySelectorAll('.join-room').forEach(joinButton => {
  joinButton.addEventListener('click', function() {
      window.location.href = '/join';
  });
});

