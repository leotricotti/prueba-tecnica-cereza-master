import Button from "../button/Button";
import styles from "./invoiceListHeader.module.css";
import InvoiceListSearch from "../invoiceListSearch/InvoiceListSearch";

function InvoiceListHeader({
  link,
  onClick,
  setInvoiceId,
  setIsLoading,
  setShowInvoice,
}) {
  return (
    <header className={styles.headerContainer}>
      <InvoiceListSearch
        setIsLoading={setIsLoading}
        setInvoiceId={setInvoiceId}
        setShowInvoice={() => setShowInvoice(true)}
      />
      <Button
        link={link}
        onClick={onClick}
        text="Crear factura"
        styles={styles.button}
      />
    </header>
  );
}

export default InvoiceListHeader;
