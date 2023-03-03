import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval;

//Function that presents a loading sequance as dots

function loader(element) {
    element.textContent = '';

    loadInterval = setInterval(() => {
        element.textContent += '.';

        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300)
}

// Function that allows the text to appear one letter at a time

function typeText(element, text) {
    let i = 0;

    let setInterval = setInterval(() => {
        if(index < text.length) {
            element.innerHTML += text.chartAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 20)
}

// Generating unique id for every message so I can map over them later

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp} - ${hexadecimalString}`;
}

// Checks if Ai is speaking or me and acts accordigly

function chatStrip (isAi, value, uniqueId) {
    return (
        //template string:
        `
        <div class= 'wrapper ${isAi && 'ai'}'>
            <div class= 'chat'>
                <div class= 'profile'>
                    <img
                        src= '${isAi ? bot : user}'
                        alt= '${isAi ? 'bot' : 'user'}'
                    />
                </div>
                <div class= 'message' id= ${uniqueId}>${value}></div>
            </div>
        </div>

        `
    )
}

//trigger to get the ai generated response

const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    //users chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

    form.reset()

    //bot chatstripe

    const uniqueId = generateUniqueId();
    chatContainer.innerHTML =+ chatStripe(true, ' ', uniqueId);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqueId);

    loader(messageDiv);
    }

    