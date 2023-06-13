import { useState, useEffect } from "react";
import InvoiceListHeader from "../../components/invoiceListHeader/InvoiceListHeader";
import StoredInvoice from "../../components/storedInvoice/StoredInvoice";
import InvoiceList from "../../components/invoiceList/InvoiceList";
import Spinner from "../../components/spinner/Spinner";
import styles from "./invoiceList.module.css";

function InvoicesList({ invoices }) {
  const [invoiceId, setInvoiceId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [isLoading]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div
      className={`${styles.appWrapper} ${
        showForm || showInvoice ? styles.overflow : ""
      }`}
    >
      <InvoiceListHeader
        onClick={() => setShowForm(true)}
        link={"/invoice"}
        showForm={showForm}
        data={invoices}
        setShowInvoice={setShowInvoice}
        setIsLoading={setIsLoading}
      />
      <InvoiceList
        invoices={invoices}
        setShowInvoice={setShowInvoice}
        setInvoiceId={setInvoiceId}
        setIsLoading={setIsLoading}
      />
      {showInvoice && (
        <StoredInvoice
          setShowInvoice={setShowInvoice}
          invoiceId={invoiceId}
          invoiceData={invoices}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
}

export default InvoicesList;
