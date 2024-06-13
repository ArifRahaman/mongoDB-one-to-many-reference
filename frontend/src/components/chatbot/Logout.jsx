// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import Cookies from 'js-cookie'

// const Logout = () => {
//     const navigate = useNavigate()

//     const handleLogout = () => {
//         // Delete cookies
//         Cookies.remove('jwt') // Replace 'yourCookieName' with the name of the cookie you want to delete

//         // Redirect to handleLogoutthe login page or another page
//         navigate('/login') // Adjust the route as needed
//     }
//     return (
//         <div>
//             <button onClick={handleLogout}>
//                 Logout
//             </button>
//         </div>
//     )
// }

// export default Logout

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Cookies from "js-cookie"
const Logout = () => {
    const navigate=useNavigate();
    const handleLogout=()=>{
        const jwt=Cookies.get("jwt");
        console.log(jwt)
        Cookies.remove("jwt");
        navigate("/login");
    }
  return (
    <div>
          <button onClick={handleLogout} className='bg-red-400  '>Logout</button>
    </div>
  )
}

export default Logout
