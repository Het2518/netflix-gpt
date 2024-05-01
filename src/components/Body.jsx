import React, {useEffect} from 'react';
import Login from "./Login";
import Browse from "./Browse";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {auth} from "../utils/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {useDispatch} from "react-redux";
import {addUser, removeUser} from "../utils/userSlice";


const Body = () => {
    const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {path: "/", element: <Login/>},
        {path: "/browse", element: <Browse/>},
    ])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid, email, displayName }));
            } else {
                dispatch(removeUser());
            }
        });

        return () => unsubscribe(); // Clean up the observer on unmount
    }, [dispatch]);
    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    );
};

export default Body;