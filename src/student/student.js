var stompClient = null;

function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
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
            const body = JSON.parse(message.body);
            // showMessage(body);
            handleQuestion(body);
        });
    });
}

function handleQuestion(msg) {
    console.log(msg, msg.id, msg.payload, msg.payload.type);
    document.getElementById('questionId').value = msg.questionId;
    document.getElementById('question').innerText = msg.payload.question;
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
    const message = new Message(name, questionId, answer);
    stompClient.send(`/app/answer/${sessionId}`, {}, JSON.stringify(message));
}
