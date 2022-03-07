import React from "react";
import { useEffect } from "react";
import { getPosts } from "./api/post";

let pageNo = 0;
const POST_LIMIT = 9;

function Home() {

    const fetchPosts = async () => {
        const {error, posts} = getPosts(pageNo, POST_LIMIT);

        if(error){
            console.log(error);
        }

        console.log(posts);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home;