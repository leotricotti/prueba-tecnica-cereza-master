import InvoiceListSearch from "../invoiceListSearch/InvoiceListSearch";
import Button from "../button/Button";
import styles from "./invoiceListHeader.module.css";

function InvoiceListHeader({
  data,
  link,
  onClick,
  setIsLoading,
  setShowInvoice,
}) {
  return (
    <header className={styles.headerContainer}>
      <InvoiceListSearch
        data={data}
        setShowInvoice={() => setShowInvoice(true)}
        setIsLoading={setIsLoading}
      />
      <Button
        text="Crear factura"
        onClick={onClick}
        styles={styles.button}
        link={link}
      />
    </header>
  );
}

export default InvoiceListHeader;
