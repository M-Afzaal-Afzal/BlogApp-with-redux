import React from 'react';
import {Box, makeStyles, Container, Typography, TextField, Button} from "@material-ui/core";
import {useParams} from 'react-router-dom'
import {Controller, useForm} from "react-hook-form";
import {firestore} from "../utils/firebase";
import {useDispatch, useSelector} from "react-redux";
import {getBlogs} from "../store/Blog/blogActions";
import {useSnackbar} from 'notistack';


const useStyles = makeStyles(() => ({
    mainContainer: {
        background: '#cd0149',
        padding: '4rem 0',
        minHeight: '100vh',
    },
    headingContainer: {
        color: 'white',
        marginBottom: '2rem',
    },
    textFieldContainer: {
        marginBottom: '2rem',
    },
    postButtonContainer: {
        margin: '1rem 0 4rem'
    }
}))

const BlogDetail = () => {

    const blogs = useSelector(state => state.blogs.blogs)
    const isLoading = useSelector(state => state.blogs.isLoading)
    const {id} = useParams();
    const dispatch = useDispatch();

    const {enqueueSnackbar} = useSnackbar();


    const blog = blogs.filter((blog) => blog.id === id)[0];

    const heading = blog?.heading;
    const desc = blog?.body;
    const comments = blog?.comments;

    const classes = useStyles();

    const {control, handleSubmit, reset, formState: {errors}} = useForm();


    const onSubmit = ({comment}) => {
        firestore.collection('blogs').doc(id)
            .update({
                comments: [comment, ...comments],
            })
            .then(async () => {
                console.log("Comment Posted Successfully");
                enqueueSnackbar("Comment Posted Successfully", {variant: 'success'})
                await reset({comment: ''});
                await dispatch(getBlogs());
            })
            .catch(err => {
                enqueueSnackbar("Error While posting the comment!!!", {variant: 'error'})

                console.log(err.message);
            })
    }

    return (
        <Box className={classes.mainContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container maxWidth={'sm'}>
                    {
                        blog && !isLoading ? (
                            <>
                                <Box className={classes.headingContainer}>
                                    <Typography variant={'h3'}>
                                        {heading}
                                    </Typography>
                                </Box>
                                <Box style={{padding: '2rem', background: '#E73B78FF', borderRadius: '20px'}}>
                                    <Typography style={{color: 'white'}} variant={'body1'}>
                                        {desc}
                                    </Typography>
                                </Box>

                                <Box style={{marginTop: '2rem'}} className={classes.headingContainer}>
                                    <Typography variant={'h4'}>
                                        Comments
                                    </Typography>
                                </Box>

                                <Box>

                                    <Box className={classes.textFieldContainer}>
                                        <Controller
                                            name="comment"
                                            control={control}
                                            rules={{required: true, message: "You must have to specify the comment"}}
                                            defaultValue={''}
                                            render={({field}) => <TextField
                                                id="comment"
                                                label="Write Your comment"
                                                multiline
                                                rowsMax={4}
                                                fullWidth
                                                error={!!errors.comment}
                                                {...field}
                                                helperText={errors.comment ? "You must have to specify your comment" : ''}
                                                name={'comment'}
                                            />}
                                        />

                                    </Box>
                                    <Box className={classes.postButtonContainer}>
                                        <Button type={'submit'} variant={'contained'}
                                                color={'primary'}
                                                fullWidth>
                                            Submit
                                        </Button>
                                    </Box>

                                </Box>

                            </>
                        ) : (
                            <Box className={classes.headingContainer}>
                                <Typography variant={'h3'}>
                                    {'Loading...'}
                                </Typography>
                            </Box>
                        )
                    }

                    {
                        blog && !isLoading && comments.map(comment => (
                            <Box style={{margin: '1rem', padding: '2rem', background: '#e73b78', borderRadius: '20px'}}>
                                <Typography style={{color: 'white'}} variant={'body1'}>
                                    {comment}
                                </Typography>
                            </Box>
                        ))
                    }


                    {/*<Box style={{margin: '1rem', padding: '2rem', background: '#e73b78', borderRadius: '20px'}}>*/}
                    {/*    <Typography style={{color: 'white'}} variant={'body1'}>*/}
                    {/*        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias blanditiis culpa dolores ex*/}
                    {/*    </Typography>*/}
                    {/*</Box>*/}

                </Container>
            </form>
        </Box>
    );
};

export default BlogDetail;
