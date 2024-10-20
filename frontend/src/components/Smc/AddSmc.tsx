
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";

import { type ApiError,  ItemsService } from "../../client";
import useCustomToast from "../../hooks/useCustomToast";
import { handleError } from "../../utils";
// import  SMCFormData from "../../routes/_layout/smc"

 
interface SMCFormData {
  name: string;
  a: string;
  b: string;
  DWT: string;
  SMC: boolean;
  comment: string;
  WiRMBond: string;
  WiRMNonStd: string;
}
interface AddSMCProps {
  isOpen: boolean;
  onClose: () => void;
}


const AddSMC = ({ isOpen, onClose }: AddSMCProps) => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SMCFormData>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      name: "",
      a: "",
      b: "",
      DWT: "",
      SMC: false,
      comment: "",
      WiRMBond: "",
      WiRMNonStd: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: SMCFormData) => ItemsService.createItem({ requestBody: { ...data, title: data.name }  }), // замените createSMC на существующий метод
    onSuccess: () => {
      showToast("Success!", "SMC record created successfully.", "success");
      reset();
      onClose();
    },
    onError: (err: ApiError) => {
      handleError(err, showToast);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["smc"] });
    },
  });
  const onSubmit: SubmitHandler<SMCFormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md" }} isCentered>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add SMC Record</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required." })}
                  placeholder="Enter test name"
                />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.a}>
                <FormLabel htmlFor="a">Parameter A</FormLabel>
                <Input id="a" {...register("a")} placeholder="Enter value for A" />
                <FormErrorMessage>{errors.a && errors.a.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.b}>
                <FormLabel htmlFor="b">Parameter B</FormLabel>
                <Input id="b" {...register("b")} placeholder="Enter value for B" />
                <FormErrorMessage>{errors.b && errors.b.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.DWT}>
                <FormLabel htmlFor="DWT">DWT</FormLabel>
                <Input id="DWT" {...register("DWT")} placeholder="Enter DWT value" />
                <FormErrorMessage>{errors.DWT && errors.DWT.message}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="SMC">SMC</FormLabel>
                <Switch id="SMC" {...register("SMC")} />
              </FormControl>

              <FormControl isInvalid={!!errors.comment}>
                <FormLabel htmlFor="comment">Comment</FormLabel>
                <Input id="comment" {...register("comment")} placeholder="Enter comments" />
                <FormErrorMessage>{errors.comment && errors.comment.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.WiRMBond}>
                <FormLabel htmlFor="WiRMBond">WiRM Bond</FormLabel>
                <Input id="WiRMBond" {...register("WiRMBond")} placeholder="Enter WiRM Bond value" />
                <FormErrorMessage>{errors.WiRMBond && errors.WiRMBond.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.WiRMNonStd}>
                <FormLabel htmlFor="WiRMNonStd">WiRM Non-Std</FormLabel>
                <Input id="WiRMNonStd" {...register("WiRMNonStd")} placeholder="Enter WiRM Non-Std value" />
                <FormErrorMessage>{errors.WiRMNonStd && errors.WiRMNonStd.message}</FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSMC;
