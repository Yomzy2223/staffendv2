import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "..";
import {
  approveUserDoc,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUser,
  getUserBusinessDoc,
  getUserDoc,
  getUserRequestDoc,
  resetPassword,
  updateUser,
  verifyUserEmail,
} from "./operations";

//
export const useForgotPasswordMutation = () => {
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationFn: forgotPassword,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
    },
  });
};

export const useResetPasswordMutation = () => {
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationFn: resetPassword,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
    },
  });
};

export const useVerifyUserEmailMutation = () => {
  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationFn: verifyUserEmail,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationFn: updateUser,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationFn: deleteUser,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess({ data });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useGetUserQuery = (id: string) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: ({ queryKey }) => getUser(queryKey[1]),
    enabled: id ? true : false,
  });

export const useGetAllUsersQuery = ({
  isStaff,
  isPartner,
}: {
  isPartner?: boolean;
  isStaff?: boolean;
}) =>
  useQuery({
    queryKey: ["user", isStaff, isPartner],
    queryFn: ({ queryKey }) =>
      getAllUsers({
        isStaff: !!queryKey[1],
        isPartner: !!queryKey[2],
      }),
  });

//

//  USER DOCUMENTS ENDPOINTS

export const useApproveUserDocMutation = () => {
  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useResponse();

  return useMutation({
    mutationKey: ["approve user documents"],
    mutationFn: approveUserDoc,
    onError(error, variables, context) {
      handleError({ title: "Failed", error });
    },
    onSuccess(data, variables, context) {
      handleSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["user documents"] });
    },
  });
};

export const useGetUserDocQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["user documents", id],
    queryFn: ({ queryKey }) => getUserDoc(queryKey[1]),
    enabled: !!id,
  });
};

export const useGetUserRequestDocQuery = ({ requestId }: { requestId: string }) => {
  return useQuery({
    queryKey: ["user documents", requestId],
    queryFn: ({ queryKey }) => getUserRequestDoc(queryKey[1]),
    enabled: !!requestId,
  });
};

export const useGetUserBusinessDocQuery = ({ businessId }: { businessId: string }) => {
  return useQuery({
    queryKey: ["user documents", businessId],
    queryFn: ({ queryKey }) => getUserBusinessDoc(queryKey[1]),
    enabled: !!businessId,
  });
};
