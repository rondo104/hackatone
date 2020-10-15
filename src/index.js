function generate() {
    const sessionId = generateId();
    const url = location.protocol + '//' + location.host + location.pathname.replace('/index.html', '');
    document.getElementById('mentor').href = `${url}/mentor/mentor.html?sessionId=${sessionId}`;
    document.getElementById('student').href = `${url}/student/student.html?sessionId=${sessionId}`;
    document.getElementById('chat').href = `${url}/app-chat/chat.html?sessionId=${sessionId}`;
    document.getElementById('result').href = `${url}/app-result/result.html?sessionId=${sessionId}`;
}
