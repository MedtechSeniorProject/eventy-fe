import { LoginUser, ValidateUser,EventManager, EventForm } from "@/types/types";

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

// ============================================================
// SUPERADMIN ENDPOINTS
// ============================================================

/** Get Event Managers Request */
  export async function getEventManagers(): Promise<[]> {
    try {
      const response = await fetch("http://localhost:3000/eventmanagers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json()
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


/** Create Event Managers Request */
export async function createEventManager(eventmanager: EventManager): Promise<Response> {

   try {
      const response = await fetch("http://localhost:3000/eventmanagers", {
        method: "POST",
        body: JSON.stringify({
          name: eventmanager.name,
          password: eventmanager.password, 
          email: eventmanager.email,
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

// ============================================================
// Events ENDPOINTS
// ============================================================

/** Get Upcoming Events*/
export async function getUpcomingEvents(accessToken: string | null): Promise<[]> {
  try {
    const response = await fetch("http://localhost:3000/events/upcoming", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    return response.json()
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/** Get Archived Events*/
export async function getArchivedEvents(accessToken: string | null): Promise<[]> {
  try {
    const response = await fetch("http://localhost:3000/events/archived", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    return response.json()
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**Create Event */
export async function createEvent(eventmanager: EventForm, accessToken: string | null): Promise<Response> {

  try {
     const response = await fetch("http://localhost:3000/events", {
       method: "POST",
       body: JSON.stringify({
         name: eventmanager.name,
         time: eventmanager.time
       }),
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
       },
     });
     return response
   } catch (error) {
     console.log(error);
     throw error;
   }
}