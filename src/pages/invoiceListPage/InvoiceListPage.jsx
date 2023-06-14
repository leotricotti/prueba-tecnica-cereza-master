import { useState, useEffect, useContext } from "react";
import styles from "./invoiceListPage.module.css";
import Spinner from "../../components/spinner/Spinner";
import { DataContext } from "../../context/dataContext";
import InvoiceList from "../../components/invoiceList/InvoiceList";
import StoredInvoice from "../../components/storedInvoice/StoredInvoice";
import InvoiceListHeader from "../../components/invoiceListHeader/InvoiceListHeader";

function InvoicesListPages() {
  const { invoices } = useContext(DataContext);
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
        link={"/invoice"}
        showForm={showForm}
        setInvoiceId={setInvoiceId}
        setIsLoading={setIsLoading}
        setShowInvoice={setShowInvoice}
        onClick={() => setShowForm(true)}
      />
      <InvoiceList
        invoices={invoices}
        setInvoiceId={setInvoiceId}
        setIsLoading={setIsLoading}
        setShowInvoice={setShowInvoice}
      />
      {showInvoice && (
        <StoredInvoice
          invoiceId={invoiceId}
          invoiceData={invoices}
          setIsLoading={setIsLoading}
          setShowInvoice={setShowInvoice}
        />
      )}
    </div>
  );
}

export default InvoicesListPages;
