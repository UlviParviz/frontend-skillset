import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../../pages/home";
import { useAppSelector, useAppDispatch } from "../../shared/redux/hooks";
import { fetchPostById } from "../../shared/redux/posts/postThunks";

jest.mock("../../shared/redux/hooks");
jest.mock("../../shared/redux/posts/postThunks", () => ({
  fetchPosts: jest.fn(() => ({ type: "FETCH_POSTS" })),
  fetchPostById: jest.fn((id) => ({ type: "FETCH_POST_BY_ID", payload: id })),
}));

const mockPosts = [
  { userId: 1, id: 1, title: "Type A", body: "Body A" },
  { userId: 1, id: 2, title: "Type B", body: "Body B" },
  { userId: 1, id: 3, title: "Type C", body: "Body C" },
];

describe("Home component without passing posts prop", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        posts: {
          posts: mockPosts,
          selectedPost: null,
          loading: false,
          error: null,
        },
      })
    );

    mockDispatch.mockClear();
  });

  it("renders posts and filters by search input", async () => {
    render(<Home />);

    expect(screen.getByText("Type A")).toBeInTheDocument();
    expect(screen.getByText("Type B")).toBeInTheDocument();
    expect(screen.getByText("Type C")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/search post by type/i);
    fireEvent.change(searchInput, { target: { value: "Type B" } });

    await waitFor(() => {
      expect(screen.queryByText("Type A")).not.toBeInTheDocument();
      expect(screen.getByText("Type B")).toBeInTheDocument();
      expect(screen.queryByText("Type C")).not.toBeInTheDocument();
    });
  });

  it("opens and closes modal on info button click", async () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        posts: {
          posts: mockPosts,
          selectedPost: mockPosts[0],
          loading: false,
          error: null,
        },
      })
    );

    render(<Home />);

    const infoButtons = screen.getAllByRole("button", { name: /info/i });
    fireEvent.click(infoButtons[0]);

    expect(mockDispatch).toHaveBeenCalledWith(fetchPostById(1));

    expect(screen.getByText("Type A")).toBeInTheDocument();
    expect(screen.getByText("Body A")).toBeInTheDocument();

  });

 it("handles pagination buttons", async () => {
    const manyPosts = Array.from({ length: 12 }, (_, i) => ({
      userId: 1,
      id: i + 1,
      title: `Title ${i + 1}`,
      body: `Body ${i + 1}`,
    }));

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        posts: {
          posts: manyPosts,
          selectedPost: null,
          loading: false,
          error: null,
        },
      })
    );

    render(<Home />);

    const nextButton = screen.getByRole("button", { name: /next page/i });

    expect(screen.getAllByText(/Title 1/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Title 10/i)[0]).toBeInTheDocument();
    expect(screen.queryByText(/Title 11/i)).not.toBeInTheDocument();

    fireEvent.click(nextButton);

    const title11 = await screen.findByText((content) => content.includes("Title 11"));
    const title12 = await screen.findByText((content) => content.includes("Title 12"));

    expect(title11).toBeInTheDocument();
    expect(title12).toBeInTheDocument();

  });
});
