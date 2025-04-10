import { useNavigate } from "react-router";
import { IRecipes } from "../context/MainProvider";
import supabase from "../utils/supabase";
import { useState } from "react";

export type NewRecipe = Omit<IRecipes, "ingredients">;

const CreateRecipe = () => {
	const navigate = useNavigate();

	const [nameInput, setNameInput] = useState<string>("");
	const [descriptionInput, setDescriptionInput] = useState<string>("");
	const [servingsInput, setServingsInput] = useState<number>(0);
	const [insturctionInput, setInstructionInput] = useState<string>("");
	const [categorieInput, setCategorieInput] = useState<string>("");

	const addRecipe = async (recipe: NewRecipe) => {
		const { error: insertError } = await supabase
			.from("recipes")
			.insert(recipe);
		if (insertError) {
			console.error("Fehler beim einfügen", insertError);
		} else {
			console.log("Rezept wurde hinzugefügt");
			navigate(`/recipes/${recipe.id}`);
		}
	};

	const handleSubmit = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		addRecipe({
			name: nameInput,
			id: crypto.randomUUID(),
			servings: servingsInput,
			instructions: insturctionInput,
			description: descriptionInput,
			category_id: categorieInput,
		});
	};

	return (
		<div className='mx-36'>
			<h1 className='text-2xl underline text-center mb-7'>
				Hier kannst du dein eigenes Rezept hochladen:
			</h1>
			<form action='' className='flex flex-col' onSubmit={handleSubmit}>
				<div className='grid grid-cols-2 text-right  gap-3 '>
					<label htmlFor=''>Name</label>
					<input
						type='text'
						className='border-1 rounded'
						value={nameInput}
						onChange={(event) => setNameInput(event.target.value)}
					/>
					<label htmlFor=''>Beschreibung</label>
					<input
						type='text'
						className='border-1 rounded'
						value={descriptionInput}
						onChange={(event) => setDescriptionInput(event.target.value)}
					/>
					<label htmlFor=''>Anzahl der Portionen</label>
					<input
						type='number'
						className='border-1 rounded'
						value={servingsInput}
						onChange={(event) => setServingsInput(Number(event.target.value))}
					/>
					<label htmlFor=''>Anleitung</label>
					<textarea
						name=''
						id=''
						className='border-1 rounded'
						value={insturctionInput}
						onChange={(event) => setInstructionInput(event.target.value)}
					/>
					<label htmlFor='categorie'>Categorie</label>
					<select
						name='categorie'
						id='categorie'
						value={categorieInput}
						onChange={(event) => setCategorieInput(event.target.value)}
						className='border-1 rounded'
					>
						<option value='df623a8e-7b10-4590-902f-7eb2ce2e1a91'>Drink</option>
						<option value='0818ba22-48c2-4d62-a3a1-d813ddbb4a34'>Salad</option>
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

				<button type='submit' className='text-xl my-3 hover:text-lime-600'>
					Rezept speichern
				</button>
			</form>
		</div>
	);
};

export default CreateRecipe;
