# Function Plotter

Plots _arbitrary_ **user-entered** functions.

## Platform and Language

I chose Electron as a platform because it can make beautiful efficient **cross-platform** _desktop applications_ (like my fav. code editor **VS Code**).

## How to Run Code

You need **Node** in order to build and run the project.

```bash
# Install node decencies
npm install

# Run electron program
npm start
```

## Documentation

Code related to _equation evaluation and sampling_ is thoroughly documented in **Equation.svelte**.

## Tests

### On Success

![Success Output](/screenshots/success.png)

### On Failure

No Function
![Failure (No Function) Output](/screenshots/failure1.png)

Wrong Function
![Failure (Wrong Function) Output](/screenshots/failure2.png)

Wrong Bounds
![Failure (Wrong Bounds) Output](/screenshots/failure3.png)
