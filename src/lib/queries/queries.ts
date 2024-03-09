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
  deleteEventManager
} from "./api";
import { EventManager, LoginUser, ValidateUser, EventForm, EventUpdateForm, EventManagerUpdateForm } from "@/types/types";
import useAuth from "@/_auth/hook/useAuth";

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
  const {getAccessToken} = useAuth()

  return useQuery('eventmanagers', async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error('No access token available');
    }
    return getEventManagers(accessToken);
  });
};

// add event manager
export const useCreateEventManager = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (eventmanager: EventManager) => createEventManager(eventmanager),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('eventmanagers');
      },
    }
  );

  return mutation;
};

export const useUpdateEventManager = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (eventManager: EventManagerUpdateForm) => updateEventManager(eventManager, getAccessToken()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["eventmanagers"]});
      },
    }
  );

  return mutation;
};

export const useDeleteEventManager = () => {
  const { getAccessToken } = useAuth()
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (id:string) => deleteEventManager(id, getAccessToken()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["eventmanagers"]})
      }
    }
  )
  return mutation
}

// ============================================================
// Events QUERIES
// ============================================================

export const useGetUpcomingEvents = () => {
    const {getAccessToken} = useAuth()

    return useQuery('upcomingEvents', async () => {
        const accessToken = getAccessToken();
        if (!accessToken) {
          throw new Error('No access token available');
        }
        return getUpcomingEvents(accessToken);
      });
};

export const useGetArchivedEvents = () => {
    const {getAccessToken} = useAuth()

    return useQuery('archivedEvents', async () => {
        const accessToken = getAccessToken();
        if (!accessToken) {
          throw new Error('No access token available');
        }
        return getArchivedEvents(accessToken);
      });
};

export const useCreateEvent = () => {
  const { getAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (event: EventForm) => createEvent(event, getAccessToken()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('upcomingEvents');
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
        queryClient.invalidateQueries({ queryKey: ["upcomingEvents"]});
      },
    }
  );

  return mutation;
};

export const useToggleArchiveEvent = () => {
  const { getAccessToken} = useAuth()
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (id: string) => toogleArchiveEvent(id, getAccessToken()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("upcomingEvents")
      }
    }
  );
  
  return mutation;
}

export const useDeleteEvent = () => {
  const { getAccessToken } = useAuth()
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (id:string) => deleteEvent(id, getAccessToken()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["upcomingEvents"]})
      }
    }
  )
  return mutation
}

export const useGetEventById = () => {
  const {getAccessToken} = useAuth()

  const mutation = useMutation(
    (id:string) => getEventById(id, getAccessToken())
  )
  return mutation
};
