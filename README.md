# react-user-list-kata

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This code example retrieves data from an API and displays the returned list on page, items in the list can be selected and edited. I'm structured like a large application, so I’ve effectively boiled the ocean given the required functionality, but this is just an example of one feature.

## Install

Clone the repo and run `yarn` to install node modules.

Run `yarn start` to run the app on port 3001 (make sure you also have the API running which is in a separate repo)

Run `yarn test` to run the unit tests

The e2e tests are in a seperate repo [e2e tests repo](https://github.com/stottle-uk/react-user-list-kata-e2e)

## Info

I normally structure applications by feature so anything related to users and their profile is all in the `Users` directory. This includes the components, services and redux state.

`Users` can depend on functionality from the `shared` folder and other features, but there shouldn't be anything in the shared folder that would depend on `users`. This also means another feature can depend on `Users`, but `Users` cannot also depend on something in that same feature.

All the data is stored in redux state and components have split responsibilities for retrieving data and displaying data, they shouldn't do both (but we can be pragmatic).

There are a few todo's scattered around for functionality or features i would add in the 'real world'

The `httpService` also has a retry strategy to handle 500 responses from the API - it will retry up to 4 times before it throws an error. The retry strategy is very basic at the moment but could be updated to have a linear or exponential back-off strategy.

## Redux State

The pattern I have created uses a lot of boilerplate, but everything is strongly typed for TypeScript and each part of the state has its own file - actions, reducer, epics and selectors.

Each feature has a store and is imported/configured in the `./store/configureStore.ts`. The main store is also split into separate responsibilities/files.

### Actions

I've used a similar pattern to NGRX for Angular to create the `actions`. All `actions` are classes and a ‘type’ is exported from the actions files and used in the reducer (all case statements are strongly typed) and `mapDispatchToProps` functions. There was an issue with this though and redux thought the classes were for an async action and threw an error but got around this with middleware to convert the class to a plain object.

### Reducers

The reducer files contain the initial state and the reducer - nothing else.

### Epics

Epics are like effects in NGRX and dependencies are injected for business logic and making API calls etc. The dependencies can also be mocked for unit testing.

Epics use `rxjs` to manage the streams of data and also handle the subscription to observables to not clutter the components with cleanup code. Each epic has a Start, Success, Failure action for async methods which looks good in the devTools and is a consistant pattern. It also means other semi-related actions can be dispatched within the epics and all the logic can be kept in one place (like showing a toast to the user when something has happened).

Along with `selectors`, this is where business logic is normally found.

### Selectors

Selectors return memoized data from the redux store and can be used to efficiently compute derived data from the Redux store - bit overkill for this app.

### Styling

I've used Bulma CSS for styling and a react library that wraps the bulma components. I've added a few custom classes in `App.css`, but I’ve tried to keep it simple and give feedback to the user when something is happening/loading. It's not going to win any awards for UI/UX :), but works on all size devices.

## Testing

I only added one unit-test for the `userList` epic as it contained some business logic for sorting the list - I could/should add more tests, but I’ve also created e2e tests using cypress in this [e2e tests repo](https://github.com/stottle-uk/react-user-list-kata-e2e)
