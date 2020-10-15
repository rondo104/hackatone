function getData() {
    const sessionId = getSessionId();
    fetch(`${API_URL}/result/${sessionId}`).then(result => result.json()).then(result => {
        const response = document.getElementById('result');
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(JSON.stringify(result)));
        response.appendChild(p);
    })
}
