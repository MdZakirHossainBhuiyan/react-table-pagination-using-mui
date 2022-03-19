import React from 'react';
import { useLocation } from 'react-router-dom';
import {PostsInterface} from "../Home/Home";

const Details = () => {
    const {state} = useLocation();
    const post = state as PostsInterface;

    return (
        <div data-testid="details">
            <pre>
                {
                    JSON.stringify(post, null, 2)
                }
            </pre>
        </div>
    );
};

export default Details;