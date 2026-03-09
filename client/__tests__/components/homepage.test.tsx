import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Homepage from "@components/homepage";

describe("Homepage", () => {
  it("renders a title", () => {
    const { getByText } = render(<Homepage />);
    const title = "Welcome to the Homepage";
    expect(getByText(title)).toBeInTheDocument();
  });
});
