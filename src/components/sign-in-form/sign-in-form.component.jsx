import { useState } from "react";

// Authentication Helper Functions
import {
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

// Components
import CustomButton, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

// Styles
import "./sign-in-form.style.jsx";
import { ButtonsContainer, SignInContainer } from "./sign-in-form.style.jsx";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	// Form Handler
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	// Reset Forms Helper Function
	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	// Google Sign in
	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	// Email and Password Submit
	const handleSubmit = async (event) => {
		// Prevent url from reloading
		event.preventDefault();

		try {
			await signInAuthUserWithEmailAndPassword(email, password);

			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("Incorrect Password");
					break;
				case "auth/user-not-found":
					alert("User not found");
					break;
				default:
					console.log(error);
			}
		}
	};

	return (
		<SignInContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password or Google account</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					inputOptions={{
						type: "email",
						required: true,
						onChange: handleChange,
						name: "email",
						value: email,
					}}
				/>
				<FormInput
					label="Password"
					inputOptions={{
						type: "password",
						required: true,
						onChange: handleChange,
						name: "password",
						value: password,
					}}
				/>
				<ButtonsContainer>
					<CustomButton
						content="Sign In"
						type="submit"
					/>
					<CustomButton
						type="button"
						content="Sign In with Google"
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={signInWithGoogle}
					/>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
