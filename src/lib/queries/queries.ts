import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  loginAccount,
  validateAccount,
  resendCode,
  getEventManagers,
  createEventManager,
  getUpcomingEvents,
  getArchivedEvents,
  createEvent,
  updateEvent,
  toogleArchiveEvent,
  deleteEvent,
  getEventById,
  updateEventManager,
  deleteEventManager,
  addAttendees,
  removeAttendees,
  addDeskAgent,
  deleteDeskAgent,
  editDeskAgent,
  sendInvitees,
  addEvaluationFormQuestions,
  getEvaluationFormQuestions,
  updateResponses,
  getEventStatistics,
  deleteAllDeskAgents,
  sendForm,
  getAttendeesByEvent,
  getEventManagerStatistics,
  getSuperAdminStatistics,
  getResponsesClassification,
  getEvaluationStatistics,
} from "./api";
import {
  EventManager,
  LoginUser,
  ValidateUser,
  EventForm,
  EventUpdateForm,
  EventManagerUpdateForm,
  AddAttendees,
  RemoveAttendees,
  DeskAgentForm,
  DeskAgentsDisplay,
  QuestionForm,
  responseForm,
  RemoveDeskAgents,
} from "@/types/types";
import useAuth from "@/_auth/hook/useAuth";
import { AxiosError } from "axios";

// ============================================================
// AUTH QUERIES
// ============================================================

export const useLoginAccount = () => {
  return useMutation({
    mutationFn: (user: LoginUser) => loginAccount(user),
  });
};

export const useValidateAccount = () => {
  return useMutation({
    mutationFn: (user: ValidateUser) => validateAccount(user),
  });
};

export const useResendCode = () => {
  return useMutation({
    mutationFn: (user: ValidateUser) => resendCode(user),
  });
};

// ============================================================
// SUPERADMIN QUERIES
// ============================================================

export const useGetEventManagers = () => {
  const { getAccessToken } = useAuth();

  return useQuery("eventmanagers", async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token available");
    }
    return getEventManagers(accessToken);
  });
};

// add event manager
export const useCreateEventManager = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (eventmanager: EventManager) =>
      createEventManager(eventmanager, getAccessToken()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("eventmanagers");
      },
    }
  );
  return mutation;
};

export const useUpdateEventManager = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (eventManager: EventManagerUpdateForm) =>
      updateEventManager(eventManager, getAccessToken()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["eventmanagers"] });
      },
    }
  );

  return mutation;
};

export const useDeleteEventManager = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (id: string) => deleteEventManager(id, getAccessToken()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["eventmanagers"] });
      },
    }
  );
  return mutation;
};

// ============================================================
// Events QUERIES
// ============================================================

export const useGetUpcomingEvents = () => {
  const { getAccessToken } = useAuth();

  return useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: async () => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        throw new Error("No access token available");
      }
      return getUpcomingEvents(accessToken);
    },
    retry: false,
  });
};

export const useGetArchivedEvents = () => {
  const { getAccessToken } = useAuth();

  return useQuery({
    queryKey: ["archivedEvents"],
    queryFn: async () => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        throw new Error("No access token available");
      }
      return getArchivedEvents(accessToken);
    },
    retry: false,
  });
};

export const useCreateEvent = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (event: EventForm) => createEvent(event, getAccessToken()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("upcomingEvents");
      },
    }
  );

  return mutation;
};

export const useUpdateEvent = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (event: EventUpdateForm) => updateEvent(event, getAccessToken()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["upcomingEvents"] });
        queryClient.invalidateQueries({ queryKey: ["event"] });
      },
    }
  );

  return mutation;
};

export const useToggleArchiveEvent = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (id: string) => toogleArchiveEvent(id, getAccessToken()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("upcomingEvents");
        queryClient.invalidateQueries("archivedEvents");
      },
    }
  );

  return mutation;
};

export const useDeleteEvent = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (id: string) => deleteEvent(id, getAccessToken()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["upcomingEvents"] });
      },
    }
  );
  return mutation;
};

export const useGetEventById = (eventId: string) => {
  const { getAccessToken } = useAuth();
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const response = await getEventById(eventId, getAccessToken());
      const responseData = response.data;
      return responseData;
    },
    enabled: !!eventId,
  });
};

export const useAddAttendees = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: AddAttendees) =>
      addAttendees(event.eventId, event.attendees, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["event"] }),
  });
};

