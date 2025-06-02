import User from "./UserClassBased";
import UserPage from "./UserPage";

const AboutPage = () => {
  return (
    <div className="flex">
      <div>
        <h1>About Us</h1>
        <p>
          Welcome to Hamro Bhojan! We are dedicated to bringing you the best of
          Nepali cuisine.
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
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
