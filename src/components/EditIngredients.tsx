import { useEffect, useState } from "react";
import { IIngredients, IRecipes } from "../context/MainProvider";
import supabase from "../utils/supabase";
import Ingredient from "./Ingredient";

interface Props {
	recipe: IRecipes;
	updateRecipe: () => void;
}

const EditIngredients: React.FunctionComponent<Props> = ({
	recipe,
	updateRecipe,
}) => {
	const [allIngredients, setAllIngredients] = useState<IIngredients[]>([]);

	const [selectedIngredients, setSelectetIngredients] = useState<
		IIngredients[]
	>(recipe.ingredients);

	const fetchData = async () => {
		const response = await supabase.from("ingredients").select("*");
		console.log(response);
		if (response.data !== null) {
			setAllIngredients(response.data);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const addNewIngredient = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		const { error: insertError } = await supabase.from("ingredients").insert({
			id: crypto.randomUUID(),
			recipe_id: recipe.id,
			name: "n",
		});
		if (insertError) {
			console.warn("Fehler beim hinzufügen", insertError);
		} else {
			console.log("Zutat wurde erfolgreich hinzugefügt.");
			updateRecipe();
		}
	};

	return (
		<div className='mt-3'>
			<div className='border-1 rounded px-2 py-1'>
				{selectedIngredients.map((ingredient) => {
					return (
						<>
							<Ingredient initialIngredient={ingredient} key={ingredient.id} />
						</>
					);
				})}
			</div>
			<button onClick={addNewIngredient}>Zutat hinzufügen</button>
		</div>
	);
};

export default EditIngredients;
