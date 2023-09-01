const BASE_URL=`${import.meta.env.VITE_BACKEND_URL}/api/imageupload`

export const uploadImage = async(formData)=>{
    
    const response = await fetch(BASE_URL,{
        method:"POST",
        headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        body:formData,
    })
    if(!response.ok){
        throw new Error("Unable to upload your image")
    }
    const data = await response.json();
    
    
    return data
}