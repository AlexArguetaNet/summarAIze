import { render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import userEvent from "@testing-library/user-event";
import Summarizer from "@/components/Summarizer";
import { fetchSummary } from "@/api/summary";

// Create mock fetchSummary function to prevent test functions from calling the real FastAPI server
vi.mock("../src/api/summary", () => ({
    fetchSummary: vi.fn(),
}));

describe("Render Summarizer component", () => {

    test("Check if Summarizer component was rendered", () => {
        render(<Summarizer />);
        expect(screen.getByText(/Paragraph/i)).toBeInTheDocument();
        expect(screen.getByText(/Url/i)).toBeInTheDocument();
    });

});

describe("Character counter", () => {

    test("Check if character counter was rendered", () => {
        render(<Summarizer />);
        expect(screen.getByText("Characters | 0")).toBeInTheDocument();
    });

    test("Check if counter increments when text is entered", async () => {
        const user = userEvent.setup();
        render(<Summarizer />);

        const textArea = screen.getByRole("textbox");
        expect(screen.getByText("Characters | 0")).toBeInTheDocument();

        await user.type(textArea, "Hola");
        expect(screen.getByText("Characters | 4")).toBeInTheDocument()

    });

});

describe("Submit button", () => {

    test("Check if submit button renders", () => {
        render(<Summarizer />);
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    });

    test("Check if a button click triggers an event", async () => {
        const user = userEvent.setup();
        render(<Summarizer />);

        fetchSummary.mockImplementation(
            () => new Promise(() => {})
        );

        const textArea = screen.getByRole("textbox");
        const button = screen.getByRole("button", { name: /submit/i });

        await user.type(textArea, "This is some text to summarize");
        await user.click(button);

        expect(screen.getByLabelText("Loading")).toBeInTheDocument();

    });

});

describe("Clear Button", () => {

    test("Clear button renders after successful API response", async () => {
        const user = userEvent.setup();
        render(<Summarizer />);

        fetchSummary.mockResolvedValue({
            summaryArray: ["This is a fake summary."],
            summaryString: "This is a fake summary."
        });

        const textArea = screen.getByRole("textbox");
        const submitButton = screen.getByRole("button", { name: /submit/i });

        await user.type(textArea, "More text to summarize");
        await user.click(submitButton);

        const clearButton = await screen.findByRole("button", { name: /clear/i });

        expect(clearButton).toBeInTheDocument();

    });

    test("Clears the text area", async () => {
        const user = userEvent.setup();
        render(<Summarizer />);

        fetchSummary.mockResolvedValue({
            summaryArray: ["This is a fake summary."],
            summaryString: "This is a fake summary."
        });

        const textArea = screen.getByRole("textbox");
        const submitButton = screen.getByRole("button", { name: /submit/i });

        await user.type(textArea, "More text to summarize");
        await user.click(submitButton);

        const clearButton = await screen.findByRole("button", { name: /clear/i });

        await user.click(clearButton);

        expect(textArea).toHaveValue("");

    })

});
