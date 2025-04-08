import { Link } from "react-router";
import { IRecipes } from "../context/MainProvider";

interface Props {
	recipe: IRecipes | undefined;
}

const SingleCard: React.FC<Props> = ({ recipe }) => {
	if (!recipe) {
		return <div>…</div>;
	}

	return (
		<>
			<div className='border-2 border-amber-400 rounded-2xl flex flex-col h-30'>
				<h1 className='bg-amber-300 rounded-t-xl px-2 py-2'>{recipe.name}</h1>
				<p className='px-2'>{recipe.description}</p>

				<Link to={`/recipes/${recipe.id}`}>zum Rezept</Link>
			</div>
		</>
	);
};

export default SingleCard;
