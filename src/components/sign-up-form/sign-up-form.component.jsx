import { useState } from "react";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import CustomButton from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-up-form.style.jsx";
import { SignUpContainer } from "./sign-up-form.style.jsx";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		// Prevent url from reloading
		event.preventDefault();

		// If passwords don't match return
		if (password !== confirmPassword) {
			alert("Passwords must match");
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			await createUserDocumentFromAuth(user, {
				displayName,
			});

			resetFormFields();
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				alert("Sorry, that email is already in use");
			} else {
				alert(error);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<SignUpContainer>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					inputOptions={{
						type: "text",
						required: true,
						onChange: handleChange,
						name: "displayName",
						value: displayName,
					}}
				/>
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
				<FormInput
					label="Confirm Password"
					inputOptions={{
						type: "password",
						required: true,
						onChange: handleChange,
						name: "confirmPassword",
						value: confirmPassword,
					}}
				/>
				<CustomButton
					content="Sign Up"
					type="submit"
				/>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
