import { useState } from "react";
import {
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router"
import AddSMC from "../../components/Smc/AddSmc";


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
  
  export const Route = createFileRoute("/_layout/smc")({
    component: SMCForm,
  });
  
  function SMCForm() {
    const [SMCFormData, setFormData] = useState<SMCFormData>({
      name: "",
      a: "",
      b: "",
      DWT: "",
      SMC: false,
      comment: "",
      WiRMBond: "",
      WiRMNonStd: "",
    });
  
    const [submittedData, setSubmittedData] = useState<SMCFormData[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
      };
    
      const validateFields = () => {
        const floatErrors: { [key: string]: string } = {};
        const strErrors: { [key: string]: string } = {};
        
        ['a', 'b', 'DWT', 'WiRMBond', 'WiRMNonStd'].forEach(field => {
            const value = SMCFormData[field as keyof SMCFormData];
            if (typeof value === 'string' && value.trim() === "") {
              floatErrors[field] = 'This field cannot be empty';
            } else if (typeof value === 'string' && (isNaN(parseFloat(value)) || parseFloat(value) <= 0)) {
              floatErrors[field] = 'Must be a positive number';
            }
          });
        ['name', 'comment'].forEach(field => {
        const value = SMCFormData[field as keyof SMCFormData];
        if (typeof value === 'string' && value.trim() === "") {
            strErrors[field] = 'This field cannot be empty';
        }
        });
        return { floatErrors, strErrors };
    };  
      
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { floatErrors, strErrors } = validateFields();
        
        const validationErrors = { ...floatErrors, ...strErrors };
        if (Object.keys(validationErrors).length === 0) {
            try {
              // Send a POST request to the backend API
              const response = await fetch('/api/submit-data-smc', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(SMCFormData),
              });
      
              if (response.ok) {
                // Handle success (e.g., show a success message or clear form)
                const result = await response.json();
                console.log("Form submitted successfully:", result);
                setSubmittedData((prevData) => [...prevData, SMCFormData]);
                setFormData({
                  name: "",
                  a: "",
                  b: "",
                  DWT: "",
                  SMC: false,
                  comment: "",
                  WiRMBond: "",
                  WiRMNonStd: "",
                });
                setErrors({});
              } else {
                // Handle server errors (e.g., show an error message)
                console.error("Server error while submitting the form");
              }
            } catch (error) {
              // Handle network or other errors (e.g., show an error message)
              console.error("Error submitting form:", error);
            }
          } else {
            // Set the validation errors
            setErrors(validationErrors);
          }
      };
    
      return (
        <Container maxW="full" py={8}>
          <Heading size="lg" mb={6} textAlign={{ base: "center", md: "left" }}>
            SMC Test Input Form
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl id="name" isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={SMCFormData.name}
                  onChange={handleChange}
                  placeholder="Enter test name"
                />

                {errors.name && <p>{errors.name}</p>} 
              </FormControl>
    
              <FormControl id="a" isInvalid={!!errors.a}>
                <FormLabel>Parameter A</FormLabel>
                <Input
                  name="a"
                  value={SMCFormData.a}
                  onChange={handleChange}
                  placeholder="Enter value for A"
                />
                {errors.a && <p>{errors.a}</p>}
              </FormControl>
    
              <FormControl id="b" isInvalid={!!errors.b}>
                <FormLabel>Parameter B</FormLabel>
                <Input
                  name="b"
                  value={SMCFormData.b}
                  onChange={handleChange}
                  placeholder="Enter value for B"
                />
                {errors.b && <p>{errors.b}</p>}
              </FormControl>
    
              <FormControl id="DWT" isInvalid={!!errors.DWT}>
                <FormLabel>DWT</FormLabel>
                <Input
                  name="DWT"
                  value={SMCFormData.DWT}
                  onChange={handleChange}
                  placeholder="Enter DWT value"
                />
                {errors.DWT && <p>{errors.DWT}</p>}
              </FormControl>
    
              <FormControl id="SMC">
                <FormLabel>SMC</FormLabel>
                <Switch
                  name="SMC"
                  isChecked={SMCFormData.SMC}
                  onChange={handleSwitchChange}
                />
              </FormControl>
    
              <FormControl id="comment" isInvalid={!!errors.comment}>
                <FormLabel>Comment</FormLabel>
                <Input
                  name="comment"
                  value={SMCFormData.comment}
                  onChange={handleChange}
                  placeholder="Enter comments"
                />
              </FormControl>
    
              <FormControl id="WiRMBond" isInvalid={!!errors.WiRMBond}>
                <FormLabel>WiRM Bond</FormLabel>
                <Input
                  name="WiRMBond"
                  value={SMCFormData.WiRMBond}
                  onChange={handleChange}
                  placeholder="Enter WiRM Bond value"
                />
                {errors.WiRMBond && <p>{errors.WiRMBond}</p>}
              </FormControl>
    
              <FormControl id="WiRMNonStd" isInvalid={!!errors.WiRMNonStd}>
                <FormLabel>WiRM Non-Std</FormLabel>
                <Input
                  name="WiRMNonStd"
                  value={SMCFormData.WiRMNonStd}
                  onChange={handleChange}
                  placeholder="Enter WiRM Non-Std value"
                />
                {errors.WiRMNonStd && <p>{errors.WiRMNonStd}</p>}
              </FormControl>
    
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </VStack>
          </form>
    
          <SMCTable data={submittedData} />
        </Container>
      );
    }
  
    interface SMCTableProps {
      data: SMCFormData[];
    }
    
    function SMCTable({ data }: SMCTableProps) {
      return (
        <TableContainer mt={8}>
          <Table size="md">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>A</Th>
                <Th>B</Th>
                <Th>DWT</Th>
                <Th>SMC</Th>
                <Th>Comment</Th>
                <Th>WiRM Bond</Th>
                <Th>WiRM Non-Std</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.name}</Td>
                  <Td>{item.a}</Td>
                  <Td>{item.b}</Td>
                  <Td>{item.DWT}</Td>
                  <Td>{item.SMC ? "Yes" : "No"}</Td>
                  <Td>{item.comment}</Td>
                  <Td>{item.WiRMBond}</Td>
                  <Td>{item.WiRMNonStd}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      );
    }
    
    export default SMCForm;
