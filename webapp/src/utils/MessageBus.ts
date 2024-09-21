import singleton from "./singleton";

type Topic = string;
type Callback = Function;

class MessageBus {
    private subscribers: { [key: Topic]: Callback[] };

    constructor() {
        this.subscribers = {};
    }

    subscribe(topic: Topic, callback: Callback) {
        if (!this.subscribers[topic]) {
            this.subscribers[topic] = [];
        }

        this.subscribers[topic].push(callback);
    }

    unSubscribe(topic: Topic, callback: Callback) {
        if (this.subscribers[topic]) {
            const index = this.subscribers[topic].indexOf(callback);
            if (index > -1) {
                this.subscribers[topic].splice(index, 1);
            }
        }
    }

    publish(topic: Topic, data: any) {
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
