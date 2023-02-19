# Firebase Authentication

We will be using firebase in this project to handle our authentication and Database management.

I have quickly created a Project in my Firebase Admin Console.

The two main services we will be utilising are:

1. Authentication
2. Firestore Database

# Integration

First we need to install firebase to our project using NPM

```
    npm install firebase
```

# Flow

As front-end Engineers we need to understand the process of whats happening on the backend and understand our role in how to utilise the data.

To refresh: CRUD

C - Create
R - Read
U - Update
D - Delete

When we want to view or modify any data in our DB we send a request to our Server (Firebase) using a fetch request. This request will contain one of the values of CRUD

The server will then respond with the appropriate message

To safe guard our data, we utilise authentication.

If we use the Google Sign In Feature, the following flow occurs:

1. User fills in details
2. Details are sent to google servers for authentication.
3. If Auth is confirmed then Google will provide an Auth Token (Unique hashed string)
4. Google sends Auth token back to the client
5. The client will then send the auth token to Firebase
6. Firebase will then ask Google Servers to verify auth token.
7. If token is true, then Google Servers will send a verification token to Firebase.
8. Firebase will generate an access token (This defines what the user can access).
9. Firebase sends the access token back to client where it is stored in a session.

Now when a user wants to perform a CRUD action, the request is send with the access token to make sure the user can perform the action they have requested.

If any of the above actions fail then the response will contain an error message

# Connecting to Firebase

It is important to keep all our Firebase code together and well organised so our App is easy to maintain.

First we created a folder named utils, this is where we will store all our utility files, with firebase falling under this category

In our newly created firebase.utils.js file we need to import the our tools from our firebase package we installed earlier

The first function we require is the 'initializeApp' function, this creates an app instance for us based off the config we pass to it.

The config is an object that lets us connect our online firebase app we have created to our application.

To get our config details we need to go back to our firebase application and register the app as a Web App.

Once we have registered the App, firebase will generate us a package.

We then call our initializeApp function with our config passed to it

```
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
	apiKey: "AIzaSyDneoeGOxccwNwT6BraQWnpjoqNHq0iPT0",
	authDomain: "crwn-clothing-81b3e.firebaseapp.com",
	projectId: "crwn-clothing-81b3e",
	storageBucket: "crwn-clothing-81b3e.appspot.com",
	messagingSenderId: "1065891218449",
	appId: "1:1065891218449:web:5c1c4465c9a75d95f89db0",
};

const firebaseApp = initializeApp(firebaseConfig);
```

# Setting up Authentication

To start with authentication we need to import a few functions from firebase.

All the firebase auth is inside the 'firebase/auth' package.

```
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    } from "firebase/auth";
```

Next we need to create a provider using the GoogleAuthProvider class we just imported

```
const provider = new GoogleAuthProvider();
```

Now we need to add our custom parameters using setCustomParameters(). This function takes a config object.

The first item in our object is prompt.

```
    provider.setCustomParameters({
        promt: "select_account"
    })
```

What prompt does, is, everytime someone interacts with our provider, it forces them to select an account.

Lastly we need to export our getAuth function and our google sign in.

```
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
```

We pass both auth and our provider to the pop up function

Now we have created all our config we need to active our methods in our google console.

1. Go to Google Console
2. Select Authentication
3. Click 'Get Started'
4. Select Authentication Methods

## Adding Auth to our Component

With all the config wrapped up we now need to add the authentication to our component

We first create an asynchronous function to fire our Google Pop up

```
const logGoogleUser = async () => {
		const response = await signInWithGooglePopup();
		console.log(response);
	};
```

## Note

Just because a user has been authenticated it does not mean they can be found in our DB, we still need to create user record in our Firebase Firestore

Head over to the FirebaseFirestore Doc file to learn more
