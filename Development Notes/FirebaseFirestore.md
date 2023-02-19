# Firebase Firestore

## Firebase Data Model

Firebase consists of

-   data
-   document
-   collection

Think of collection as a folder.

Each seperate document is a individual piece of data.

The data is the information

## Document

A document is the smallest unit inside of firestore

Example:

Document: NikeAirMax

```
NikeAirMax = {
    id: 1
    name: "Air Max",
    brand = "Nike",
    imageURL: "www.imageURL.com",
    cost : {
        price: 150
        currency: "USD"
    }
}
```

Each document is basically a JSON Object.

## Collections

Image we have another Document for a Yeezy300 shoe.

We would store our 2 documents inside a collection names Shoes

# Integrating Firestore

Open firebase console and go to Firestore Database.

Click create Database and for ease of use, we can use the Production Config. The only difference is who can perform our CRUD Operations.

Once the database has been created go to the rules tab and edit the following code.

```

rules_version = '2';
service cloud.firestore {
    match /databases/{database}/documents {
        match /{document=**} {
            allow read, write: if false; <---- Change to true
        }
    }
}

rules_version = '2';
service cloud.firestore {
    match /databases/{database}/documents {
        match /{document=**} {
            allow read, write: if true;
        }
    }
}

```

This allows us to perform our CRUD operations.

## App Config

Like firebase authentication, firebase firestore is a seperate service so we need to import some methods from the 'firebase/firestore' directory.

The methods we need are

`getFirestore`

This allows us to instantiate our Firestore

`doc`

This allows us to retrieve document instance from our Firestore DB

`getDoc, setDoc`

getDoc allows us to get the Documents Data
setDoc allows us to set the Documents Data

Now we have imported our methods we can export getFirestore() as db, so its friendlier and easier to use
