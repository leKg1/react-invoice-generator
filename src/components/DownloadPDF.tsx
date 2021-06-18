import React, { FC, useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import InvoicePage from './InvoicePage'

interface Props {
   tokenAddress: string
}

const Download: FC<Props> = ( {tokenAddress} ) => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    setShow(false)
    const timeout = setTimeout(() => {
      setShow(true)
    }, 500)
    return () => clearTimeout(timeout)
  }, []) 


  return (
    <div className={'download-pdf ' + (!show ? 'loading' : '')} title="Save PDF">
      {show && (
        <PDFDownloadLink
          document={<InvoicePage pdfMode={true} tokenAddress={tokenAddress} />}
          fileName={`${'invoice'}.pdf`}
          // fileName={`${invoiceNo ? invoiceNo.toLowerCase() : 'invoice'}.pdf`}
          aria-label="Save PDF"
        ></PDFDownloadLink>
      )}
    </div>
  )
}
export default Download
