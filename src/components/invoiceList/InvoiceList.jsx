import InvoiceItem from "../invoiceItem/InvoiceItem";
import styles from "./invoiceList.module.css";

function InvoiceList({ setShowInvoice, setInvoiceId, setIsLoading }) {
  const handleShowInvoice = (id) => {
    setShowInvoice(true);
    setInvoiceId(id);
    setIsLoading(true);
  };
  return (
    <section className={styles.invoiceList}>
      <InvoiceItem handleShowInvoice={handleShowInvoice} />
    </section>
  );
}

export default InvoiceList;
