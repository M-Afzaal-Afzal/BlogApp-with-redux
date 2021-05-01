import React from 'react';
import {Box, Grid, Container, makeStyles, Typography, Card, CardContent, Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {deleteBlog} from "../store/Blog/blogActions";
import {Link} from "react-router-dom";
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        padding: '4rem 0',
        background: theme.palette.primary.main,
        minHeight: '100vh'
    },
    featureEntity: {
        padding: '1rem',
    },
    headingContainer: {
        marginBottom: '1rem',
    },
    descContainer: {
        marginBottom: '1rem',
    }
}))

const Home = () => {

    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();

    const blogs = useSelector(state => state.blogs.blogs);

    const isLoading = useSelector(state => state.blogs.isLoading);

    const error = useSelector(state => state.blogs.error);

    const dispatch = useDispatch();


    const blogDeleteHandler = async (id) => {

        await dispatch(deleteBlog(id));

        if (!isLoading && !error) {
            enqueueSnackbar("Blog deleted successfully!!!", {variant: 'success'})
        }

        if (error) {
            enqueueSnackbar(error, {variant: 'error'})
        }
    }

    return (
        <Box className={classes.mainContainer}>
            <Container maxWidth={'lg'}>
                <Grid container justify={'center'} alignItems={'center'}>
                    {!isLoading &&
                    blogs.map(({id, heading, body}) => (
                        <Grid
                            key={id}
                            item
                            style={{width: '100%'}}
                            md={4}
                            sm={6}
                            xs={12}
                            className={classes.featureEntity}
                        >
                            <Card>
                                <CardContent style={{paddingBottom: 0}}>
                                    <Box className={classes.headingContainer}>
                                        <Typography variant={'h4'}>
                                            {heading}
                                        </Typography>
                                    </Box>
                                    <Box className={classes.descContainer}>
                                        <Typography variant={'body1'}>
                                            {body.substr(0, 150)}...
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <Box style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '2rem'
                                }}>
                                    <Button component={Link} to={`/blog-detail/${id}`} style={{marginRight: '1rem'}}
                                            variant={'contained'} color={'secondary'}>
                                        Read More
                                    </Button>
                                    <Button component={Link} to={`/edit/${id}`} variant={'contained'}
                                            color={'secondary'}>
                                        Edit
                                    </Button>
                                </Box>

                                <Box style={{textAlign: 'center', margin: '1rem', marginBottom: '2rem'}}>
                                    <Button onClick={() => {
                                        blogDeleteHandler(id);
                                    }} variant={'contained'} color={'secondary'} fullWidth>
                                        Delete
                                    </Button>
                                </Box>
                            </Card>

                        </Grid>
                    ))
                    }

                    {
                        blogs.length === 0 && !isLoading &&
                        <Typography variant={'h4'} style={{color: 'white'}} align={'center'}>No Blogs</Typography>
                    }

                    {
                        isLoading &&
                        <Typography variant={'h4'} style={{color: 'white'}} align={'center'}>Loading...</Typography>
                    }
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;
