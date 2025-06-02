// import React from 'react';
// class User extends React.Component{}
// Component is a base class in React
// that allows you to create class-based components.

import { Component } from "react";

class User extends Component {
  // constructor method is used to initialize state and bind methods
  // constructor receives props as an argument
  // props are always passed through the constructor in class-based components
  constructor(props) {
    console.log("User (CHILD) constructor called");
    // Call the parent constructor with props
    super(props);
    // super is used to call the constructor of the parent class (Component)
    // super(props) is necessary to access this.props in the constructor
    // parent class means React.Component
    // this is a reference to the current instance of the class (User)
    // this is used to access properties and methods of the class
    // in class based components, this.props is used to access props

    // CREATING AN INSTANCE OF THE COMPONENT means creating an object of the User class
    // The constructor is where you can initialize state and bind methods

    this.state = {
      // state is an object that holds the component's data
      // state can be used to store data that changes over time
      // state is mutable, meaning it can be changed using setState
      userName: "John Doe",
      userAge: 30,
      userLocation: "Kathmandu",
      count: 0, // example of a state variable that can be updated
      // you can add more state variables as needed
      count2: 0, // another example of a state variable
    };

    // STATE VS PROPS
    // props are read-only and passed from parent to child components
    // state is mutable and can be changed within the component
    // can i use both props and state in the same component?
    // Yes, you can use both props and state in the same component.

    // You can also bind methods here if needed
    // this.handleClick = this.handleClick.bind(this);

    // binding means to set the context of 'this' for the method
    // in simple terms, binding is used to ensure that 'this' refers to the current instance of the class when the method is called
  }

  // componentDidMount is a lifecycle method that is called after the component is mounted
  async componentDidMount() {
    console.log("User (CHILD) componentDidMount called");
    // This is a good place to fetch data or perform side effects
    // You can make API calls or set up subscriptions here
    const response = await fetch("https://api.github.com/users/bishalk21");
    const data = await response.json();
    this.setState({
      userName: data.name,
      userAge: data.age,
      userLocation: data.location,
      avatar_url: data.avatar_url,
    });
  }

  // componentDidUpdate is a lifecycle method that is called after the component is updated
  componentDidUpdate(prevProps, prevState) {
    console.log("User (CHILD) componentDidUpdate called");
    // This is a good place to perform actions after the component has updated
    // You can compare previous props and state with current props and state
    // For example, you can make API calls or update the DOM based on changes
    // if (prevState.count !== this.state.count) {
    //   console.log("Count has changed:", this.state.count);
    // }
    if (prevState.userName !== this.state.userName) {
      console.log("User name has changed:", this.state.userName);
    }
    // You can also check if the userName has changed and perform actions accordingly
    // For example, you can log the new userName to the console
    // if (prevState.userAge !== this.state.userAge) {
    //   console.log("User age has changed:", this.state.userAge);
    // }
    // You can also check if the userAge has changed and perform actions accordingly
  }

  // componentWillUnmount is a lifecycle method that is called before the component is unmounted
  componentWillUnmount() {
    console.log("User (CHILD) componentWillUnmount called");
    // This is a good place to clean up resources or cancel subscriptions
    // You can remove event listeners or cancel API calls here
    // For example, you can remove event listeners or cancel API calls
    // You can also clear any timers or intervals that were set in componentDidMount
    // clearInterval(this.timer);
    // clearTimeout(this.timeout);
    // You can also clear any timers or intervals that were set in componentDidMount
  }

  // render method returns the JSX to be rendered
  render() {
    console.log("User (CHILD) render method called");
    // const { userName, userAge } = this.state;
    // destructuring state to get userName and userAge

    // IF you want to access props in class-based components, you can use this.props
    // const { userName, userAge } = this.props;
    const { count, count2 } = this.state;
    const { userName, userAge, userLocation, avatar_url } = this.state;

    return (
      <div>
        <img src={avatar_url} alt="User Avatar" />
        <h1>User Page</h1>
        <p>This is the user page content for class-based component.</p>
        <h2>User Name: {userName}</h2>
        <p>User Age: {userAge}</p>
        {/* Displaying userName and userAge from state */}
        {/* JSX syntax is used to write HTML-like code in JavaScript */}
        {/* JSX allows you to write HTML-like code in JavaScript, which is then transformed into React elements */}

        <p>User Location: {userLocation}</p>
        {/* Displaying userLocation from state */}
        {/* You can access state using this.state */}

        {/* State can be updated using this.setState() method */}
        <h2>Count: {count}</h2>
        <button
          onClick={() => {
            this.setState({ count: count + 1 }); // Incrementing count by 1
            // this.setState is used to update the state
            // it takes an object with the new state values
            // it will re-render the component with the updated state
          }}
        >
          {" "}
          Increment Count
        </button>
        {/* Button to increment count */}
        {/* You can add an onClick event to the button to handle the click event */}
        {/* For example, you can call a method to increment the count when the button is clicked */}

        <h2>Count2: {count2}</h2>
        <button> Increment Count2</button>
        {/* Button to increment count2 */}
        {/* You can add an onClick event to the button to handle the click event */}
        {/* For example, you can call a method to increment the count2 when the button is clicked */}
      </div>
    );
  }
}

export default User;
