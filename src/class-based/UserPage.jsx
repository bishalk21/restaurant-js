import React, { useEffect } from "react";

// accessing props
const UserPage = (props) => {
  // states in functional components are created using useState hook
  const [userName, setUserName] = React.useState("John Doe");
  const { name, description } = props;
  const [count, setCount] = React.useState(0);
  // useState is a hook that allows you to add state to functional components
  // useState returns an array with two elements: the current state and a function to update it
  // useState takes an initial value as an argument
  // useState is used to create state variables in functional components

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Timer executed after 3 seconds");
      // You can perform side effects here, like fetching data or updating the state
      setUserName("Updated User Name");
    }, 3000);

    // Cleanup function to clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []); // This is a placeholder for side effects, like fetching data or subscribing to events

  const [count2, setCount2] = React.useState(0);
  return (
    <div>
      <h1>User Page</h1>
      <p>This is the user page content.</p>
      <h2>Name from props: {name}</h2>
      <p>{description}</p>

      <h2>User Name from state: {userName}</h2>

      {/* count */}
      <p>Count: {count}</p>
      <button>Increment Count</button>

      {/* count2 */}
      <p>Count2: {count2}</p>
      <button>Increment Count2</button>
    </div>
  );
};

export default UserPage;
