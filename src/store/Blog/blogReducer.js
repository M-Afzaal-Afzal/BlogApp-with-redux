import actionTypes from "../actionTypes";

const initialState = {
    blogs: [],
    isLoading: false,
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_BLOGS_START: {
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

        case actionTypes.ADD_BLOG_START: {
            return;
        }

        case actionTypes.ADD_BLOG_SUCCESS: {
            return;
        }


        case actionTypes.EDIT_BLOGS_START: {
            return;
        }

        case actionTypes.EDIT_BLOGS_SUCCESS: {
            return;
        }

        case actionTypes.DELETE_BLOGS_START: {
            return;
        }

        case actionTypes.DELETE_BLOGS_SUCCESS: {
            return;
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