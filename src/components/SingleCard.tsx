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
			<div
				className='border-2 border-lime-600 rounded-t-xl pb-3 w-1/3 md:w-full md:my-5'
				key={recipe.id}
			>
				<h3 className='bg-lime-200 px-3 py-2 rounded-t-xl'>{recipe.name}</h3>
				<p className='px-3 py-2'>{recipe.description}</p>
				<Link
					to={`/recipes/${recipe.id}`}
					className='border-1 border-lime-800 rounded px-4 py-1 bg-lime-200 hover:bg-lime-400 hover:ease-in-out hover:delay-100 mx-3 '
				>
					zum Rezept
				</Link>
			</div>
		</>
	);
};

export default SingleCard;
