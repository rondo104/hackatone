var stompClient = null;

function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
    document.getElementById('response').innerHTML = '';
}

function connect() {
    const socket = new SockJS(`${API_URL}/answer`);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
        setConnected(true);
        const sessionId = getSessionId();
        console.log(`Connected [session id = ${sessionId}] : `, frame);
        stompClient.subscribe(`/answer/answer/${sessionId}`, message => {
            showMessage(message.body);
        });
    });
}

function disconnect() {
    stompClient.disconnect();
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    const name = document.getElementById('name').value;
    const sessionId = getSessionId();
    const questionId = generateId();
    showMessage("Sent question id: " + questionId);
    stompClient.send(`/app/question/${sessionId}`, {}, JSON.stringify({
        id: questionId,
        from: name,
        payload: {id: questionId, question: 'TO DO'}
    }));
}

function showMessage(message) {
    const response = document.getElementById('response');
    const p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(document.createTextNode(message));
    response.appendChild(p);
}
