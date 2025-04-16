import { useState } from "react";

import { IRecipes } from "../context/MainProvider";
import supabase from "../utils/supabase";
import EditIngredients from "./EditIngredients";

interface Props {
	recipe: IRecipes;
	stopEditing: () => void;
	updateRecipe: () => void;
}

const EditRecipe: React.FC<Props> = ({ recipe, stopEditing, updateRecipe }) => {
	const [newRecipeName, setNewRecipeName] = useState<string>(recipe.name);
	const [newServingNr, setNewServingNr] = useState<number>(recipe.servings);
	const [newInstructions, setNewInstructions] = useState<string>(
		recipe.instructions
	);
	const [newDescription, setNewDescription] = useState<string>(
		recipe.description
	);
	const [categorie, setCategorie] = useState<string | undefined>(
		recipe.category_id
	);

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		const { error: insertError } = await supabase
			.from("recipes")
			.update({
				name: newRecipeName,
				description: newDescription,
				servings: newServingNr,
				instructions: newInstructions,
				category_id: categorie,
				// ingredients: recipe.ingredients,
			})
			.eq("id", recipe.id);
		if (insertError) {
			console.warn("Fehler beim hinzufügen", insertError);
		} else {
			console.log("Rezept wurde erfolgreich geändert.");
			stopEditing();
		}
	};

	return (
		<>
			<div className='mx-36'>
				<h1 className='text-2xl underline text-center mb-7'>
					hier können rezepte bearbeitet werden
				</h1>
				<form action='' className='flex flex-col' onSubmit={handleSubmit}>
					<div className='grid grid-cols-2 text-right  gap-3 '>
						<label htmlFor=''>Name</label>
						<input
							type='text'
							className='border-1 rounded'
							value={newRecipeName}
							onChange={(e) => setNewRecipeName(e.target.value)}
						/>
						<label htmlFor=''>Beschreibung</label>
						<input
							type='text'
							className='border-1 rounded'
							value={newDescription}
							onChange={(e) => setNewDescription(e.target.value)}
						/>
						<label htmlFor=''>Anzahl der Portionen</label>
						<input
							type='number'
							className='border-1 rounded'
							value={newServingNr}
							onChange={(e) => setNewServingNr(Number(e.target.value))}
						/>
						<label htmlFor=''>Anleitung</label>
						<textarea
							name=''
							id=''
							className='border-1 rounded'
							value={newInstructions}
							onChange={(e) => setNewInstructions(e.target.value)}
						/>
						<label htmlFor='categorie'>Categorie</label>
						<select
							name='categorie'
							id='categorie'
							value={categorie}
							onChange={(e) => setCategorie(e.target.value)}
							className='border-1 rounded'
						>
							<option value='df623a8e-7b10-4590-902f-7eb2ce2e1a91'>
								Drink
							</option>
							<option value='0818ba22-48c2-4d62-a3a1-d813ddbb4a34'>
								Salad
							</option>
							<option value='43405b78-7b75-4089-8734-821e69216ee4'>
								Appetizer
							</option>
							<option value='bd6fb575-1150-4035-9a71-1ab49cdbf5dd'>
								Dessert
							</option>
							<option value='bd8b58f3-ff23-47dc-9117-ce8e23e07c8d'>Soup</option>
							<option value='ce6b6b9b-39f1-4358-a216-f0b3aa6c0be4'>
								Main Course
							</option>
						</select>
					</div>

					<EditIngredients recipe={recipe} updateRecipe={updateRecipe} />
					<button type='submit' className='text-xl my-3 hover:text-pink-600'>
						Rezept speichern
					</button>
				</form>
			</div>
		</>
	);
};

export default EditRecipe;
