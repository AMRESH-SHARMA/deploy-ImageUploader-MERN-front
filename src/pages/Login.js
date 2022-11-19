import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [register, setRegister] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (register) {
      setSubmitting(true)
      try {
        const payload = { username: username, password: password }
        const resapi = await axios.post("/register", payload)
        console.log(resapi);
        if (resapi.data === 'registration done') {
           alert('registration done')
        }
      } catch (err) {
        console.warn(err)
        alert(err.response.data)
      }
      setSubmitting(false)
    }
    else {
      setSubmitting(true)
      try {
        const payload = { username: username, password: password }
        const resapi = await axios.post("/login", payload)
        console.log("Post", resapi);
        if (resapi.data.jwtToken) {
          localStorage.setItem("jwtToken", resapi.data.jwtToken)
          localStorage.setItem("user_name", resapi.data.foundUser.username)
          navigate(`/images/${resapi.data.foundUser._id}`)

        }
      } catch (err) {
        console.warn(err)
        alert(err.response.data)
      }
      setSubmitting(false)
    }
  }

  const handleRegisterbtn = () => {
    setRegister(!register)
  }

  return (<>
    <section className="h-screen">
      <div className="container px-6 py-12 h-full">
        <p className='text-2xl font-bold'>Please login</p>
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img
              alt=""
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
            />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <form onSubmit={(e) => handleSubmit(e)}>

              <div className="mb-6">
                <input
                  type="text"
                  onChange={(e) => setusername(e.target.value)}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="User name"
                  required
                />
              </div>


              <div className="mb-6">
                <input
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  required
                />
              </div>



              <button
                type="submit"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                {submitting ? "Wait" :
                  <>{register ? "Register" : "Sign in"}</>}

              </button>
              <div
                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
              >
              </div>

            </form>

            <div className="flex justify-between items-center mb-6">
              <div className="form-group form-check">
              </div>
              <button
                onClick={handleRegisterbtn}
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
              >{register ? "Sign in" : "Register"}</button>

            </div>

          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default Login