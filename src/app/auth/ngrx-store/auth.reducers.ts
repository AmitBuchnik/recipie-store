export interface IState {
    token: string;
    authenticated: boolean;
}

const intialState: IState = {
    token: null,
    authenticated: false  
};

export function authReducer(state = intialState, action) {


    return state;
}
