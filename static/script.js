document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatLog = document.getElementById('chat-log');
    const userInput = document.getElementById('user-input');

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = userInput.value;
        userInput.value = '';

        // Display user message in chat log
        const userMessage = document.createElement('div');
        userMessage.classList.add('message');
        userMessage.innerHTML = `<span class="user">${message}</span>`;
        chatLog.appendChild(userMessage);

        // Display loading message in chat log
        const loadingMessage = document.createElement('div');
        loadingMessage.classList.add('message', 'loading-message');
        loadingMessage.innerHTML = '<span>Loading...</span>';
        chatLog.appendChild(loadingMessage);

        // Make API request to process the message
        fetch('/process_request/', {
            method: 'POST',
            body: new URLSearchParams({
                request: message
            })
        })
        .then(response => response.json())
        .then(data => {
            // Remove loading message from chat log
            chatLog.removeChild(loadingMessage);

            // Display processed message in chat log
            const processedMessage = document.createElement('div');
            processedMessage.classList.add('message');
            processedMessage.innerHTML = `<span class="processed">${data.processed_request}</span>`;
            chatLog.appendChild(processedMessage);
        })
        .catch(error => {
            // Remove loading message from chat log
            chatLog.removeChild(loadingMessage);

            // Display error message in chat log
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('message', 'error-message');
            errorMessage.innerHTML = '<span>Error occurred. Please try again later.</span>';
            chatLog.appendChild(errorMessage);
        });
    });
});