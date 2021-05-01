import React from 'react';
import {Box,TextField,Button, Container, makeStyles} from "@material-ui/core";
import {useForm, Controller} from 'react-hook-form';
import {firestore} from "../utils/firebase";
import {useDispatch} from "react-redux";
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

const AddBlog = () => {

    const classes = useStyles();

    const {control,reset, handleSubmit, formState: {errors}} = useForm();

    const dispatch = useDispatch();
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();


    const onSubmit = ({heading,desc}) => {
        firestore.collection('blogs').doc()
            .set({
                heading: heading,
                body: desc,
                comments: [],
            })
            .then(() => {
                enqueueSnackbar("Blog successfully written!", {variant: 'success'})
                console.log("Blog successfully written!");
                reset({heading: '',desc: ''});
                dispatch(getBlogs())
                history.replace('/');
            })
            .catch(err => {
                enqueueSnackbar("Error While writing the blog!!!", {variant: 'error'})
                console.log(err.message);
            })
    }

    return (
        <Box className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Container maxWidth={'sm'}>
                <Box className={classes.formContent}>
                    <Box className={classes.textFieldContainer}>
                        <Controller
                            name="heading"
                            control={control}
                            rules={{required: true}}
                            defaultValue={''}
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
                            rules={{required: true}}
                            defaultValue={''}
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
                </Box>
            </Container>
            </form>
        </Box>
    );
};

export default AddBlog;
