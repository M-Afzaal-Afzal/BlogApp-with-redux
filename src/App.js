import React, {useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./components/Home";
import EditBlog from "./components/EditBlog";
import AddBlog from "./components/AddBlog";
import Header from "./components/Header";
import BlogDetail from "./components/BlogDetail";
import {useDispatch} from "react-redux";
import {getBlogs} from "./store/Blog/blogActions";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogs())
    })

    return (
        <Router>
            <Header/>
            <Switch>
                <Route path="/edit/:id">
                    <EditBlog/>
                </Route>
                <Route path="/add">
                    <AddBlog/>
                </Route>
                <Route path="/blog-detail/:id">
                    <BlogDetail/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
