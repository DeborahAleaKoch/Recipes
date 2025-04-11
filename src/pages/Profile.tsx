import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

export interface IUser {
	id: number;
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

const Profile = () => {
	const [profile, setProfile] = useState<IUser | null>(null);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [newUserName, setNewUserName] = useState<string>("");

	const fetchData = async () => {
		const { data: profile } = await supabase.auth.getUser();

		const { data: user, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", profile.user?.id);

		if (error) {
			console.warn(error, "Hier ist was schiefgelaufen beim fetch");
		} else {
			setProfile(user?.[0] || null);
		}
		console.log(user);
	};

	useEffect(() => {
		fetchData();
	}, []);

	function handleDoubleClick() {
		if (profile) {
			setNewUserName(profile.username);
			setIsEditing(true);
		}
	}

	async function handleSave() {
		const { data: user } = await supabase.auth.getUser();

		if (profile && newUserName !== profile.username) {
			const { error } = await supabase
				.from("profiles")
				.update({ username: newUserName })
				.eq("id", user.user?.id);

			if (error) {
				console.error("Fehler beim speichern", error);
			} else {
				fetchData();
			}
		}
		setIsEditing(false);
	}

	return (
		<>
			{profile && (
				<div>
					<h2>Profile</h2>
					<div onDoubleClick={handleDoubleClick}>
						<p>Username</p>
						{isEditing ? (
							<input
								type='text'
								placeholder='change your name'
								value={newUserName}
								onChange={(e) => setNewUserName(e.target.value)}
							/>
						) : (
							<p>{profile.username}</p>
						)}
					</div>
					<p>Firstname: {profile.firstname}</p>
					<p>Lastname: {profile.lastname}</p>
					{isEditing && <button onClick={handleSave}>save</button>}
				</div>
			)}
		</>
	);
};

export default Profile;
