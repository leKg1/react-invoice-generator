import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import { useMoralis, useMoralisQuery, useMoralisSubscription } from 'react-moralis'

interface Props {
    // key: number;
    invoiceNo: string;
    clientName: string;
    invoiceDate: string;
    data: any;
  }

const Row: FunctionComponent<Props> = ({
    // key,
    invoiceNo: invoiceNo,
    clientName,
    invoiceDate,
    data
  }) => {
    return (
      <tr>
        <td><Link to={"/"+invoiceNo}>{invoiceNo}</Link></td>
        <td><Link to={"/"+invoiceNo}>{clientName}</Link></td>
        <td><Link to={"/"+invoiceNo}>{invoiceDate}</Link></td>
        <button onClick={async()=>await data.destroy(invoiceNo)}>Delete</button>
      </tr>
    );
  };
  export default Row