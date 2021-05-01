import actionTypes from "../actionTypes";
import {firestore} from "../../utils/firebase";

const getBlogsStart = () => {
    return {
        type: actionTypes.GET_BLOGS_START,
    }
}

const getBlogsSuccess = (blogs) => {
    return {
        type: actionTypes.GET_BLOGS_SUCCESS,
        blogs: blogs
    }
}

const setError = (error) => {
    return {
        type: actionTypes.ERROR,
        error: error
    }
}

export const getBlogs = () => {

    return async (dispatch) => {

        await dispatch(getBlogsStart());

        firestore.collection('blogs')
            .get()
            .then((querySnapshot) => {

                const blogsData = querySnapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                })
                console.log(blogsData)

                dispatch(getBlogsSuccess(blogsData));

            })
            .catch(err => {
                dispatch(setError(err.message))
            });


    }
}