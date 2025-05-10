import "./about.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="page-title">About Hamro Bhojan</h1>

        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Hamro Bhojan, which means "Our Food" in Nepali, was founded in 2020
            with a simple mission: to bring the authentic flavors of Nepal to
            food enthusiasts around the world. What started as a small blog
            sharing family recipes has grown into a comprehensive platform for
            discovering Nepali cuisine.
          </p>
          <p>
            Our team of passionate food lovers and culinary experts work
            tirelessly to curate the best recipes and restaurant
            recommendations, ensuring that you experience the true essence of
            Nepali food culture.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>At Hamro Bhojan, we are committed to:</p>
          <ul>
            <li>Preserving and promoting traditional Nepali recipes</li>
            <li>
              Supporting local restaurants that serve authentic Nepali cuisine
            </li>
            <li>
              Creating a community of food enthusiasts who appreciate the rich
              culinary heritage of Nepal
            </li>
            <li>
              Making Nepali cooking accessible to everyone, regardless of their
              culinary background
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img
                src="https://images.unsplash.com/photo-1659354218430-ac7f0b31e977?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJlc3RhdXJhbnQlMjBGb3VuZGVyJTIwJTI2JTIwSGVhZCUyMENoZWZ8ZW58MHx8MHx8fDA%3D"
                alt="Aarav Sharma"
                className="team-photo"
              />
              <h3>Aarav Sharma</h3>
              <p className="team-role">Founder & Head Chef</p>
            </div>
            <div className="team-member">
              <img
                src="https://plus.unsplash.com/premium_photo-1661593239814-74dc549fe4ec?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fHJlc3RhdXJhbnQlMjBGb3VuZGVyJTIwJTI2JTIwSGVhZCUyMENoZWZ8ZW58MHx8MHx8fDA%3D"
                alt="Priya Patel"
                className="team-photo"
              />
              <h3>Priya Patel</h3>
              <p className="team-role">Food Photographer</p>
            </div>
            <div className="team-member">
              <img
                src="https://plus.unsplash.com/premium_photo-1661724171661-2b1fda3892b6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fFJlc3RhdXJhbnQlMjBDdXJhdG9yfGVufDB8fDB8fHww"
                alt="Raj Gurung"
                className="team-photo"
              />
              <h3>Raj Gurung</h3>
              <p className="team-role">Restaurant Curator</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
