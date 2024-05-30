// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useState } from 'react'
// import axios from "axios"
// import { useNavigate } from 'react-router-dom'

// const Login = () => {
//  const[message,setMessage]=useState("");
//  const [email,setemail] = useState();
//  const[password,setPassword]=useState();
//  const navigate=useNavigate();
// //  const handleLogin=(e)=>{
// //     e.preventDefault();
// //     axios.post("http://localhost:3001/login",{email,password})

// //     .then(result=>{console.log(result)
// //         if(result.data==="Success"){
// //  navigate("/home")
// //         }

    
// //     })
// //     .catch(err=>console.log(err))
// //  }
//     // Example in the login component
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:3001/login", { email, password });
//             if (response.data.message === "Success") {
//                 localStorage.setItem("userId", response.data.userId);
//                 navigate("/home");
//                 // Redirect to upload page or set user state
//             } else {
//                 // navigate("/home");
//                 setMessage(response.data.message);
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             setMessage("Login failed");
//         }
//     };

//   return (

//  <>
//  <section class="bg-gray-50 dark:bg-gray-900">
//   <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//       <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//           <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
//           Flowbite    
//       </a>
//       <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//           <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//               Login to this Account
//               </h1>
//               <form class="space-y-4 md:space-y-6" action="#"  onSubmit={handleLogin}>
                  
//                   <div> 
//                       <label htmlfor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//                       <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
//                       onChange={(e)=>setemail(e.target.value)}/>
//                   </div>
//                   <div>
//                       <label htmlfor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                       <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
//                          onChange={(e)=>setPassword(e.target.value)}/>
                 
//                   </div>
            
//                   <div class="flex items-start">
//                       <div class="flex items-center h-5">
//                         <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
//                       </div>
//                       <div class="ml-3 text-sm">
//                         <label htmlfor="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
//                       </div>
//                   </div>
//                   <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</button>
    
  
//               </form>
//             <Link to="/signup"class="text-sm font-light text-gray-500 dark:text-gray-400" >
//                       New to this Website?? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</a>
//                   </Link>
//           </div>
//       </div>
//   </div>
// </section>
//     </>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", { email, password });
      if (response.data.message === "Success") {
        localStorage.setItem("userId", response.data.userId);
        navigate("/home");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <>
        <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Flowbite
                    </a>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login to this Account
                            </h1>
                          <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>

                                <div>
                                    <label htmlfor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlfor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                        onChange={(e) => setPassword(e.target.value)} />

                                </div>

                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label htmlfor="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</button>


                            </form>
                            <Link to="/signup" class="text-sm font-light text-gray-500 dark:text-gray-400" >
                                New to this Website?? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
    </>
  );
}

export default Login;

