import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IRecipes } from "../context/MainProvider";
import supabase from "../utils/supabase";

const EditRecipe = () => {
	const navigate = useNavigate();

	const [recipeData, setRecipeData] = useState<IRecipes | null>(null);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [newRecipeName, setNewRecipeName] = useState<string>("");
	const [newServingNr, setNewServingNr] = useState<number>();
	const [newInstructions, setNewInstructions] = useState<string>("");
	const [newDescription, setNewDescription] = useState<string>("");
	const [categorie, setCategorie] = useState<string>("");

	const { idParam } = useParams();

	const fetchData = async () => {
		const response = await supabase
			.from("recipes")
			.select("*")
			.eq("id", idParam);
		setRecipeData(response.data?.[0]);
		setNewServingNr(response?.data?.[0].servings);
		setNewDescription(response.data?.[0].description);
		setNewInstructions(response.data?.[0].instructions);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		const { error: insertError } = await supabase
			.from("recipes")
			.update({
				name: newRecipeName,
				description: newDescription,
				servings: newServingNr,
				instructions: newInstructions,
			})
			.eq("id", idParam);
		if (insertError) {
			console.warn("Fehler beim hinzufügen", insertError);
		} else {
			console.log("Rezept wurde erfolgreich geändert.");
			navigate(`/${idParam}`);
		}
	};

	async function handleSave() {
		if (recipeData && newRecipeName !== recipeData.name) {
			const { error } = await supabase
				.from("recipes")
				.update({ name: newRecipeName })
				.eq("id", recipeData.id);

			if (error) {
				console.error("Fehler beim speichern", error);
			} else {
			}
		}
		setIsEditing(false);
	}

	function handleClick() {
		if (recipeData) {
			console.log("hallo, ich wurde geklickt");

			setNewRecipeName(recipeData.name);
			setNewDescription(recipeData.description);
			setNewInstructions(recipeData.instructions);
			setNewServingNr(recipeData.servings);
			
			setIsEditing(true);
		}
	}

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
							value={recipeData?.category_id}
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

					<button type='submit' className='text-xl my-3 hover:text-lime-600'>
						Rezept speichern
					</button>
				</form>
			</div>
		</>
	);
};

export default EditRecipe;
