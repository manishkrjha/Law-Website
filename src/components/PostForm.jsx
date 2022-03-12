import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {ImSpinner11, ImEye, ImFilePicture, ImFileEmpty, ImSpinner3} from 'react-icons/im';
import { uploadImage } from "./api/post";

export const defaultPost = {
    title: '',
    thumbnail: '',
    featured: false,
    content: '',
    tags: '',
    meta: ''
}

function PostForm({initialPost, busy, postBtnTitle, resetAfterSubmit ,onSubmit}) {

    const [postInfo, setPostInfo] = useState({...defaultPost});
    const [selectedThumbnailUrl, setSelectedThumbnailUrl] = useState('');
    const [imageUrlToCopy, setImageUrlToCopy] = useState('');
    const [imageUploading, setImageUploading] = useState(false);
    const [showDeviceView, setShowDeviceView] = useState(false);

    useEffect(() => {

        if(initialPost.thumbnail){
            setSelectedThumbnailUrl(initialPost.thumbnail);
        }

        setPostInfo({...initialPost});
        return () => {
            if(resetAfterSubmit) resetForm();
        }
    },[initialPost, resetAfterSubmit])

    const handleChange = ({target}) => {
        const {value, name, checked} = target;

        if(name === 'thumbnail'){
            const file = target.files[0];
            if(!file.type?.includes('image')){
                return alert('This is not an image')
            }

            setPostInfo({...postInfo, thumbnail: file});
            return setSelectedThumbnailUrl(URL.createObjectURL(file));
        }

        if(name === 'featured'){ 
            localStorage.setItem('blogPost', JSON.stringify({...postInfo, featured: checked})) 
            return setPostInfo({...postInfo, [name]: checked});
        }

        if(name === 'tags'){  
            const newTags = tags.split(',');
            if(newTags.length > 4){
                console.log('Tag limit exceeded!! You can only add upto 4 tags');
            }

        }

        if(name === 'meta' && meta.length >= 149){  
            return setPostInfo({...postInfo, meta: value.substring(0, 149)});
        }
            
        const newPost = {...postInfo, [name]: value}

        setPostInfo({...newPost});

        localStorage.setItem('blogPost', JSON.stringify(newPost));

    };

    const handleImageUpload = async ({target}) => {

        if(imageUploading) return;

        const file = target.files[0];

        if(!file.type?.includes('image')){
            return alert('This is not an image')
        }
        
        setImageUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        const {error, image} = await uploadImage(formData);

        setImageUploading(false);

        if(error){
            return console.log('Image upload error');
        }

        setImageUrlToCopy(image);
    }

    const handleOnCopy = () => {
        const textToCopy = `![All image description](${imageUrlToCopy})`
        navigator.clipboard.writeText(textToCopy);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {title, content, tags, meta} = postInfo;

        if(!title.trim()) return alert("Title is missing");
        if(!content.trim()) return alert("Content is missing");
        if(!tags.trim()) return alert("Tags are missing");
        if(!meta.trim()) return alert("Meta is missing");

        const slug = title
            .toLowercase()
            .replace(/[^a-zA-Z]/g, ' ')
            .split(' ').filter(item => item.trim())
            .join('-');

         const newTags = tags
            .split(',')
            .map(item => item.trim())
            .splice(0, 4);

        const formData = new FormData();

        const finalPost = {...postInfo, tags: JSON.stringify(newTags), slug};

        for(let key in finalPost){
            formData.append(key, finalPost[key]);
        }

        onSubmit(formData);
        if(resetAfterSubmit) resetForm()
    };

    const resetForm = () => {
        setPostInfo({...defaultPost});
        localStorage.removeItem('blogPost');
    }

    const {title, content, featured, tags, meta} = postInfo;

    return (

        <>

        <form onSubmit={handleSubmit} className="p-2 flex">
            <div className="w-9/12 h-screen space-y-3 flex flex-col">

            {/* title ans submit */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-700">
                    Create New Post
                </h1>

                <div className="flex items-center">
                    <button onClick={resetForm} type="button" className="flex items-center space-x-2 px-3 ring-1 rounded h10 ring-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 transition">
                        <ImSpinner11 />
                        <span>Reset</span>
                    </button>
                    <button onClick={() => setShowDeviceView(true)} type="button" className="flex items-center space-x-2 px-3 ring-1 rounded h10 ring-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 transition">
                        <ImEye />
                        <span>View</span>
                    </button>
                    <button className="h-10 w-36 hover:ring-1 bg-blue-500 rounded text-white hover:text-blue-500 hover:bg-transparent ring-blue-500 transition">{busy ? (<ImSpinner3 className="animate-spin mx-auto text-xl" />) : (
                        postBtnTitle
                    ) }</button>
                </div>
            </div>
            
            {/* Featured and checkbox */}
            <div className="flex">
            <input name="featured" value={featured} onChange={handleChange} id="featured" type="checkbox" hidden/>
            <label className=" select-none flex items-center space-x-2 text-gray-700 cursor-pointer group" htmlFor="featured">
                <div className="w-4 h-4 rounded-full border-2 border-gray-700 flex-items-center justify-center group-hover:border-blue-500">
                    {featured && (<div className="w-2 h-2 rounded-full border-2 bg-gray-700 group-hover:bg-blue-500">
                    </div>)}
                </div>
                <span className="group-hover:text-blue-500">Featured</span>
            </label>
            </div>

            {/* title input */}
            <input onChange={handleChange} value={title} name="title" type="text" className="text-xl outline-none focus:ring-1 rounded p-2 w-full font-semibold" placeholder="Post Title" />

            <textarea value={title} name="title" placeholder="## Markdown" className="resize-none outline-none focus:ring-1 rounded p-2 w-full flex-1 font-semibold font-mono tracking-wide text-lg"></textarea>

            {/* image inp */}
            <div className="flex space-x-2">
                <div>
                    <input onChange={handleImageUpload} id="image-input" type="file"  hidden/>
                    <label htmlFor="image-input" className="flex items-center space-x-2 px-3 ring-1 rounded h10 ring-gray-700 text-gray-700 hover:text-white hover:bg-gray-700 transition cursor-pointer">
                        <span>Place image</span>
                        {imageUploading ?  <ImFilePicture /> : <ImSpinner3 className="animate-spin"/>}
                    </label>
                </div>

                {imageUrlToCopy && <div className="flex-1 flex justify-between bg-gray-400 rounded overflow-hidden">
                    <input type="text" value={imageUrlToCopy} className="bg-transparent text-white w-full" disabled/>
                    <button onClick={handleOnCopy} type="button" className="text-xs flex flex-col items-center justify-center p-1 self-stretch bg-gray-700 text-white">
                        <ImFileEmpty />
                        <span>copy</span> 
                    </button>
                </div>}
            </div>

            <textarea
                value={content}
                onChange={handleChange}
                name="content"
                className="resize-none outline-none focus:ring-1 rounded p-2 w-full flex-1 font-mono tracking-wide text-lg"
            ></textarea>

            {/* tags input */}
            <div>
            <label className="text-gray-500" htmlFor="tags">Tags</label>
            <input value={tags} name="tags" type="text" className="text-xl outline-none focus:ring-1 rounded p-2 w-full" placeholder="Tag one, tag two" />

            <textarea onChange={handleChange} id="tags" placeholder="Tags" className="resize-none outline-none focus:ring-1 rounded p-2 w-full font-semibold"></textarea>
            </div>
            
            {/* meta description input */}
            <div>
            <label className="text-gray-500" htmlFor="meta">Meta description {meta?.length} / 150 </label>
            <input name="meta" value={meta}  type="text" className="text-xl outline-none focus:ring-1 rounded p-2 w-full" placeholder="Post Title" />

            <textarea onChange={handleChange} id="meta" placeholder="Meta description" className="resize-none outline-none focus:ring-1 rounded p-2 w-full h-28"></textarea>
            </div>
            </div>

            {/* Thumbnail */}
            <div className="w-1/4 px-2 relative">
                <h1 className="text-xl font-semibold text-gray-700 mb-2">Thumbnail</h1>

                <input onChange={handleChange} name="thumbnail" id="thumbnail" type="file" hidden/>
                <label className="cursor-pointer" htmlFor="thumbnail">
                     {selectedThumbnailUrl ? (
                         <img src={selectedThumbnailUrl}
                         className="aspect-video shadow-sm rounded"
                         alt=""
                        /> 
                     ):(
                    <div className="border border-dashed border-gray-500 aspect-video text-gray-500 flex flex-col justify-center items-center">
                        Thumbnail
                        <span>Select thumbnail</span>
                        <span className="text-xs">Recommended size</span>
                        <span className="text-xs">1280 * 720</span>
                    </div>
                    )}
                     
                </label>
            </div>
        </form>
        
        <DeviceView title={title} content={content} thumbnail={selectedThumbnailUrl} visible={showDeviceView} onClose={() => setShowDeviceView(false)} />

        </>
    )
}

export default PostForm;