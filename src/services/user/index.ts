import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useResponse } from "..";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUser,
  resetPassword,
  updateUser,
  verifyUserEmail,
} from "./operations";

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
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

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
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

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
  const { handleError, handleSuccess } = useResponse();
  const queryClient = useQueryClient();

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
    enabled: !!id,
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
