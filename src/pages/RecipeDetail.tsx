import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import supabase from "../utils/supabase";

import { IRecipes } from "../context/MainProvider";
import EditRecipe from "./EditRecipe";

const RecipeDetail = () => {
	const navigate = useNavigate();

	const { recipeDetailParam } = useParams();
	// console.log(recipeDetailParam);

	const [recipeDetail, setRecipeDetail] = useState<IRecipes>();

	

	const fetchData = async () => {
		const response = await supabase
			.from("recipes")
			.select("*, ingredients ( *)")
			.eq("id", recipeDetailParam);

		setRecipeDetail(response.data?.[0]);
		console.log("im useEffect der DetailPage", response);
	};

	//hier neuer Fetch für die Detailansicht
	useEffect(() => {
		fetchData();
	}, [recipeDetailParam]);
	console.log(recipeDetail);

	if (!recipeDetail) {
		return <div>Keine Details für das Rezept gefunden!</div>;
	}

	const handleDeleteRecipe = async () => {
		const response = await supabase
			.from("recipes")
			.delete()
			.eq("id", recipeDetail.id);

		navigate("/home");
	};

	

	return (
		<>
			<div className='mx-5 my-5'>
				<h1 className='text-center text-4xl'>{recipeDetail.name}</h1>
				<h2 className='text-xl '>Portionen: {recipeDetail.servings}</h2>
				<h2 className='text-xl underline'>Zutaten:</h2>
				<ul>
					{recipeDetail.ingredients.map((entry) => (
						<li key={entry.id}>
							{entry.quantity} {entry.unit} {entry.name}
						</li>
					))}
				</ul>
				<h2 className='text-xl underline'>Zubereitung: </h2>
				<p>{recipeDetail.instructions}</p>
				<div className='flex gap-4'>
					<button
						onClick={handleDeleteRecipe}
						className='border-2 border-red-500 bg-red-200 rounded-2xl px-3 py-1 hover:bg-red-400 hover:ease-in-out hover:delay-100 mt-5'
					>
						entfernen
					</button>
					<Link
						to={`/editrecipe`}
						className='border-2 border-yellow-500 bg-yellow-200 rounded-2xl px-3 py-1 hover:bg-yellow-400 hover:ease-in-out hover:delay-100 mt-5'
					>
						bearbeiten
					</Link>
				</div>
			</div>
		</>
	);
};

export default RecipeDetail;
