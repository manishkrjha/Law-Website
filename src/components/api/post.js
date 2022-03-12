export const getPosts = async (pageNo, limit) => {
    try{
        const {data} = await client(`post/posts?pageNo=${pageNo}limit=${limit}`);
        return data;
    }catch(error){
        const { response } = error;

        if(response?.data){
            return response.data;
        }

        return {error: error.message || error};  
    }
}

export const uploadImage = async (formData) => {
    try{
        const {data} = await client.post(`post/upload-image`, formData);
        return data;
    }catch(error){
        const { response } = error;

        if(response?.data){
            return response.data;
        }

        return {error: error.message || error};  
    }
}

export const createPost = async (formData) => {
    try{
        const {data} = await client.post(`post/create`, formData);
        return data;
    }catch(error){
        const { response } = error;

        if(response?.data){
            return response.data;
        }

        return {error: error.message || error};  
    }
}

export const getPost = async (slug) => {
    try{
        const {data} = await client(`post/single/${slug}`);
        return data;
    }catch(error){
        const { response } = error;

        if(response?.data){
            return response.data;
        }

        return {error: error.message || error};  
    }
}

export const updatePost = async (postId, formData) => {
    try{
        const {data} = await client.put(`post/${postId}`, formData);
        return data;
    }catch(error){
        const { response } = error;

        if(response?.data){
            return response.data;
        }

        return {error: error.message || error};  
    }
}