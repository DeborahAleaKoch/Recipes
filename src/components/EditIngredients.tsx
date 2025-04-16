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
	// const [selectedIngredients, setSelectetIngredients] = useState<
	// 	IIngredients[]
	// >(recipe.ingredients);

	const addNewIngredient = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		const { error: insertError } = await supabase.from("ingredients").insert({
			id: crypto.randomUUID(),
			recipe_id: recipe.id,
			name: `Name `,
		});
		if (insertError) {
			console.warn("Fehler beim hinzufügen", insertError);
		} else {
			console.log("Zutat wurde erfolgreich hinzugefügt.");
			updateRecipe();
		}
	};

	const deleteIngredient = async (ingredient: IIngredients) => {
		const { error: insertError } = await supabase
			.from("ingredients")
			.delete()
			.eq("id", ingredient.id);
		if (insertError) {
			console.warn("Fehler beim löschen", insertError);
		} else {
			console.log("Zutat wurde erfolgreich gelöscht.");
			updateRecipe();
		}
	};

	return (
		<div className='mt-3'>
			<div className='border-1 rounded px-2 py-1'>
				{recipe.ingredients.map((ingredient) => {
					return (
						<>
							<Ingredient
								deleteIngredient={deleteIngredient}
								initialIngredient={ingredient}
								key={ingredient.id}
							/>
						</>
					);
				})}
			</div>
			<button
				onClick={addNewIngredient}
				className='hover:text-pink-600 cursor-pointer '
			>
				Zutat hinzufügen
			</button>
		</div>
	);
};

export default EditIngredients;
