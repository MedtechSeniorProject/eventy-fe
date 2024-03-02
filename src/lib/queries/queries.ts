import { useMutation, useQuery } from "react-query";

import { loginAccount, validateAccount, resendCode,getEventManagers, createEventManager } from "./api";
import { EventManager, LoginUser, ValidateUser, } from "@/types/types";

// ============================================================
// AUTH QUERIES
// ============================================================

export const useLoginAccount = () => {
    return useMutation({
        mutationFn: (user: LoginUser) => loginAccount(user),
    })
}

export const useValidateAccount = () => {
    return useMutation({
        mutationFn: (user: ValidateUser) => validateAccount(user),
    })
}

export const useResendCode = () => {
    return useMutation({
        mutationFn: (user: ValidateUser) => resendCode(user),
    })
}

// ============================================================
// SUPERADMIN QUERIES
// ============================================================

export const useGetEventManagers = () => {
    return useQuery({queryFn: getEventManagers, queryKey: "eventmanagers"});
}

// add event manager

export const useCreateEventManager = () => {
    return useMutation({
        mutationFn: (eventmanager: EventManager) => createEventManager(eventmanager),
    })
}
