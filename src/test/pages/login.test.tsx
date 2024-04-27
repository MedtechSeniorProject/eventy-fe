import { fireEvent, render, screen } from "@testing-library/react";
import Login from "@/_auth/forms/login";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

// Mocking React Query & SEO component
vi.mock("@/components/SEO");

// Mocking React Query's useLoginAccount hook
const mockedMutate = vi.fn();
vi.mock("@/lib/queries/queries", () => ({
  useLoginAccount: () => ({
    mutateAsync: mockedMutate.mockResolvedValue({ data: { message: "Logged in successfully" } }),
  }),
}));

describe("Login Route", () => {
  it("Renders Headline", () => {
    render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
    );
    const headline = screen.getByText(/Login to your account/i);
    expect(headline).toBeInTheDocument();
  });

  it("Fill in the form with superadmin credentials", async () => {
    render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /log in/i });

    // Fill in the form
    fireEvent.change(emailInput, { target: { value: "superadmin@superadmin.com" }});
    fireEvent.change(passwordInput, { target: { value: "superadmin" }});
    fireEvent.click(submitButton);

    // Wait for the form to submit
    await screen.findByText(/loading/i);

    // Check if the loginAccount function was called
    expect(mockedMutate).toHaveBeenCalled();

    // Check if the user was redirected to the validate page
    expect(window.location.pathname).toEqual("/validate");
  });

  it("Fill in the form with eventManager credentials", async () => {
    render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /log in/i });

    // Fill in the form
    fireEvent.change(emailInput, { target: { value: "eventmanager@eventmanager.com" }});
    fireEvent.change(passwordInput, { target: { value: "eventmanager" }});
    fireEvent.click(submitButton);

    // Wait for the form to submit
    await screen.findByText(/loading/i);

    // Check if the loginAccount function was called
    expect(mockedMutate).toHaveBeenCalled();

    // Check if the user was redirected to the validate page
    expect(window.location.pathname).toEqual("/validate");
  });

  it("Fill in the form with invalid credentials", async () => {
    render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /log in/i });

    // Fill in the form
    fireEvent.change(emailInput, { target: { value: "eventmanager@eventmanager" }});
    fireEvent.change(passwordInput, { target: { value: "even" }});
    fireEvent.click(submitButton);

    // Wait for the form to submit
    await screen.findByText(/loading/i);

    // Check if the loginAccount function was called
    expect(mockedMutate).toHaveBeenCalled();

    // Check if the user was redirected to the validate page
    const emailError = screen.getByText(/Invalid email/i);
    const passwordError = screen.getByText(/Password should contain at least 7 characters/i);
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
});