export const useDeleteAttendees = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: RemoveAttendees) =>
      removeAttendees(event.eventId, event.attendeeIds, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["event"] }),
  });
};

export const useAttendeesByEvent = (eventId: string) => {
  const { getAccessToken } = useAuth();
  return useQuery({
    queryKey: ["attendees", eventId],
    queryFn: async () => {
      const response = await getAttendeesByEvent(eventId, getAccessToken());
      const responseData = response.data;
      return responseData;
    },
    enabled: !!eventId,
  });
};

// ============================================================
// Desk Agents QUERIES
// ============================================================

export const useAddDeskAgent = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deskAgent: DeskAgentForm) =>
      addDeskAgent(deskAgent, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["event"] }),
  });
};

export const useEditDeskAgent = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (deskAgent: DeskAgentsDisplay) =>
      editDeskAgent(deskAgent, getAccessToken()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["event"] });
      },
    }
  );
  return mutation;
};

export const useDeleteDeskAgent = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (id: string) => deleteDeskAgent(id, getAccessToken()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["event"] });
      },
    }
  );
  return mutation;
};

export const useDeleteAllDeskAgents = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: RemoveDeskAgents) =>
      deleteAllDeskAgents(ids.agentsIds, getAccessToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["event"] }),
  });
};

export const useSendInvitees = () => {
  const { getAccessToken } = useAuth();

  const mutation = useMutation((id: string) =>
    sendInvitees(id, getAccessToken())
  );
  return mutation;
};

/**Add evaluation form query */
export const useAddEvaluationForm = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: QuestionForm) =>
      addEvaluationFormQuestions(
        form.eventId,
        form.questions,
        getAccessToken()
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["event"] }),
  });
};

export const useGetEvaluationFormQuestions = (
  eventId: string,
  attendeeId: string
) => {
  return useQuery({
    queryKey: ["evaluationform", eventId, attendeeId],
    queryFn: async () => getEvaluationFormQuestions(eventId, attendeeId),
    onError: (error: AxiosError) => {
      console.log((error.response?.data as any)?.message);
    },
  });
};

export const useGetEvaluationFormResponses = () => {
  return useMutation({
    mutationFn: (responseForm: responseForm) =>
      updateResponses(
        responseForm.eventId,
        responseForm.attendeeId,
        responseForm.responses
      ),
  });
};

export const useGetEvaluationResponses = (id: string) => {
  const { getAccessToken } = useAuth();
  return useQuery({
    queryKey: ["evaluationresponses", id],
    queryFn: async () => getEvaluationStatistics(getAccessToken(), id),
    onError: (error: AxiosError) => {
      console.log((error.response?.data as any)?.message);
    },
  });
};

export const useSendForm = () => {
  const { getAccessToken } = useAuth();

  const mutation = useMutation((id: string) => sendForm(id, getAccessToken()));
  return mutation;
};

// ============================================================
// Statistics QUERIES
// ============================================================

export const useGetEventStatistics = (eventId: string) => {
  const { getAccessToken } = useAuth();
  return useQuery({
    queryKey: ["statistics", eventId],
    queryFn: async () => {
      const response = await getEventStatistics(eventId, getAccessToken());
      const responseData = response.data;
      return responseData;
    },
  });
};

export const useGetEventManagerStatistics = (
  eventManagerId: string,
  startTime: string,
  endTime: string
) => {
  const { getAccessToken } = useAuth();
  return useQuery({
    queryKey: ["statistics", eventManagerId],
    queryFn: async () => {
      const response = await getEventManagerStatistics(
        eventManagerId,
        getAccessToken(),
        startTime,
        endTime
      );
      const responseData = response.data;
      return responseData;
    },
  });
};

export const useGetSuperAdminStatistics = (
  startTime: string,
  endTime: string
) => {
  const { getAccessToken, user } = useAuth();
  return useQuery({
    queryKey: ["statistics", user.id],
    queryFn: async () => {
      const response = await getSuperAdminStatistics(
        getAccessToken(),
        startTime,
        endTime
      );
      const responseData = response.data;
      return responseData;
    },
  });
};

export const useGetResponsesClassification = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (texts: string[]) => getResponsesClassification(texts),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["responseclassifications"],
        });
      },
    }
  );
  return mutation;
};
