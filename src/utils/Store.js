// @flow
export default class Store {

    state: Object = {};
    handler: (prevState: Object) => void = () => {};

    constructor(initialState: Object) {
        this.state = initialState;
    }

    getState() {
        return this.state;
    }

    setState(nextState: (Object|Function)) {
        const prevState = {...this.state};

        switch (typeof nextState) {
            case 'function':
                this.state = {
                    ...this.state,
                    ...nextState(this.state)
                };
                break;
            case 'object':
                this.state = {
                    ...this.state,
                    ...nextState
                };
                break;
            default:
                throw new Error();
        }

        this.handler(prevState);
    }

    listen(handler: () => void) {
        this.handler = handler;
    }

    unlisten() {
        this.handler = () => {};
    }
}
