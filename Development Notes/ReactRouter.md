# React Router

In the project we will be using React Router to handle our routing.

Below I will add notes about how I have implemented React Router into this project.

## Getting Started

To add React Router we use NPM to install the package. At time of writing we are using v6

`npm install react-router-dom@6`

Once we have installed React Router DOM we need to integrate it to our application.

## Integration

RRD = React Router DOM

First we need to wrap our application in a Browser Router component that is provided by RRD

The Browser Router is the Generic Router in RRD and is used to keep track of the users history of where they are routing to and from.

Now we have wrapped our application in the BrowserRouter component we can access all the features that RRD provides us

To further break down our application we need to create a Routes folder, to store all our top level route components

The first Route component we created is our Home component, we then moved all of our markup out of app.js and added it to our new Home Component

```
<BrowserRouter>
    <App />
<BrowserRouter/>
```

## Routes and Route

Now have moved all our markup into our Home Component we, need to tell the application what to render.

Firstly in our App.js we imported the Routes and Route components from RRD

### Routes

This is our top level component and allows our app to register our Route components

### Route

This is where we define our specific route, when the URL matches the route, the app will render the given component.

We pass to parameters to our Route Component

1. Path: This is what our Route is looking to match
2. Element: This is the component we want to be rendered to the DOM.

## Nested Routes and Outlets

We can nest routes within routes but for the content to render, we need to tell the parent component where to render it.

We use another component provided by RRD, called an Outlet.

Where ever we place the outlet in the parent component is where our nested routes content will render.

This is important for when we need persistent components across multiple pages, example: Navigation or Side bars

In our App.js we have created our top level route with a path of '/' which renders our navigation component.

Within this route we have to children routes, one for home and one for the shop.

In our Navigation component we have added an outlet componet below all our content so our child routes will render there.

On our Home child route we have given this component and attribute of index. This tells RRD that when we land on our '/' route we want to render our Home Component

```
const Navigation = () => {
    return (
        <>
            <div>
                <Link to="/" />
                <Link to="/shop" />
            </div>
        </>
    )
}

<Routes>
    <Route path="/" element={<Navigation />}>
        <Route index element={<Home/>} />
        <Route path="shop" element={<Shop/>} />
    </Route>
<Routes/>
```

## Link

Instead of using Anchor tags, RRD provides us a Link Component which is built to work with the Browser Router Component we added earlier

We need to give our Link an attribute of 'to', this is an anchors version of href

`<Link to="/" />`
