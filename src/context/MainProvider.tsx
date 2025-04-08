//hier noch ein Interface

import { createContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";

//Interface
export type IData = Category[];

export interface Category {
	id: string;
	name: string;
	recipes: IRecipes[];
}
export interface IIngredients {
	id: string;
	name: string;
	unit: string;
	quantity: number;
	additional_info?: string;
}

export interface IRecipes {
	id: string;
	name: string;
	servings: number;
	instructions: string;
	description: string;
    category_id?:string;
	ingredients: [
		{
			id: string;
			name: string;
			unit: string;
			quantity: number;
			additional_info?: string;
		}
	];
}

export interface RecipesContext {
	categories: IData | undefined;
	ingredients: IIngredients | undefined;
}
//MainContext
//noch passendes Interface in Generics
export const mainContext = createContext<RecipesContext>({
	categories: undefined,
	ingredients: undefined,
});

const MainProvider = ({ children }: { children: React.ReactNode }) => {
	// useStates
	const [categories, setCategories] = useState<IData>([]);

	const [recipes, setRecipes] = useState<IRecipes>();
	const [ingredients, setIngredients] = useState<IIngredients>();

	//useEffect
	useEffect(() => {
		const fetchData = async () => {
			const resp = await supabase
				.from("categories")
				.select("*,recipes(*,ingredients(*))");
			if (resp) {
				setCategories(resp.data as IData);
			}
			console.log(resp);
		};
		fetchData();
	}, []);

	console.log(categories);

	return (
		<mainContext.Provider value={{ categories, ingredients }}>
			{children}
		</mainContext.Provider>
	);
};

export default MainProvider;
