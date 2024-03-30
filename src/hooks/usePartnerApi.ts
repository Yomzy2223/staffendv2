import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPartnerForm,
  deletePartnerForm,
  getAllPartnerForm,
  getPartnerForm,
  updatePartnerForm,
} from "./api/partnerApi";
import { useCustomMutation } from "./globalFunctions";

const usePartnerApi = () => {
  const queryClient = useQueryClient();

  const createPartnerFormMutation = useCustomMutation({
    mutationFn: createPartnerForm,
    queryKey: ["partner"],
    queryClient,
  });

  const updatePartnerFormMutation = useCustomMutation({
    mutationFn: updatePartnerForm,
    queryKey: ["partner"],
    queryClient,
  });

  const deletePartnerFormMutation = useCustomMutation({
    mutationFn: deletePartnerForm,
    queryKey: ["partner"],
    queryClient,
  });

  const useGetPartnerFormQuery = (country: string) =>
    useQuery({
      queryKey: ["partner", country],
      queryFn: ({ queryKey }) => getPartnerForm(queryKey[1]),
      enabled: country ? true : false,
    });

  const getAllPartnerFormQuery = useQuery({
    queryKey: ["partner"],
    queryFn: getAllPartnerForm,
  });

  return {
    createPartnerFormMutation,
    updatePartnerFormMutation,
    deletePartnerFormMutation,
    useGetPartnerFormQuery,
    getAllPartnerFormQuery,
  };
};

export default usePartnerApi;
