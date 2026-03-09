import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import Homepage from "@components/homepage";

describe("Homepage", () => {
  it("renders a title", () => {
    const { getByText } = render(<Homepage />);
    const title = "Welcome to the Homepage";
    expect(getByText(title)).toBeInTheDocument();
  });

  it("renders items after the items GET request resolves", async () => {
    const mockedItems = [
      { id: 1, name: "First Item" },
      { id: 2, name: "Second Item" },
    ];

    const originalFetch = globalThis.fetch;
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockedItems,
    } as Response);
    globalThis.fetch = fetchMock as typeof fetch;

    const { getByText } = render(<Homepage />);

    await waitFor(() => {
      expect(getByText("First Item")).toBeInTheDocument();
      expect(getByText("Second Item")).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:8000/api/items");
    globalThis.fetch = originalFetch;
  });
});
