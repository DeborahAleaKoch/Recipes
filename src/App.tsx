import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router";
import "./App.css";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Recipes from "./pages/Recipes";
import LoginPage from "./pages/LoginPage";
import RecipeDetail from "./pages/RecipeDetail";
import NotFound from "./pages/NotFound";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";

// import { useEffect } from "react";
// import supabase from "./utils/supabase";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Layout />}>
				<Route path='home' element={<Home />} />
				<Route path='aboutus' element={<AboutUs />} />
				<Route path='recipes' element={<Recipes />} />
				<Route path='loginpage' element={<LoginPage />} />
				<Route path='recipes/:recipeDetailParam' element={<RecipeDetail />} />
				<Route path='createrecipe' element={<CreateRecipe />} />
				<Route path={`editrecipe`} element={<EditRecipe />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		)
	);

	return (
		<>
			<main>
				<RouterProvider router={router} />
			</main>
		</>
	);
}

export default App;
