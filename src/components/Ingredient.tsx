import { useState } from "react";
import { IIngredients } from "../context/MainProvider";
import supabase from "../utils/supabase";

interface Props {
	initialIngredient: IIngredients;
	deleteIngredient: (ingredient: IIngredients) => void;
}

const Ingredient: React.FC<Props> = ({
	initialIngredient,
	deleteIngredient,
}) => {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [ingredient, setIngredient] = useState<IIngredients>(initialIngredient);

	const handledeleteIngredient = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		deleteIngredient(ingredient);
	};

	if (!editMode) {
		return (
			<div className='flex gap-2'>
				<div onClick={() => setEditMode(true)}>
					<div>{ingredient.name}</div>
				</div>
				<button
					onClick={handledeleteIngredient}
					className='bg-amber-100 rounded-4xl px-2'
				>
					x
				</button>
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
		<div className='my-1 flex gap-2 justify-end text-black'>
			<input
				type='text'
				value={ingredient.name}
				key={ingredient.id}
				onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })}
				placeholder='Name'
				className='border-1 rounded hover:bg-slate-200 px-2'
			/>
			<input
				type='text'
				value={ingredient.quantity}
				onChange={(e) =>
					setIngredient({ ...ingredient, quantity: Number(e.target.value) })
				}
				placeholder='Menge'
				className='border-1 rounded hover:bg-slate-200 px-2'
			/>
			<input
				type='text'
				value={ingredient.unit}
				onChange={(e) => setIngredient({ ...ingredient, unit: e.target.value })}
				placeholder='Einheit'
				className='border-1 rounded hover:bg-slate-200 px-2'
			/>
			<input
				type='text'
				value={ingredient.additional_info}
				onChange={(e) =>
					setIngredient({ ...ingredient, additional_info: e.target.value })
				}
				placeholder='Zusatz'
				className='border-1 rounded hover:bg-slate-200 px-2'
			/>

			<button
				onClick={saveIngredient}
				className='border-1 rounded px-3 py-1 hover:bg-slate-200 hover:text-pink-400'
			>
				save
			</button>
			<button onClick={handledeleteIngredient}>X</button>
		</div>
	);
};

export default Ingredient;
