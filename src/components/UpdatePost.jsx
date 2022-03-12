import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "./api/post";
import PostForm, { defaultPost } from "./PostForm";

function UpdatePost() {
    const [busy, setBusy] = useState(false);
    const [postInfo, setPostInfo] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const {slug} = useParams();

    const fetchPost = async() => {
        const {error, post} = await getPost(slug)

        if(error){ 
            setNotFound(true);    
            return console.log(`error`)
        };

        setPostInfo({...post, tags: post.tags?.join(', ')})
    }

    useEffect(() => {
        fetchPost()
    }, [])

    const handleSubmit = (data) => {
        setBusy(true);
        // create post is a backend method
        const {error, post} = await updatePost(postInfo.id, data);
        
        setBusy(true);
        
        if(error) return console.log("Create post error");

        setPostInfo({...post, tags: post.tags?.join(', ')});
    };

    if(notFound){
        return <NotFound />;
    }
    
    return (
        <PostForm onSubmit={handleSubmit} initialPost={postInfo} busy={busy} postBtnTitle='Update'/>
    )
}

export default UpdatePost;