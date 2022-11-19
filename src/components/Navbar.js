import logo from "../logo.svg"
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const[loading,setLoading]= useState(false)
  

  const handleLogout = async () => {
    setLoading(true)
    try {
      const resapi = await axios.delete("/logout")
      console.log("Post", resapi);
      if (resapi.data.msg) {
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('user_name')
        navigate(0)
      }
    } catch (err) {
      console.warn(err)
      alert(err.response.data)
    }
    setLoading(false)
  }

  return (
    <>

      <nav className="bg-[#581c87] border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Welcome {localStorage.getItem("user_name")}</span>
          </div>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">

            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {localStorage.getItem("jwtToken")
                ?
                <button
                  onClick={handleLogout}
                  style={{ padding: "5px", borderRadius: "3px", backgroundColor: "purple", color: "white", fontWeight: "600", width:"100px" }}>
                 {loading?"wait":"Logout"} 
                </button>
                : null}

              <li>
                <a href="https://github.com/AMRESH-SHARMA" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">For more projcts click here!</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
