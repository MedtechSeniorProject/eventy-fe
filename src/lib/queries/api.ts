import { LoginUser, ValidateUser,EventManager, EventForm, EventUpdateForm, EventManagerUpdateForm } from "@/types/types";

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

/**Update Event Manager */
export async function updateEventManager(eventManager: EventManagerUpdateForm, accessToken: string | null): Promise<Response> {
  try {
     const response = await fetch(`http://localhost:3000/eventmanagers/${eventManager.id}`, {
       method: "PATCH",
       body: JSON.stringify({
         name: eventManager.name,
         email: eventManager.email
       }),
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`,
       },
     });
     return response
   } catch (error) {
     console.log(error);
     throw error;
   }
}

/**Delete Event Manager */
export async function deleteEventManager(id: string, accessToken: string | null): Promise<Response> {
  try {
     const response = await fetch(`http://localhost:3000/eventmanagers/${id}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`,
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
export async function createEvent(event: EventForm, accessToken: string | null): Promise<Response> {

  try {
     const response = await fetch("http://localhost:3000/events", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
       },
       body: JSON.stringify({
        name: event.name,
        time: event.time
      }),
     });
     return response
   } catch (error) {
     console.log(error);
     throw error;
   }
}

/**Update Event */
export async function updateEvent(event: EventUpdateForm, accessToken: string | null): Promise<Response> {
  try {
     const response = await fetch(`http://localhost:3000/events/${event.id}`, {
       method: "PATCH",
       body: JSON.stringify({
         name: event.name,
         time: event.time
       }),
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`,
       },
     });
     return response
   } catch (error) {
     console.log(error);
     throw error;
   }
}

/**Toggle Event */
export async function toogleArchiveEvent(id: string, accessToken: string | null): Promise<Response> {
  try {
     const response = await fetch(`http://localhost:3000/events/toggleArchive/${id}`, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`,
       },
     });
     return response
   } catch (error) {
     console.log(error);
     throw error;
   }
}

/**Delete Event */
export async function deleteEvent(id: string, accessToken: string | null): Promise<Response> {
  try {
    console.log(accessToken)
    console.log(id)
     const response = await fetch(`http://localhost:3000/events/${id}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`,
       },
     });
     return response
   } catch (error) {
     console.log(error);
     throw error;
   }
}

/**Get Event By ID */
export async function getEventById(id:string, accessToken: string | null): Promise<Response> {
  try {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    return response
  } catch (error) {
    console.log(error);
    throw error;
  }
}