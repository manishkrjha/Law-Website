import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import PostForm, {defaultPost} from './PostForm';

export default function CreatePost() {
    const [postInfo, setPostInfo] = useState(null);
    const [busy, setBusy] = useState(false);
    const [resetAfterSubmit, setResetAfterSubmit] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        setBusy(true);
        // create post is a backend method
        const {error, post} = await createPost(data);
        
        setBusy(true);
        
        if(error) return console.log("Create post error");

        setResetAfterSubmit(true);
        navigate(`/update-post/${post.slug}`)
    };

    useEffect(() => {
        const result = localStorage.getItem('blogPost');

        if(!result) return

        const oldPost = JSON.parse(result);
        setPostInfo({...defaultPost, ...oldPost});
    }, [])

    return (
        <PostForm onSubmit={handleSubmit} initialPost={postInfo} busy={busy} postBtnTitle="Post" resetAfterSubmit={resetAfterSubmit}/>
    )

    // return(
    //     <div>
    //         Create Post;
    //     </div>
    // )
}