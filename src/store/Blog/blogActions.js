import actionTypes from "../actionTypes";
import {firestore} from "../../utils/firebase";

const setLoading = () => {
    return {
        type: actionTypes.START,
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

        await dispatch(setLoading());

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

export const deleteBlog = (id) => {

    return (dispatch) => {
        firestore.collection('blogs').doc(id)
            .delete()
            .then(() => {
                console.log('Blog deleted successfully')
                dispatch(getBlogs());
            })
            .catch((err) => {
                dispatch(setError(err.message))
                console.log(err.message)
            })
    }


}


export const updateBlog = (heading, desc, id) => {
    return (dispatch) => {
        firestore.collection('blogs').doc(id)
            .update({
                heading: heading,
                body: desc,
                comments: [],
            })
            .then(async () => {
                console.log("Blog successfully updated!");
               dispatch(getBlogs())
            })
            .catch(err => {
                dispatch(setError(err.message))
                console.log(err.message);
            })
    }
}

export const updateComment = (newComment, id,comments) => {
    return (dispatch) => {
        firestore.collection('blogs').doc(id)
            .update({
                comments: [newComment, ...comments],
            })
            .then(async () => {
                console.log("Comment Posted Successfully");
                await dispatch(getBlogs());
            })
            .catch(err => {
                console.log(err.message);
            })
    }
}