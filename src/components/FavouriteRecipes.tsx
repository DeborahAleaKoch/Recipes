import { useContext, useEffect, useState } from "react";
import { IRecipes, mainContext } from "../context/MainProvider";
import SingleCard from "./SingleCard";
import supabase from "../utils/supabase";

export const FavouriteRecipes: React.FC = () => {
	const [recipes, setRecipes] = useState<IRecipes[]>([]);

	const { categories } = useContext(mainContext);

	console.log("Categories: ", categories);

	useEffect(() => {
		const fetchData = async () => {
			const response = await supabase.from("recipes").select("*");
			if (response) {
				setRecipes(response.data as unknown as IRecipes[]);
			}
			console.log("im useEffect Response:", response);
		};
		fetchData();
	}, []);

	console.log("recipes nach dem useEffect", recipes);

	return (
		<div className='mx-4'>
			<h1 className='text-4xl text-center py-3 '>Die beliebtesten Rezepte</h1>
			<div className='flex gap-5 items-center'>
				{recipes
					.map((recipe) => {
						return <SingleCard recipe={recipe} key={recipe.id} />;
					})
					.slice(0, 3)}
			</div>
		</div>
	);
};
