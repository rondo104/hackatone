function getData() {
    const sessionId = getSessionId();
    fetch(`${API_URL}/result/${sessionId}`).then(result => result.json()).then(result => {
        const response = document.getElementById('result');
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(JSON.stringify(result)));
        response.appendChild(p);
        const tableArr = [];
        result.questions.forEach(q => {
            if (q.answers && q.answers.length) {
                q.answers.forEach(a => tableArr.push({question: q.question.question, from: a.from, answer: a.answer}));
            } else {
                tableArr.push({question: q.question.question, from: '', answer: ''})
            }
        });
        document.getElementById('table').innerHTML =
            ConvertJsonToTable(tableArr, 'jsonTable', null, 'Download');
    })
}
