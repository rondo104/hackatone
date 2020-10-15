var stompClient = null;

function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
    document.getElementById('response').innerHTML = '';
}

function connect() {
    const socket = new SockJS(`${API_URL}/question`);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
        setConnected(true);
        const sessionId = getSessionId();
        console.log(`Connected [session id = ${sessionId}] : `, frame);
        console.log('API_URL', API_URL);
        stompClient.subscribe(`/question/question/${sessionId}`, message => {
            const body = message.body;
            showMessage(body);
            handleQuestion(body);
        });
    });
}

function handleQuestion(message) {
    const msg = JSON.parse(message);
    console.log(message, msg, msg.id, msg.payload, msg.payload.type);
    document.getElementById('questionId').value = msg.questionId;
}

function disconnect() {
    stompClient.disconnect();
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    const name = document.getElementById('name').value;
    const sessionId = getSessionId();
    const questionId = document.getElementById('questionId').value;
    const answer = document.getElementById('answer').value;
    showMessage('Sent answer: ' + answer + ' questionId: ' + questionId);
    const message = new Message(name, questionId, answer);
    stompClient.send(`/app/answer/${sessionId}`, {}, JSON.stringify(message));
}

function showMessage(message) {
    const response = document.getElementById('response');
    const p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(document.createTextNode(message));
    response.appendChild(p);
}
