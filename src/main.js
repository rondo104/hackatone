const API_URL = 'http://195.250.62.211:8030';

function getSessionId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('sessionId');
}

function generateId() {
    return Math.floor(Math.random() * Math.floor(10000));
}
