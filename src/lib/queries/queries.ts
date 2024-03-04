import { useMutation, useQuery } from "react-query";
import {
  loginAccount,
  validateAccount,
  resendCode,
  getEventManagers,
  createEventManager,
  getUpcomingEvents,
  getArchivedEvents,
} from "./api";
import { EventManager, LoginUser, ValidateUser } from "@/types/types";
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
  return useQuery({ queryFn: getEventManagers, queryKey: "eventmanagers" });
};

// add event manager

export const useCreateEventManager = () => {
  return useMutation({
    mutationFn: (eventmanager: EventManager) =>
      createEventManager(eventmanager),
  });
};

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
