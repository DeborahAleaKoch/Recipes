import { useParams } from "react-router";
import { IRecipes, mainContext, RecipesContext } from "../context/MainProvider";
import { useContext, useState } from "react";

interface Props {
	recipe: IRecipes | undefined;
}

const Detail: React.FC<Props> = () => {

    const {recipeDetailParam} = useParams()

	const {categories}=useContext(mainContext) as RecipesContext

	const [recipeDetail, setRecipeDetail] = useState<IRecipes>()

	if (!recipeDetail) {
		return <div>…</div>;
	}

	

	return (
		<>
			<h2>Zutaten</h2>
			<ul>
				{recipeDetail.ingredients.map((entry) => (
					<li>{entry.name}</li>
				))}
			</ul>
			<h2>Zubereitung</h2>
			<ul>{recipeDetail.instructions}</ul>
		</>
	);
};

export default Detail;
