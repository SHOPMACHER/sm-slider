import { StateFunction } from '../types/StateFunction';

export default class Store<T> {

    state: T;
    handler: (prevState: T) => void = () => {};

    constructor(initialState: T, handler: (prevState: T) => void) {
        this.state = initialState;
        this.handler = handler;
    }

    getState(): T {
        return this.state;
    }

    setState(nextState: (Partial<T> & StateFunction<T>)) {
        const prevState = { ...this.state };

        switch (typeof nextState) {
            case 'function':
                this.state = {
                    ...this.state,
                    ...nextState(this.state),
                };

                break;
            case 'object':
                this.state = {
                    ...this.state,
                    ...nextState,
                };

                break;
            default:
                throw new Error();
        }

        this.handler(prevState);
    }
}
