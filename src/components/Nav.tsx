import { Link } from "react-router";

const Nav = () => {
	return (
		<>
			<div className='flex justify-between gap-5'>
				<Link to={`home`}>Home</Link>
				<Link to={`recipes`}>Rezepte</Link>
				<Link to={`aboutus`}>Über uns</Link>
				<Link to={`createrecipe`}>Neues Rezept</Link>
			</div>
		</>
	);
};

export default Nav;
