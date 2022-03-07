import React from "react";
import { useState } from "react";
import {ImSpinner11, ImEye, ImFilePicture, ImFileEmpty} from 'react-icons/im';

const defaultPost = {
    title: '',
    thumbnail: '',
    featured: '',
    content: '',
    tags: '',
    meta: ''
}

function CreatePost() {

    const [postInfo, setPostInfo] = useState({...defaultPost});
    const [selectedThumbnailUrl, setSelectedThumbnailUrl] = useState('');

    const handleChange = ({target}) => {
        const {value, name} = target;

        if(name === 'thumbnail'){
            const file = target.files[0];
            if(file.type?.includes('image')){
                return alert('This is not an image')
            }

            setPostInfo({...postInfo, [name]: value});
            return selectedThumbnailUrl(URL.createObjectURL(file));
        }

        setPostInfo({...postInfo, [name]: value});
    }

    const {title, content, featured, tags, meta} = postInfo;

    return (
        <form className="p-2 flex">
            <div className="w-9/12 h-screen space-y-3 flex flex-col">

            {/* title ans submit */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-700">
                    Create New Post
                </h1>

                <div className="flex items-center">
                    <button className="flex items-center space-x-2 px-3 ring-1 rounded h10 ring-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 transition">
                        <ImSpinner11 />
                        <span>Reset</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 ring-1 rounded h10 ring-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 transition">
                        <ImEye />
                        <span>View</span>
                    </button>
                    <button className="h-10 w-36 px-5 hover:ring-1 bg-blue-500 rounded text-white hover:text-blue-500 hover:bg-transparent ring-blue-500 transition">Post</button>
                </div>
            </div>
            
            {/* Featured and checkbox */}
            <div>
            <input id="featured" type="checkbox" hidden/>
            <label className="flex items-center space-x-2 text-gray-700 cursor-pointer group" htmlFor="featured">
                <div className="w-4 h-4 rounded-full border-2 border-gray-700 flex-items-center justify-center group-hover:border-blue-500">
                    <div className="w-2 h-2 rounded-full border-2 bg-gray-700 group-hover:bg-blue-500">

                    </div>
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
                    <input id="image-input" type="file"  hidden/>
                    <label htmlFor="image-input" className="flex items-center space-x-2 px-3 ring-1 rounded h10 ring-gray-700 text-gray-700 hover:text-white hover:bg-gray-700 transition cursor-pointer">
                        <span>Place image</span>
                        <ImFilePicture />
                    </label>
                </div>

                <div className="flex-1 flex justify-between bg-gray-400 rounded overflow-hidden">
                    <input type="text" value='' className="bg-transparent text-white w-full" disabled/>
                    <button className="text-xs flex flex-col items-center justify-center p-1 self-stretch bg-gray-700 text-white">
                        <ImFileEmpty />
                        <span>copy</span> 
                    </button>
                </div>
            </div>

            {/* tags input */}
            <div>
            <label htmlFor="tags">Tags</label>
            <input value={tags} name="tags" type="text" className="text-xl outline-none focus:ring-1 rounded p-2 w-full" placeholder="Tag one, tag two" />

            <textarea onChange={handleChange} id="tags" placeholder="Tags" className="resize-none outline-none focus:ring-1 rounded p-2 w-full font-semibold"></textarea>
            </div>
            
            {/* meta description input */}
            <div>
            <label htmlFor="meta">Meta description</label>
            <input value={meta} name="meta" type="text" className="text-xl outline-none focus:ring-1 rounded p-2 w-full" placeholder="Post Title" />

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
                         className="aspect-video shadow-sm"
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

            {/* <div className="bg-white absolute top-1/2 translate-y-1/2 ">
                <h1 className="font-semibold text-center">
                    General Markdown Rules
                </h1>
            </div> */}
        </form>
    )
}

export default CreatePost;