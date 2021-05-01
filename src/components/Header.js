import React from 'react';
import {AppBar, Box, Button, Container, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    leftIconsContainer: {
        textAlign: 'left',
    },
    rightIconsContainer: {
        textAlign: 'right',
    },
    headerButton: {
        color:'white',
        marginLeft: '2rem',
    },
    headerToolbarMargin: {
        ...theme.mixins.toolbar,
    }
}))

const Header = () => {

    const classes = useStyles();

    return (
        <>
        <AppBar position={'fixed'}>
            <Container maxWidth={'lg'}>
                <Toolbar>
                    <Box className={`${classes.grow} ${classes.leftIconsContainer}`}>
                        <Typography variant={'h5'}>
                            Blogs
                        </Typography>
                    </Box>
                    <Box className={`${classes.grow} ${classes.rightIconsContainer}`}>
                        <Button component={Link} to={'/'} color={'secondary'} variant={'contained'}
                                className={classes.headerButton}>
                            Home
                        </Button>
                        <Button component={Link} to={'/add'} color={'secondary'} variant={'contained'} className={classes.headerButton}>
                            Add Blog
                        </Button>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
            <Box className={classes.headerToolbarMargin}/>
        </>
    );
};

export default Header;
