import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { mainContext } from "../context/MainProvider";
import { IUser } from "./Profile";
import supabase from "../utils/supabase";

interface IUserProps {
	user: IUser;
	setUser: (value: IUser) => void;
}

const SignUp = () => {
	const { user, setUser } = useContext(mainContext) as IUserProps;

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const firstnameRef = useRef<HTMLInputElement>(null);
	const lastnameRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const email = emailRef.current?.value || "";
		const password = passwordRef.current?.value || "";
		const username = usernameRef.current?.value || "";
		const firstname = firstnameRef.current?.value || "";
		const lastname = lastnameRef.current?.value || "";

		if (user) {
			setUser({
				...user,
				email: email,
				username: username,
				password: password,
				firstname: firstname,
				lastname: lastname,
			});
		}
		console.log(user);

		try {
			const { data, error } = await supabase.auth.signUp({
				email: email,
				password: password,
				options: {
					data: {
						username: username,
						firstname: firstname,
						lastname: lastname,
						email: email,
					},
				},
			});
			if (error) {
				console.warn("Sign up hat nicht funktioniert", error);
			} else {
				console.log(data);
			}
			// navigate("/profile");
		} catch (error) {
			console.warn(error);
		}
	};
	return (
		<>
			<form onSubmit={handleSignUp}>
				<h2>Sign Up</h2>
				<label htmlFor='email'>Email</label>
				<input type='text' name='email' placeholder='Email' ref={emailRef} />

				<label htmlFor='password'>Password</label>
				<input
					type='text'
					name='password'
					placeholder='Password'
					ref={passwordRef}
				/>

				<label htmlFor='username'>Username</label>
				<input
					type='text'
					name='username'
					placeholder='Username'
					ref={usernameRef}
				/>

				<label htmlFor='firstname'>First Name</label>
				<input
					type='text'
					name='firstname'
					placeholder='First Name'
					ref={firstnameRef}
				/>

				<label htmlFor='lastname'>Last Name</label>
				<input
					type='text'
					name='lastname'
					placeholder='Last Name'
					ref={lastnameRef}
				/>

				<button type='submit'>Register</button>
				<Link to='/login'>Du hast bereits ein Konto?</Link>
			</form>
		</>
	);
};

export default SignUp;
