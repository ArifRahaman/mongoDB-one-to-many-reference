// import { createContext, useContext, useState, useEffect } from "react";
// import Cookies from "js-cookie";

// export const AuthContext = createContext();

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuthContext = () => {
// 	return useContext(AuthContext);
// };

// export const AuthContextProvider = ({ children }) => {
// 	const [authUser, setAuthUser] = useState(null);

// 	useEffect(() => {
// 		const jwt = Cookies.get("jwt");
// 		if (jwt) {
// 			// Assuming you decode the JWT to get the user info
// 			// This requires a JWT decoding library, e.g., jwt-decode
// 			const user = JSON.parse(atob(jwt.split('.')[1]));
// 			setAuthUser(user);
// 		}
// 	}, []);

// 	return (
// 		<AuthContext.Provider value={{ authUser, setAuthUser }}>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(null);

	useEffect(() => {
		const jwt = Cookies.get("jwt");
		if (jwt) {
			const user = jwtDecode(jwt);
			setAuthUser(user);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ authUser, setAuthUser }}>
			{children}
		</AuthContext.Provider>
	);
};
