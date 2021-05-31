import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

interface Props {
    // key: number;
    invoiceNo: string;
    clientName: string;
    invoiceDate: string;
  }

const Row: FunctionComponent<Props> = ({
    // key,
    invoiceNo: invoiceNo,
    clientName,
    invoiceDate,
  }) => {
    return (
      <tr>
        <td><Link to={"/"+invoiceNo}>{invoiceNo}</Link></td>
        <td><Link to={"/"+invoiceNo}>{clientName}</Link></td>
        <td><Link to={"/"+invoiceNo}>{invoiceDate}</Link></td>
      </tr>
    );
  };
  export default Row