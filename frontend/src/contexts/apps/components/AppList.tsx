import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link,
} from "@chakra-ui/react"

export default function AppList() {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Path</Th>
            <Th>Version</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Scrib</Td>
            <Td>
              <Link href="/books">/books</Link>
            </Td>
            <Td>0.1.11</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
