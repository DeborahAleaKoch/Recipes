import { useContext, useState } from "react";
import { FavouriteRecipes } from "../components/FavouriteRecipes";
import { Category, mainContext } from "../context/MainProvider";
import SingleCard from "../components/SingleCard";

const Recipes = () => {
	const { categories } = useContext(mainContext);
	const [selectedCategory, setSelectedCategory] = useState<
		Category | undefined
	>();
	return (
		<>
			<section>
				<FavouriteRecipes />
				<h1>
					Hier können noch andere Rezept Kacheln hin kommen. Müssen aber nicht.
				</h1>
				<div className='flex gap-2.5 justify-evenly'>
					{categories?.map((categorie) => {
						return (
							<div
								onClick={() => setSelectedCategory(categorie)}
								key={categorie.id}
								className={`border-1 border-lime-300 bg-lime-200 px-3 py-1 rounded-xl ${
									selectedCategory?.id === categorie.id
										? "bg-rose-200"
										: "bg-lime-200"
								}`}
							>
								{categorie.name}
							</div>
						);
					})}
				</div>
				{!selectedCategory && (
					<div className="mx-10 my-5">
						{categories?.map((entry) =>
							entry.recipes.map((recipe) => <SingleCard recipe={recipe} />)
						)}
					</div>
				)}
				{selectedCategory?.recipes.map((entry) => (
					<SingleCard recipe={entry} />
				))}
			</section>
		</>
	);
};

export default Recipes;
