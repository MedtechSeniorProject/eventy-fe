import { useMutation } from "react-query";

import { loginAccount, validateAccount, resendCode,getEventManagers } from "./api";
import { LoginUser, ValidateUser } from "@/types/types";

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
// DATA QUERIES
// ============================================================

export const useGetEventManagers = () => {
    return useMutation({
      mutationFn: async () => {
        const data = await getEventManagers();
        return data; 
      },
    });
  };