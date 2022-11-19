import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UploadPage() {

  const navigate = useNavigate();
  const [imageAsset, setImageAsset] = useState(undefined);
  const [title, setTitle] = useState('');
  const [savingPost, setSavingPost] = useState(false);


  const uploadImage = async (e) => {
    let img = e.target.files[0];
    if (!img.name.match(/\.(jpg|png)$/)) {
      alert('only JPG & PNG suports.');
      return false;
    }
    setImageAsset(e.target.files[0]);
    console.log(e.target.files[0])
  };

  const handlePost = async (e) => {
    if (imageAsset && title) {
      try {
        setSavingPost(true);
        let formData = new FormData();
        formData.append("imageAsset", imageAsset);
        formData.append("content", title);

        const resapi = await axios.post(`/post`, formData, {
          headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
            ContentType: `multipart/form-data; boundary=${formData._boundary}`,
          },
        })
        console.log("resapi", resapi)
        if (resapi.data.imgUrl) {
          setSavingPost(false);
          navigate(`/images/${resapi.data.postedBy}`, { replace: false })
        }

      } catch (error) {
        console.log(error)
        setSavingPost(false)
        alert("server error")
      }

    } else {
      alert("Please Fill All Fields")
    }

  };

  const handleDiscard = () => {
    setSavingPost(false);
    setImageAsset(undefined);
    setTitle('');
  };


  if (localStorage.getItem("user_name")) {
    return (
      <>
        <Navbar />

        <div className='mt-1 flex w-full h-[90vh] absolute left-0 mb-10 pt-10 lg:pt-10 bg-gradient-to-r from-purple-500 to-pink-500 bg-gradient-to-l hover:bg-gradient-to-r bg-cover bg-center justify-center'>
          <div className=' bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6'>
            <div>
              <div>
                <p className='text-2xl font-bold'>Upload Info</p>
                <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
              </div>
              {/* IMAGE */}
              <div className=' border-dashed rounded-xl border-4 border-gray-300 flex flex-col justify-center items-center  outline-none mt-10 w-[300px] h-[250px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
                {!imageAsset ? (<label>
                  <p className='text-xl font-semibold'>
                    Select Image to upload
                  </p>
                  <p className='bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                    Select Image
                  </p>
                  <input
                    type='file'
                    name='upload-image'
                    onChange={(e) => uploadImage(e)}
                    className='w-0 h-0' />
                </label>) : (
                  <><img src={URL.createObjectURL(imageAsset)} alt="nofile" />
                    <div className=' flex justify-between gap-20 '>
                      <button
                        type='button'
                        className=' rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                        onClick={() => setImageAsset(undefined)}
                      >Delete
                      </button>
                    </div></>
                )}

              </div>
            </div>

            {/* TITLE */}
            <div className='flex flex-col gap-3 pb-10'>
              <label className='text-md font-medium '>Title</label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='rounded hover:bg-gray-100 lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2'
              />
              {/* BUTTONS */}
              <div className='flex gap-6 mt-10'>
                <button
                  onClick={handleDiscard}
                  type='button'
                  className='border-gray-300 hover:bg-gray-100 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                >
                  Discard
                </button>
                <button
                  onClick={handlePost}
                  type='button'
                  className='bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                >
                  {savingPost ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  else {
    return (<>
      Please login first
      <button onClick={() => navigate('/')} style={{ padding: "5px", borderRadius: "3px", backgroundColor: "purple", color: "white", fontWeight: "600", width: "200px" }}>
        Click Here: Login Page
      </button>
    </>)
  }

};