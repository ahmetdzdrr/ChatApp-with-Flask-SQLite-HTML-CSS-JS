// Basit bir JavaScript kodu - Mesaj gönderme işlevselliği

document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Formun sayfa yenilemesini engellemek için
  
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
  
    if (message !== '') {
      displayMessage(message); // Mesajı ekranda göstermek için
      messageInput.value = ''; // Mesaj girdi alanını temizle
    }
  });
  
  function displayMessage(message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
  
    chatBox.appendChild(messageElement);
  
    // Otomatik aşağıya kaydırma için
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  