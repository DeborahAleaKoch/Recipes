import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import NotFound from "./NotFound";

export interface IUser {
	id: number;
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	img_url?: string;
}

const Profile = () => {
	const [profile, setProfile] = useState<IUser | null>(null);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [newUserName, setNewUserName] = useState<string>("");
	const [newFirstName, setNewFirstName] = useState<string>("");
	const [newLastName, setNewLasttName] = useState<string>("");

	const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

	const fetchData = async () => {
		const { data: profile } = await supabase.auth.getUser();

		const { data: user, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", profile.user?.id);

		if (error) {
			console.warn(error, "Hier ist was schiefgelaufen beim fetch");
		} else {
			setProfile(user?.[0]);
			console.log("im else", user?.[0]);
		}
		console.log("im fetchData", user);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const uploadPhoto = async () => {
		if (!profilePhoto) return null;

		// das ist genauso wenn man e.target.value
		const fileName = profilePhoto.name;
		const { data, error } = await supabase.storage
			.from("profile-img")
			.upload(fileName, profilePhoto);
		console.log(data);
		console.log(error);

		if (error) {
			console.warn("fehler beim upload des Photos in signUp!");
			return null;
		}

		const photoUrl = supabase.storage.from("profile-img").getPublicUrl(fileName)
			.data.publicUrl;
		console.log(photoUrl);

		return photoUrl;
	};

	function handleDoubleClick() {
		if (profile) {
			setNewUserName(profile.username);
			setNewFirstName(profile.firstname);
			setNewLasttName(profile.lastname);
			setIsEditing(true);
		}
	}

	async function handleSave() {
		const { data: user } = await supabase.auth.getUser();

		const uploadedImgUrl = await uploadPhoto();
		if (!uploadedImgUrl) {
			return null;
		}

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

		if (profile && newFirstName !== profile.firstname) {
			const { error } = await supabase
				.from("profiles")
				.update({ firstname: newFirstName })
				.eq("id", user.user?.id);

			if (error) {
				console.error("Fehler beim speichern", error);
			} else {
				fetchData();
			}
		}

		if (profile && newLastName !== profile.lastname) {
			const { error } = await supabase
				.from("profiles")
				.update({ lastname: newLastName })
				.eq("id", user.user?.id);

			if (error) {
				console.error("Fehler beim speichern", error);
			} else {
				fetchData();
			}
		}
		setIsEditing(false);
	}
	// console.log("debo:", profile);

	return (
		<>
			{profile ? (
				<div className='text-center m-4 text-gray-400 h-screen'>
					<h2 className='text-3xl underline mb-2'>Profile</h2>
					<img
						src={profile.img_url}
						alt='hier könnte dein Avatar sein'
						className=''
					/>

					<div
						onDoubleClick={handleDoubleClick}
						className='flex flex-col items-center justify-center gap-3'
					>
						<div className='flex items-center justify-center gap-3'>
							<p>Username:</p>
							{isEditing ? (
								<input
									type='text'
									placeholder='change your name'
									value={newUserName}
									onChange={(e) => setNewUserName(e.target.value)}
									className='border-1 rounded bg-pink-50 hover:border-pink-700 px-2 py-1'
								/>
							) : (
								<p>{profile.username}</p>
							)}
						</div>

						<div className='flex items-center justify-center gap-3'>
							<p>Firstname:</p>
							{isEditing ? (
								<input
									type='text'
									placeholder='change your name'
									value={newFirstName}
									onChange={(e) => setNewFirstName(e.target.value)}
									className='border-1 rounded bg-pink-50 hover:border-pink-600 px-2 py-1'
								/>
							) : (
								<p>{profile.firstname}</p>
							)}
						</div>

						<div className='flex items-center justify-center gap-3'>
							<p>Lastname:</p>
							{isEditing ? (
								<input
									type='text'
									placeholder='change your name'
									value={newLastName}
									onChange={(e) => setNewLasttName(e.target.value)}
									className='border-1 rounded bg-pink-50 hover:border-pink-600 px-2 py-1'
								/>
							) : (
								<p>{profile.lastname}</p>
							)}
						</div>

						<div>
							<input
								type='file'
								accept='image/*'
								onChange={(e) => {
									if (e.target.files) {
										setProfilePhoto(e.target.files[0]);
									}
								}}
								className='border-1 border-pink-200 rounded px-3 py-1 hover:bg-pink-300'
							/>
							<button onClick={handleSave}>Hochladen</button>
						</div>
					</div>

					{isEditing && (
						<button
							onClick={handleSave}
							className='border-1 rounded px-3 py-1 hover:text-pink-600 mt-3'
						>
							save
						</button>
					)}
				</div>
			) : (
				<NotFound />
			)}
		</>
	);
};

export default Profile;
