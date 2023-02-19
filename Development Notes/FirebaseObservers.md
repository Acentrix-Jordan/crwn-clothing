# Firebase Observers

To keep our code clean and more manageable, we can utilise Firebase Observers.

To date we have added our authentication that is spread across multiple components and directories.

To help firebase provide something called an Observable Listener. This used to hook into a stream of event.

First we need to import the method onAuthStateChanged from the firebase/auth directory

`import { onAuthStateChanged } from 'firebase/auth'`

This returns us a listener

Next we can create a helper function that we will later use in our UserContext component.

```
export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
}
```

The call back we pass will be fired each time the auth state changes

onAuthStateChanged is an open listener, so it is always active, this is not good for performance (memory leak), so when the UserContext unmounts we need to stop this listener

# Observer Pattern

Listeners have 3 methods

1. next: (nextval) => { //This is our code }
2. error: (error) => { // do something with error }
3. complete: () => { //do something when finished }
