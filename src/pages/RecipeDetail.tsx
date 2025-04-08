import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import supabase from "../utils/supabase";

import { IRecipes } from "../context/MainProvider";

const RecipeDetail = () => {
	const navigate = useNavigate();

	const { recipeDetailParam } = useParams();
	// console.log(recipeDetailParam);

	const [recipeDetail, setRecipeDetail] = useState<IRecipes>();

	//hier neuer Fetch für die Detailansicht
	useEffect(() => {
		const fetchData = async () => {
			const response = await supabase
				.from("recipes")
				.select("*, ingredients ( *)")
				.eq("id", recipeDetailParam);

			setRecipeDetail(response.data?.[0]);
			console.log("im useEffect der DetailPage", response);
			console.log(recipeDetail);
		};
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
		console.log("response:_", response);
		navigate("/home");
	};

	return (
		<>
			<h1>Rezept Detailansicht</h1>
			<h2>Portionen: {recipeDetail.servings}</h2>
			<h2>Zutaten:</h2>
			<ul>
				{recipeDetail.ingredients.map((entry) => (
					<li key={entry.id}>
						{entry.quantity} {entry.unit} {entry.name}
					</li>
				))}
			</ul>
			<h2>Zubereitung: </h2>
			<p>{recipeDetail.instructions}</p>
			<button onClick={handleDeleteRecipe}>entfernen</button>
		</>
	);
};

export default RecipeDetail;
