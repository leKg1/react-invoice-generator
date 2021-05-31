import React, { FunctionComponent } from 'react';

interface Props {
    // key: number;
    title: string;
    clientName: string;
    invoiceDate: string;
  }

const Row: FunctionComponent<Props> = ({
    // key,
    title,
    clientName,
    invoiceDate,
  }) => {
    return (
      <tr>
        <td>{title}</td>
        <td>{clientName}</td>
        <td>{invoiceDate}</td>
      </tr>
    );
  };
  export default Row