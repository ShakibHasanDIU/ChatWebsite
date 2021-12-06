const socket = io('http://localhost:3000');

const form = document.getElementById('sendContainer');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('Ting.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

while (1) {
    const name = prompt("Enter your name to enter:");
    if (name == '') {
        
    }else{
        socket.emit('new-user-joined', name);
        break;
    }
}

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})
socket.on('left', name =>{
    append(`${Shakibname} left the chat...`, 'left')
})