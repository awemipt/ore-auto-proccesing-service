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
  const [SMCFormData, setFormData] = useState({
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

  const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedData((prevData) => {
        return [...prevData, SMCFormData];
    });
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
  };

  return (
    <Container maxW="full" py={8}>
      <Heading size="lg" mb={6} textAlign={{ base: "center", md: "left" }}>
        SMC Test Input Form
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={SMCFormData.name}
              onChange={handleChange}
              placeholder="Enter test name"
            />
          </FormControl>

          <FormControl id="a">
            <FormLabel>Parameter A</FormLabel>
            <Input
              name="a"
              value={SMCFormData.a}
              onChange={handleChange}
              placeholder="Enter value for A"
            />
          </FormControl>

          <FormControl id="b">
            <FormLabel>Parameter B</FormLabel>
            <Input
              name="b"
              value={SMCFormData.b}
              onChange={handleChange}
              placeholder="Enter value for B"
            />
          </FormControl>

          <FormControl id="DWT">
            <FormLabel>DWT</FormLabel>
            <Input
              name="DWT"
              value={SMCFormData.DWT}
              onChange={handleChange}
              placeholder="Enter DWT value"
            />
          </FormControl>

          <FormControl id="SMC">
            <FormLabel>SMC</FormLabel>
            <Switch
              name="SMC"
              isChecked={SMCFormData.SMC}
              onChange={handleSwitchChange}
            />
          </FormControl>

          <FormControl id="comment">
            <FormLabel>Comment</FormLabel>
            <Input
              name="comment"
              value={SMCFormData.comment}
              onChange={handleChange}
              placeholder="Enter comments"
            />
          </FormControl>

          <FormControl id="WiRMBond">
            <FormLabel>WiRM Bond</FormLabel>
            <Input
              name="WiRMBond"
              value={SMCFormData.WiRMBond}
              onChange={handleChange}
              placeholder="Enter WiRM Bond value"
            />
          </FormControl>

          <FormControl id="WiRMNonStd">
            <FormLabel>WiRM Non-Std</FormLabel>
            <Input
              name="WiRMNonStd"
              value={SMCFormData.WiRMNonStd}
              onChange={handleChange}
              placeholder="Enter WiRM Non-Std value"
            />
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
    <>
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
    </>
  );
}


export default SMCForm;
