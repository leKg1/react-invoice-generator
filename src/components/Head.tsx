import React from 'react';
import {
  Link,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Button
} from "@chakra-ui/react";
const Head = () => {
    return (
      <Thead>
        <Tr>
          <Th>Invoice No</Th>
          <Th>Company Name</Th>
          <Th>ClientName</Th>
          <Th>InvoiceDate</Th>
        </Tr>
      </Thead>
    );
  };
  export default Head