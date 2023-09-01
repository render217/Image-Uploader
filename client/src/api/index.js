const BASE_URL=`http://localhost:4000/api/v1/images/upload`

export const uploadImage = async(formData)=>{
    
    const response = await fetch(`${BASE_URL}`,{
        method:"POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body:formData,
    })
    if(!response.ok){
        throw new Error("Unable to upload your image")
    }
    const data = await response.json();
    
    
    return data
}