import { Link } from "react-router";

const Login = () => {
	return (
		<>
			<Link to={`loginpage`} className='cursor-pointer hover:text-pink-600'>
				Login
			</Link>
		</>
	);
};

export default Login;
