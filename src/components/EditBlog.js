import React from 'react';
import {Box, Typography, TextField, Button, Container, makeStyles} from "@material-ui/core";
import {useForm, Controller} from 'react-hook-form';
import {firestore} from "../utils/firebase";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getBlogs} from "../store/Blog/blogActions";
import {useHistory} from "react-router-dom";
import {useSnackbar} from "notistack";

const useStyles = makeStyles(() => ({
    root: {
        background: '#14163E',
        width: '100%',
        padding: '8rem 0',
        minHeight: '100vh',
    },
    formContent: {
        background: '#FAFAFB',
        padding: '2rem',
        borderRadius: '20px',
    },
    textFieldContainer: {
        marginBottom: '2rem',
    },
    submitButtonContainer: {
        marginTop: '2rem',
    }
}))

const EditBlog = () => {

    const classes = useStyles();

    const {id} = useParams();

    const blogs = useSelector(state => state.blogs.blogs)
    const isLoading = useSelector(state => state.blogs.isLoading)

    const blog = blogs.filter((blog) => blog.id === id)[0];

    const heading = blog?.heading;
    const desc = blog?.body;

    const dispatch = useDispatch();
    const history = useHistory();

    const {enqueueSnackbar} = useSnackbar();

    const {control, reset, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            heading: heading,
            desc: desc
        }
    });


    const onSubmit = ({heading, desc}) => {
        firestore.collection('blogs').doc(id)
            .update({
                heading: heading,
                body: desc,
                comments: [],
            })
            .then(async () => {
                enqueueSnackbar("Blog successfully updated!", {variant: 'success'})
                console.log("Blog successfully updated!");
                await reset({heading: '', desc: ''});
                history.replace('/')
                await dispatch(getBlogs());
            })
            .catch(err => {
                enqueueSnackbar("Error While updating the blog!!!", {variant: 'error'})
                console.log(err.message);
            })
    }

    return (
        <Box className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container maxWidth={'sm'}>
                    <Box className={classes.formContent}>
                        {
                            !isLoading ? (
                                <>
                                    <Box className={classes.textFieldContainer}>
                                        <Controller
                                            name="heading"
                                            control={control}
                                            defaultValue={heading}
                                            rules={{required: true}}
                                            render={({field}) => <TextField
                                                id="heading"
                                                label="heading"
                                                error={!!errors.heading}
                                                fullWidth
                                                helperText={errors.heading ? "You must have to specify heading" : ''}
                                                {...field}
                                            />}
                                        />
                                    </Box>

                                    <Box className={classes.textFieldContainer}>
                                        <Controller
                                            name="desc"
                                            control={control}
                                            defaultValue={desc}
                                            rules={{required: true}}
                                            render={({field}) => <TextField
                                                id="desc"
                                                label="desc"
                                                multiline
                                                rowsMax={4}
                                                fullWidth
                                                error={!!errors.notes}
                                                {...field}
                                                helperText={errors.notes ? "You must have to specify description" : ''}
                                                name={'desc'}
                                            />}
                                        />

                                    </Box>

                                    <Box className={classes.submitButtonContainer}>
                                        <Button variant={'contained'} color={'primary'} type={"submit"} fullWidth>
                                            Submit
                                        </Button>
                                    </Box>
                                </>
                            ) : (
                                <Box>
                                    <Typography color={'primary'} variant={'h4'} align={'center'}>
                                        Loading...
                                    </Typography>
                                </Box>
                            )
                        }

                    </Box>
                </Container>
            </form>

        </Box>
    );
};

export default EditBlog;
