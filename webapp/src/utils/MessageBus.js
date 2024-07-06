import singleton from "./singleton";

class MessageBus {
    constructor() {
        this.subscribers = {};
    }

    subscribe(topic, callback) {
        if (!this.subscribers[topic]) {
            this.subscribers[topic] = [];
        }

        this.subscribers[topic].push(callback);
    }

    unSubscribe(topic, callback) {
        if (this.subscribers[topic]) {
            const index = this.subscribers[topic].indexOf(callback);
            if (index > -1) {
                this.subscribers[topic].splice(index, 1);
            }
        }
    }

    publish(topic, data) {
        setTimeout(() => {
            if (this.subscribers[topic]) {
                this.subscribers[topic].forEach(function (callback) {
                    callback(data);
                });
            }
        });
    }
}

export default new (singleton(MessageBus))();
