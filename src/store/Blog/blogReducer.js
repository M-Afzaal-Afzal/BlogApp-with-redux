import actionTypes from "../actionTypes";

const initialState = {
    blogs: [],
    isLoading: false,
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.START: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case actionTypes.GET_BLOGS_SUCCESS: {
            return {
                error: null,
                isLoading: false,
                blogs: action.blogs
            };
        }

        case actionTypes.ERROR:{
            return {
                ...state,
                error: action.error,
            };
        }

        default: {
            return state;
        }
    }
}

export default reducer;