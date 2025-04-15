import { Link } from "react-router";

const Nav = () => {
	return (
		<>
			<div className='flex justify-between gap-5 '>
				<Link to={`home`} className=' hover:text-pink-600'>
					Home
				</Link>
				<Link to={`recipes`} className=' hover:text-pink-600'>
					Rezepte
				</Link>
				<Link to={`aboutus`} className=' hover:text-pink-600'>
					Über uns
				</Link>
				<Link to={`createrecipe`} className=' hover:text-pink-600'>
					Neues Rezept
				</Link>
				<Link to={`profile`} className=' hover:text-pink-600'>
					Profil
				</Link>
				<Link to={`signup`} className=' hover:text-pink-600'>
					Sign Up
				</Link>
			</div>
		</>
	);
};

export default Nav;
