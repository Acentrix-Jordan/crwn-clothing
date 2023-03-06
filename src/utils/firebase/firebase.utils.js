import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDneoeGOxccwNwT6BraQWnpjoqNHq0iPT0",
	authDomain: "crwn-clothing-81b3e.firebaseapp.com",
	projectId: "crwn-clothing-81b3e",
	storageBucket: "crwn-clothing-81b3e.appspot.com",
	messagingSenderId: "1065891218449",
	appId: "1:1065891218449:web:5c1c4465c9a75d95f89db0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Create Auth Provider
const googleProvider = new GoogleAuthProvider();

// Set Custom Parameters
googleProvider.setCustomParameters({
	prompt: "select_account", // Forces user to select account when they interact with the provider
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

// Instantiate Database
export const db = getFirestore();

/**
 * Add Data to Database
 * @param collectionKey - Collection Name
 * @param objectsToAdd - JSON Data
 */
export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log("done");
};

/**
 * Get Data from Database
 */
export const getCollectionAndDocuments = async () => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	// This protects our code if no userAuth is passed
	if (!userAuth) return;
	// doc( database, collection, unique identifier )
	const userDocRef = doc(db, "users", userAuth.uid);

	// Create a snpashot of the users info when they sign in
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.log("Error creating the user", error);
		}
	}

	return userDocRef;
};

/**
 * Email and Password
 */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Sign in User with Email and Password
 */
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign Out Function
 */
export const signOutAuthUser = () => signOut(auth);

/**
 * On  Auth State Changed Listener
 */
export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);
