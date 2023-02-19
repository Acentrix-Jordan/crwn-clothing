# React Context

We pass our data to our Context Component to avoid prop drilling.

Prop Drilling is when we have to pass data a components props, even when the component doesn't require the data.

# Creating a Context Component.

In this project we have created a folder in our src, called contexts, this is where we will store all our context components.

Within this folder we have created a user.context.jsx file, which will hold our data when a user has been authenticated.

First we need to import createContext from react.

```
import { createContext } from 'react';
```

Now we can create our context.

Our context is broken down into two sections.

The first being where we store our Value.

```
export const UserContext = createContext({
    // Default value
})
```

The second being the Provider, this is the actual component

```
export const UserProvider = ({ children }) => {
    return <UserContext.Provider>{ children }</UserContext.Provider>
}
```

For every context that we build there will be a .Provider

The .Provider is what we wrap our components that require the values inside.

In our UserProvider component we need to pass it a value attribute which is equal to our contextual values.

Boilerplate Context Example:

```
import { useState } from "react";
import { createContext } from "react";

// Value we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// Provider
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
```

# Using Context

Now we have created our context we need to wrap our components in the UserProvider Component we created in the user.context.jsx file.

I went into index.js and wrapped the <App /> component in the UserProvider as I want all the components to be able to access the data.

Next I need to go to the SignIn Component and import the context and the useContext hook from react.

```
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context'
```

Inside our component we can then destructure of UserContext;

```
const { setCurrentUser } = useContext(UserContext);
```

Above we have destructured the setCurrentUser function, as when we SignIn we want to keep the values of the signed in User.

To confirm this has worked in our Navigation component we again imported our useContext and UserContext but instead we destructured the currentUser function, and logged it to the console to show the that the value has been set and the Navigation component can access the context value.

In a Nutshell, Context is just a component that stores our state which all our components can access
