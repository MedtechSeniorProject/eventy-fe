import {
  LoginUser,
  ValidateUser,
  EventManager,
  EventForm,
  EventUpdateForm,
  EventManagerUpdateForm,
  AttendeeForm,
  DeskAgentForm,
  DeskAgentsDisplay,
  Question,
  response,
} from "@/types/types";
import axios, { AxiosResponse } from "axios";
import { axiosPrivate } from "../axios/axiosInstance";

/** Login Request */
export async function loginAccount(user: LoginUser): Promise<AxiosResponse> {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, user);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/** Code Validation Request */
export async function validateAccount(
  user: ValidateUser
): Promise<AxiosResponse> {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/validate`,
      user
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/** Resend Code Request */
export async function resendCode(user: ValidateUser): Promise<AxiosResponse> {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/resend`,
      user
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// ============================================================
// SUPERADMIN ENDPOINTS
// ============================================================

/** Get Event Managers Request */
export async function getEventManagers(
  accessToken: string | null
): Promise<[]> {
  try {
    const response = await axiosPrivate.get("/eventmanagers", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/** Create Event Managers Request */
export async function createEventManager(
  eventmanager: EventManager,
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.post(
      "/eventmanagers",
      {
        name: eventmanager.name,
        password: eventmanager.password,
        email: eventmanager.email,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**Update Event Manager */
export async function updateEventManager(
  eventManager: EventManagerUpdateForm,
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.patch(
      `/eventmanagers/${eventManager.id}`,
      {
        name: eventManager.name,
        email: eventManager.email,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteEventManager(
  id: string,
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.delete(`/eventmanagers/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// ============================================================
// Events ENDPOINTS
// ============================================================

/** Get Upcoming Events*/
export async function getUpcomingEvents(
  accessToken: string | null
): Promise<[]> {
  try {
    const response = await axiosPrivate.get("/events/upcoming", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/** Get Archived Events*/
export async function getArchivedEvents(
  accessToken: string | null
): Promise<[]> {
  try {
    const response = await axiosPrivate.get("/events/archived", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**Create Event */
export async function createEvent(
  event: EventForm,
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.post("/events", event, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**Update Event */
export async function updateEvent(
  event: EventUpdateForm,
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.patch(`/events/${event.id}`, event, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**Toggle Event */
export async function toogleArchiveEvent(
  id: string,
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.patch(
      `/events/toggleArchive/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**Delete Event */
export async function deleteEvent(
  id: string,
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.delete(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**Get Event By ID */
export async function getEventById(
  id: string,
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.get(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function addAttendees(
  eventId: string,
  attendees: AttendeeForm[],
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.post(
      `/events/attendees/${eventId}`,
      attendees,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function removeAttendees(
  eventId: string,
  attendeeIds: string[],
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.post(
      `/events/delete/${eventId}`,
      attendeeIds,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// ============================================================
// Desk Agents ENDPOINTS
// ============================================================

/**Add a desk agent to an event */
export async function addDeskAgent(
  deskAgent: DeskAgentForm,
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.post(`/deskagents`, deskAgent, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**Edit desk agent */
export async function editDeskAgent(
  deskAgent: DeskAgentsDisplay,
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.patch(
      `/deskagents/${deskAgent.id}`,
      {
        username: deskAgent.username,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**Delete desk agent */
export async function deleteDeskAgent(
  deskAgentId: string,
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.delete(`/deskagents/${deskAgentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**Delete multiple desk agents */

export async function deleteAllDeskAgents(
  deskAgentsIds: string[],
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.post(
      `/events/delete/`,
      deskAgentsIds,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


/** Send Invitees */
export async function sendInvitees(
  id: string,
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.patch(
      `/events/sendInvites/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/** Add Evaluation Form Questions */
export async function addEvaluationFormQuestions(
  eventId: string,
  questions: Question[],
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.post(
      `/events/questions/${eventId}`,
      questions,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getEvaluationFormQuestions(
  eventId: string,
  attendeeId: string
): Promise<Question[]> {
  try {
    const response = await axiosPrivate.get(
      `/events/questions/${eventId}/${attendeeId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateResponses(
  eventId: string,
  attendeeId: string,
  responses: response[]
): Promise<Question[]> {
  try {
    const response = await axiosPrivate.post(
      `/events/responses/${eventId}/${attendeeId}`,
      responses
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function sendForm(
  id: string,
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.patch(
      `/events/sendEvaluation/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// ============================================================
// STATISTICS ENDPOINTS
// ============================================================

export async function getEventStatistics(
  eventId: string,
  accessToken: string | null
): Promise<AxiosResponse> {
  try {
    const response = await axiosPrivate.get(`/statistics/event/${eventId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}