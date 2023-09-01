import React, { useCallback, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Tooltip } from "react-tooltip";
import { uploadImage } from "./api";
const App = () => {
  const [error, setError] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [requestState, setRequestStatus] = useState("idle"); // idle pending succeeded

  const [tooltipText, setTooltipText] = useState("");
  const handleCopyClick = () => {
    navigator.clipboard.writeText(imageLink);
    setTooltipText("Link Copied");
    setTimeout(() => {
      setTooltipText("");
    }, 2000);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    setRequestStatus("pending");
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    // console.log(formData.get("file"));
    try {
      const result = await uploadImage(formData);
      setRequestStatus("succeeded");
      setImageLink(result.imageUrl);
    } catch (error) {
      
      setError(error.message);
      setRequestStatus("idle");
    }
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "image/*": [] },
  });
  return (
    <div className="min-h-screen bg-cbgmain font-Poppins grid place-items-center">
      <div className="shadow-xl min-w-[370px] px-5 py-10 rounded-md">
        {requestState === "idle" && (
          <div className="text-center">
            <h1 className="text-lg">Upload your image</h1>
            <p
              className={`text-xs text-gray-500 ${
                error ? "text-red-400 font-semibold" : ""
              }`}
            >
              File should be jpeg,png... 
            </p>
            <p className="text-sm text-red-400 font-semibold">{error}</p>
            <div
              {...getRootProps({
                className:
                  "px-20 py-10 border-2 border-dotted border-gray-300 m-4 cursor-pointer hover:bg-slate-100 hover:border-sky-200",
              })}
            >
              <input {...getInputProps()} />
              <img className="w-full" src="image.svg" alt="" />
            </div>
            <p className="text-gray-500 my-2">or</p>
            <button
              onClick={open}
              className="bg-sky-600 rounded-md px-2 py-2  text-sm text-white"
            >
              Choose a file
            </button>
          </div>
        )}
        {requestState === "pending" && (
          <>
            <div className="min-w-[300px]">
              <h2 className="text-lg mb-8">Uploading...</h2>
              <div className="h-2 bg-gray-200 relative px-2 rounded-md">
                <div className="absolute bg-blue-600 w-20 h-2 duration-300 ease-in-out animate-marquee"></div>
              </div>
            </div>
          </>
        )}
        {requestState === "succeeded" && (
          <>
            <div className="text-center px-3">
              <span className="flex items-center h-10 w-10 justify-center rounded-full bg-green-600 px-1 py-1  mx-auto mb-3">
                <i className="text-white text-lg font-semibold fa-solid fa-check"></i>
              </span>
              <h3 className="text-lg">Uploaded Successfully</h3>
              <div className="my-4  max-w-[370px] mx-auto">
                <img
                  className="w-full shadow-sm  object-cover rounded-xl"
                  src={imageLink}
                  alt=""
                />
              </div>
              <div className="flex border border-gray-300 p-1 rounded-md">
                <input
                  className="pl-2 pr-2 flex-1 text-xs outline-0 border-none"
                  type="text"
                  defaultValue={imageLink}
                />
                <div>
                  <button
                    onClick={handleCopyClick}
                    data-tooltip-content={tooltipText}
                    data-tooltip-id="link-copy"
                    className="text-sm bg-blue-500 text-white rounded-md px-2 py-2"
                  >
                    Copy Link
                  </button>
                  <Tooltip id="link-copy" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <p className="fixed bottom-5 text-center text-sm text-gray-400">created By Beamlak Samson</p>
    </div>
  );
};

export default App;
