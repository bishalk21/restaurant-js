import { Component } from "react";
import UserPage from "./UserPage";
import User from "./UserClassBased";

class AboutPage extends Component {
  constructor(props) {
    console.log("AboutPage (PARENT) constructor called");
    super(props);
    // You can initialize state here if needed
    this.state = {
      // Example state variable
      teamName: "Hamro Bhojan Team",
    };
  }

  // componentDidMount is a lifecycle method that is called after the component is mounted
  componentDidMount() {
    console.log("AboutPage (PARENT) componentDidMount called");
    // This is a good place to fetch data or perform side effects
    // You can make API calls or set up subscriptions here

    this.timer = setTimeout(() => {
      console.log("Timer executed after 3 seconds");
    }, 3000);
  }

  componentWillUnmount() {
    console.log("AboutPage (PARENT) componentWillUnmount called");
    // This is a good place to clean up resources, like cancelling API calls or removing event listeners
    clearTimeout(this.timer);
  }

  render() {
    console.log("AboutPage (PARENT) render method called");
    return (
      <div className="flex">
        <div>
          <h1>About Us</h1>
          <p>
            Welcome to Hamro Bhojan! We are dedicated to bringing you the best
            of Nepali cuisine.
          </p>
          <h2>Our Team</h2>
        </div>

        {/* passing props */}
        <div className="flex">
          <div className="flex">
            <UserPage
              name="Hamro Bhojan Team"
              description="Dedicated to serving you the best Nepali food."
            />
          </div>
          {/* passing props in class based component */}
          <div className="flex">
            <User userName="John Doe" userAge={30} />
            <User userName="John Doe" userAge={30} />

            {/***
            if there are multiple class based components, then the flow of rendering is as follows:
            1. AboutPage (PARENT) constructor called
            2. AboutPage (PARENT) render method called

            3. User1 (CHILD) constructor called 
            4. User1 (CHILD) render method called

            5. User2 (CHILD) constructor called
            6. User2 (CHILD) render method called

            <DOM UPDATE - in a single render pass or batch update>
            7. User1 (CHILD) componentDidMount called
            8. User2 (CHILD) componentDidMount called

            9. AboutPage (PARENT) componentDidMount called
            
             */}
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPage;
