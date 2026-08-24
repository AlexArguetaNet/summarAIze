import { render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import App from "../src/App"
import { fetchSummary } from "@/api/summary"

// Create mock fetchSummary function to prevent test functions from calling the real FastAPI server
vi.mock("../src/api/summary", () => ({
    fetchSummary: vi.fn(),
}));

describe("App", () => {

    // Create individual test
    test("renders the app", () => {
        render(<App />); // Render App component in simulated DOM

        // Look for th string "summarai" in the simulated DOM and check result
        expect(screen.getByText(/summarai/i)).toBeInTheDocument();
    });

    test("increments the character counter when text is entered", async () => {

        // Create mock user and render App component
        const user = userEvent.setup();
        render(<App />);
        
        // Target textarea component and check if character counter is set to default value
        const textarea = screen.getByRole("textbox");
        expect(screen.getByText("Character count | 0")).toBeInTheDocument();

        // Type text in the text area and check if the character counter is accurate
        await user.type(textarea, "Hola");
        expect(screen.getByText("Character count | 4")).toBeInTheDocument()

    });

})

describe("Character counter", () => {

    test("increments the character counter when text is entered", async () => {

        // Create mock user and render App component
        const user = userEvent.setup();
        render(<App />);
        
        // Target textarea component and check if character counter is set to default value
        const textarea = screen.getByRole("textbox");
        expect(screen.getByText("Character count | 0")).toBeInTheDocument();

        // Type text in the text area and check if the character counter is accurate
        await user.type(textarea, "Hola");
        expect(screen.getByText("Character count | 4")).toBeInTheDocument()

    });

})

describe("Summarize button", () => {

    test("renders the summarize button", () => {
        render(<App />);
        expect(screen.getByRole("button", { name: /summarize/i })).toBeInTheDocument();
    });

    test("allows user to click the summarize button", async () => {
        
        const user = userEvent.setup();

        // Mock pending API response
        fetchSummary.mockImplementation(
            () => new Promise(() => {})
        );

        render(<App />);

        const textarea = screen.getByRole("textbox");
        const button = screen.getByRole("button", { name: /summarize/i });

        await user.type(textarea, "This is some text to summarize");
        await user.click(button);

        expect(screen.getByLabelText("Loading")).toBeInTheDocument();

    });

})

describe("New button", () => {
    test("new button renders after a successful API response", async () => {
        const user = userEvent.setup();

        // Mock API response
        fetchSummary.mockResolvedValue({
            summaryArray: ["This is a fake summary."],
            summaryString: "This is a fake summary."
        });

        render(<App />);

        const textarea = screen.getByRole("textbox");
        const summarizeButton = screen.getByRole("button", {
            name: /summarize/i
        });

        await user.type(textarea, "More text to be summarized");
        await user.click(summarizeButton);

        const newButton = await screen.findByRole("button", {
            name: /new/i
        });

        expect(newButton).toBeInTheDocument();
    });

    test("clears the text area", async () => {

        const user = userEvent.setup();
        fetchSummary.mockResolvedValue({
            summaryArray: ["This is a fake summary."],
            summaryString: "This is a fake summary."
        });

        render(<App />);

        const textarea = screen.getByRole("textbox");
        const summarizeButton = screen.getByRole("button", {
            name: /summarize/i
        });

        await user.type(textarea, "More text to be summarized");
        await user.click(summarizeButton);

        const newButton = await screen.findByRole("button", {
            name: /new/i
        });

        await user.click(newButton);

        expect(textarea).toHaveValue("");

    })

});

