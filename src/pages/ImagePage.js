import React from 'react'
import { useEffect, useState } from 'react'
import ImageCard from '../components/ImageCard'
import NoResults from '../components/NoResults'
import ServerError from '../components/ServerError'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const ImagePage = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('');

  const { userId } = useParams();
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // const resapi = await axios.get("/post")
        const resapi = await axios.get(`/post/${userId}`, {
          headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
          },
        })
        console.log("resapi", resapi);
        setData(resapi.data)
      } catch (err) {
        setError(true)
        console.warn(err)
      }
      setLoading(false)
    }
    fetchImages()
  }, [userId])

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const Filtered =
    data?.filter(item =>
      item.content.toLowerCase().includes(search.toLowerCase())
    )


  if (localStorage.getItem("jwtToken")) {
    return (<>
      <Navbar />

      {!loading ? (
        <>
          {error ?
            <ServerError /> :
            <>

              <div style={{ display: "flex" }}>
                <button
                  onClick={() => navigate('/UploadPage')}
                  style={{ margin: "5px", padding: "5px", borderRadius: "3px", backgroundColor: "purple", color: "white", fontWeight: "600", width: "200px" }}>
                  Upload Image
                </button>

                <input
                  onChange={handleSearch}
                  type="search"
                  placeholder="Search"
                  style={{ margin: "5px", padding: "5px", border: "solid purple 2px", borderRadius: "3px", color: "white", fontWeight: "600", width: "300px" }}
                  autoComplete="off" />
              </div>
              <div className='w-full h-auto absolute pb-10 pl-10 bg-gradient-to-r from-purple-500 to-pink-500 bg-gradient-to-l hover:bg-gradient-to-r bg-cover bg-center mt-1 xl:grid grid-cols-3'>

                {data && data.length ? (
                  Filtered?.map((item) => (
                    <ImageCard title={item.content} imgUrl={item.imgUrl} id={item._id} createdAt={item.createdAt} key={item._id} />
                  ))
                ) : (
                  <NoResults />
                )}
              </div>
            </>}
        </>
      ) : "Loading"}

    </>
    )
  } else {
    return (<>
      Please login first
      <button onClick={() => navigate('/')} style={{ padding: "5px", borderRadius: "3px", backgroundColor: "purple", color: "white", fontWeight: "600", width: "200px" }}>

        Click Here: Login Page
      </button>
    </>)
  }
}

export default ImagePage

