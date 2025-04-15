import { IceCream, Mug } from "react-kawaii";

const NotFound = () => {
	return (
		<div className='flex items-center justify-between'>
			<IceCream size={240} mood='ko' color='#fccb7e' />
			<h1 className='text-5xl text-balance text-center'>
				Bitte Logge Dich ein um diese Seite zu sehen!
			</h1>
			<Mug size={300} mood='ko' color='#add2ff' />
		</div>
	);
};

export default NotFound;
