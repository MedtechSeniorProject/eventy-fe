import { LoginUser, ValidateUser } from "@/types/types";

/** Login Request */
export async function loginAccount(user: LoginUser): Promise<Response> {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/** Code Validation Request */
export async function validateAccount(user: ValidateUser) : Promise<Response> {
    try {
      const response = await fetch("http://localhost:3000/auth/validate", {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          validationCode: user.validationCode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /** Resend Code Request */
export async function resendCode(user: ValidateUser): Promise<Response> {
    try {
      const response = await fetch("http://localhost:3000/auth/resend", {
        method: "POST",
        body: JSON.stringify({
          email: user.email
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response
    } catch (error) {
      console.log(error);
      throw error;
    }
  }