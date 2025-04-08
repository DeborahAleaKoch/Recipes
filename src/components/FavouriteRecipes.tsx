import { useContext } from "react";
import { mainContext } from "../context/MainProvider";
import SingleCard from "./SingleCard";

export const FavouriteRecipes: React.FC = () => {
	const { categories } = useContext(mainContext);

	console.log("Categories: ", categories);

	const randomRecipe = categories?.[0].recipes?.[0];
	const randomRecipe2 = categories?.[3].recipes?.[0];
	const randomRecipe3 = categories?.[4].recipes?.[0];

	return (
		<div>
			<h1>Die beliebtesten Rezepte</h1>
			<div className='grid grid-cols-3 gap-8 items-center'>
				<SingleCard recipe={randomRecipe} />
				<SingleCard recipe={randomRecipe2} />
				<SingleCard recipe={randomRecipe3} />
			</div>
		</div>
	);
};
