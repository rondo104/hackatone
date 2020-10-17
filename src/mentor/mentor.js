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
            showMessage(JSON.parse(message.body));
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
    const questionValue = document.getElementById('question').value;
    const sessionId = getSessionId();
    const questionId = generateId();
    const question = new Question('OPEN', questionValue);
    const message = new Message(name, questionId, question);
    // console.log('!!!!', message);
    // showMessage("Sent question id: " + questionId);
    stompClient.send(`/app/question/${sessionId}`, {}, JSON.stringify(message));
}

function showMessage(message) {
    const response = document.getElementById('response');
    const p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.innerHTML = `<strong>${message.from}</strong> <i>${new Date().toLocaleTimeString()}</i><br>${message.payload}`;
    response.appendChild(p);
}
