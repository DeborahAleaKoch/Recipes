//hier noch ein Interface

import { createContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { IUser } from "../pages/Profile";

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
	unit: string | undefined;
	quantity: number | undefined;
	additional_info?: string;
}

export interface IRecipes {
	id: string;
	name: string;
	servings: number;
	instructions: string;
	description: string;
	category_id?: string;
	ingredients: IIngredients[];
}

export interface RecipesContext {
	categories: IData | undefined;
	ingredients: IIngredients | undefined;
	user: IUser | undefined;
	setUser: (value: IUser) => void;
	isLoggedIn: boolean;
	setIsLoggedIn: (value: boolean) => void;
}
//MainContext
//noch passendes Interface in Generics
export const mainContext = createContext<RecipesContext>({
	categories: undefined,
	ingredients: undefined,
	user: undefined,
	setUser: () => {},
	isLoggedIn: false,
	setIsLoggedIn: () => {},
});

const MainProvider = ({ children }: { children: React.ReactNode }) => {
	// useStates
	const [user, setUser] = useState<IUser>();
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const [categories, setCategories] = useState<IData>([]);
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

	// console.log("MainProvider - nach UseEffect: ", categories);

	return (
		<mainContext.Provider
			value={{
				categories,
				ingredients,
				user,
				setUser,
				isLoggedIn,
				setIsLoggedIn,
			}}
		>
			{children}
		</mainContext.Provider>
	);
};

export default MainProvider;
