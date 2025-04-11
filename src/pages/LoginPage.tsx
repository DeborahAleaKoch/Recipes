import { useRef } from "react";
import { useNavigate } from "react-router";
import supabase from "../utils/supabase";

const LoginPage = () => {
	const navigate = useNavigate();

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const email = emailRef.current?.value || "";
		const password = passwordRef.current?.value || "";

		try {
			await supabase.auth.signInWithPassword({
				email: email,
				password: password,
			});
			navigate("/profile");
		} catch (error) {
			console.warn(error);
		}
	};

	return (
		<>
			<form className='text-center flex gap-3 p-5' onSubmit={handleLogin}>
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						placeholder='Email'
						className='border-1 rounded mx-3 px-2 '
						ref={emailRef}
					/>
				</div>
				<div>
					<label htmlFor=''>Password:</label>
					<input
						type='password'
						name=''
						id=''
						placeholder='password'
						className='border-1 rounded mx-3 px-2 '
						ref={passwordRef}
					/>
				</div>
				<button>Login</button>
			</form>
		</>
	);
};

export default LoginPage;
