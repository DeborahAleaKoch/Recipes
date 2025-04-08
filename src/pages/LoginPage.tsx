const LoginPage = () => {
	return (
		<>
			<form className='text-center flex gap-3 p-5'>
				<div>
					<label htmlFor=''>Login Name:</label>
					<input
						type='text'
						placeholder='LoginName'
						className='border-1 rounded mx-3 px-2 '
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
					/>
				</div>
			</form>
		</>
	);
};

export default LoginPage;
