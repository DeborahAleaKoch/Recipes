import { useContext } from "react";
import { mainContext } from "../context/MainProvider";
import Login from "./Login";
import Logo from "./Logo";
import Nav from "./Nav";
import supabase from "../utils/supabase";



const logOut = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.log("User ist nicht ausgeloggt ", error);
	}
};

const Header = () => {
	const { isLoggedIn } = useContext(mainContext) ;
	return (
		<div className=''>
			<div className='flex justify-between px-8 pt-11 '>
				<Logo />
				<Nav />

				{isLoggedIn ? (
					<button
						onClick={logOut}
						className='cursor-pointer hover:text-pink-600'
					>
						LogOut
					</button>
				) : (
					<Login />
				)}
			</div>

			<div className='w-full'>
				<div className=' bg-[url(./../public/img/Banner.svg)] object-cover bg-no-repeat text-4xl text-white text-center h-60 text-balance pt-11 leading-13'>
					Lassen Sie sich inspirieren, kochen Sie mit <br />
					Leidenschaft und erleben Sie unvergessliche <br />
					Momente bei Tisch .
				</div>
			</div>
		</div>
	);
};

export default Header;
