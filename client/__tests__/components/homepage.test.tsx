import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
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

  it("submits a new item and renders it", async () => {
    const originalFetch = globalThis.fetch;
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 3, name: "New Item" }),
      } as Response);
    globalThis.fetch = fetchMock as typeof fetch;

    const { getByRole, getByLabelText, getByText } = render(<Homepage />);

    fireEvent.change(getByLabelText("Item name"), {
      target: { value: "New Item" },
    });
    fireEvent.click(getByRole("button", { name: "Add item" }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenNthCalledWith(
        2,
        "http://localhost:8000/api/items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "New Item" }),
        },
      );
      expect(getByText("New Item")).toBeInTheDocument();
    });

    globalThis.fetch = originalFetch;
  });
});
