class Message {
    from;
    questionId;
    payload;

    constructor(from, questionId, payload) {
        this.from = from;
        this.questionId = questionId;
        this.payload = payload;
    }
}

class Question {
    type;

    constructor(type) {
        this.type = type;
    }
}
