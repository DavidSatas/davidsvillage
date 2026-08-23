const message = document.getElementById('arrivalMessage');
const enterButton = document.getElementById('enterButton');
const closeMessage = document.getElementById('closeMessage');

enterButton.addEventListener('click', () => {
  message.hidden = false;
});

closeMessage.addEventListener('click', () => {
  message.hidden = true;
});

message.addEventListener('click', (event) => {
  if (event.target === message) message.hidden = true;
});
