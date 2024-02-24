import { LoginUser, ValidateUser } from "@/types/types";

/** Login Request */
export async function loginAccount(user: LoginUser) {
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
    return error;
  }
}

/** Code Validation Request */
export async function validateAccount(user: ValidateUser) {
    try {
      const response = await fetch(process.env.PUBLIC_URL + "/auth/validate", {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          validateAccount: user.validationCode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  /** Resend Code Request */
export async function resendCode(user: ValidateUser) {
    try {
      const response = await fetch(process.env.PUBLIC_URL + "/auth/resend", {
        method: "POST",
        body: JSON.stringify({
          email: user.email
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
      return error;
    }
  }