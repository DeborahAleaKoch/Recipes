import { useContext, useEffect, useState } from "react";
import { IUser } from "../pages/Profile";
import { mainContext } from "../context/MainProvider";
import supabase from "../utils/supabase";
import { Navigate } from "react-router";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isLoggedIn, setIsLoggedIn, setUser } = useContext(
		mainContext
	) 

	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const checkLogingStatus = async () => {
			const { data } = await supabase.auth.getUser();
			// console.log(data);
			const user = data.user;
			//doppeltet ! negiert die aussage nochmal. macht aus einem truthy/falsy ein true/false
			setIsLoggedIn(!!user);

			if (user) {
				setUser(user as unknown as IUser);
			}
			setLoading(false);
		};
		checkLogingStatus();
	}, [setUser, setIsLoggedIn]);

	if (loading) {
		return <div>... Loading</div>;
	}
	return !isLoggedIn ? <Navigate to='/login' replace /> : children;
};

export default ProtectedRoute;
