import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
	//falls etwas, was im Layout steht nicht angezeigt werden soll.
	// const location = useLocation();

	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default Layout;
