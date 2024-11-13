import { Table, Link } from "@chakra-ui/react"

export default function AppList() {
  return (
    <Table.Root variant="line">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Path</Table.ColumnHeader>
          <Table.ColumnHeader>Version</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Scrib</Table.Cell>
          <Table.Cell>
            <Link href="/books">/books</Link>
          </Table.Cell>
          <Table.Cell>0.1.11</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}
