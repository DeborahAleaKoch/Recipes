import { useState } from "react";
import { IIngredients } from "../context/MainProvider";
import supabase from "../utils/supabase";

interface Props {
	initialIngredient: IIngredients;
}

const Ingredient: React.FC<Props> = ({ initialIngredient }) => {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [ingredient, setIngredient] = useState<IIngredients>(initialIngredient);

	if (!editMode) {
		return (
			<div onClick={() => setEditMode(true)}>
				<div>{ingredient.name}</div>
			</div>
		);
	}

	const saveIngredient = async (event: any) => {
		event.preventDefault();
		const { error: insertError } = await supabase
			.from("ingredients")
			.update({
				name: ingredient.name,
				quantity: ingredient.quantity,
				unit: ingredient.unit,
				additional_info: ingredient.additional_info,
			})
			.eq("id", ingredient.id);
		if (insertError) {
			console.warn("Fehler beim hinzufügen", insertError);
		} else {
			console.log("Zutat wurde erfolgreich geändert.");
			setEditMode(false);
		}
	};

	return (
		<div className=''>
			<input
				type='text'
				value={ingredient.name}
				key={ingredient.id}
				onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })}
				placeholder='Name'
			/>
			<input
				type='text'
				value={ingredient.quantity}
				onChange={(e) =>
					setIngredient({ ...ingredient, quantity: Number(e.target.value) })
				}
				placeholder='Menge'
			/>
			<input
				type='text'
				value={ingredient.unit}
				onChange={(e) => setIngredient({ ...ingredient, unit: e.target.value })}
				placeholder='Einheit'
			/>
			<input
				type='text'
				value={ingredient.additional_info}
				onChange={(e) =>
					setIngredient({ ...ingredient, additional_info: e.target.value })
				}
				placeholder='Zusatz'
			/>

			<button onClick={saveIngredient}>save</button>
		</div>
	);
};

export default Ingredient;
