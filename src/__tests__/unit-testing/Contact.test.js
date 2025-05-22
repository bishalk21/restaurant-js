import { render, screen } from "@testing-library/react";
import ContactPage from "../../pages/contact/ContactPage";
import "@testing-library/jest-dom";

// suppose there are 20 test cases in the file
// 5 test cases tests the component
// we can use describe to group the test cases
// we can use "it" instead of "test" to write the test cases
describe("Test cases of Contact Us Page Component", () => {
  test("Should load Contact us Component", () => {
    // render should be used to render the component
    // JSX is not enabled in the beginning as @babel/preset-react is not installed
    render(<ContactPage />);
    // getByText should be used to find the text in the component
    // getByRole should be used to find the role (like button, heading, etc.) in the component
    // getByText should be used to find the text in the component
    const contactUsText = screen.getByText(/Contact Us/i);

    // expect should be used to check if the text is in the component
    expect(contactUsText).toBeInTheDocument();
  });

  it("Should load Button inside Contact us Component", () => {
    render(<ContactPage />);
    // const button = screen.getByRole("button");
    const button = screen.getByText("Send Message");
    expect(button).toBeInTheDocument();
  });

  test("Should load input inside Contact us Component", () => {
    render(<ContactPage />);
    // const input = screen.getByPlaceholderText("Your Name");
    const input = screen.getByLabelText("Your Name");
    expect(input).toBeInTheDocument();
  });

  it("Should load all input inside Contact us Component", () => {
    render(<ContactPage />);
    const input = screen.getAllByRole("textbox");
    expect(input.length).toBe(4);
  });
});

test("Should load all the headings inside Contact us Component", () => {
  render(<ContactPage />);

  const heading = screen.getAllByRole("heading");
  expect(heading[0]).toHaveTextContent("Contact Us");
});
