// const BASE_URLL=`${import.meta.env.VITE_BACKEND_URL}/api/imageupload`
const API_URL = `https://image-uploader-217.onrender.com/api/imageupload`
export const uploadImage = async(formData)=>{
    
    const response = await fetch(API_URL,{
        method:"POST",
        headers: {
            "Content-Type": "multipart/form-data"
          },
        body:formData,
    })
    if(!response.ok){
        throw new Error("Unable to upload your image")
    }
    const data = await response.json();
    console.log(data)
    return data
}