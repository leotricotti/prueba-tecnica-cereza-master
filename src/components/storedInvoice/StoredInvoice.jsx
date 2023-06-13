import { useContext } from "react";
import { DataContext } from "../../context/dataContext";
import { useEffect, useState } from "react";
import Button from "../button/Button";
import styles from "./storedInvoice.module.css";

function StoredInvoice({ setShowInvoice, invoiceId, setIsLoading }) {
  const { invoices } = useContext(DataContext);
  const [invoice, setInvoice] = useState(null);
  const invoiceData = invoices;

  console.log(invoiceId);

  useEffect(() => {
    if (invoiceId && invoiceData)
      setInvoice(
        invoiceData.invoices.find((invoice) => invoice.number === invoiceId)
      );
  }, [invoiceData, invoiceId]);

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    setIsLoading(true);
  };

  if (!invoice) {
    return null;
  }

  return (
    <section className={styles.invoiceContainer}>
      <div className={styles.buttonsContainer}>
        <Button
          text="Cerrar"
          onClick={handleCloseInvoice}
          styles={`${styles.button} ${styles.cancel}`}
        />
      </div>
      <div className={styles.innerInvoice}>
        <div className={styles.invoiceHeader}>
          <span className={styles.invoiceNumber}>
            Factura N° {invoice.number}
          </span>
          <span className={styles.invoiceDate}>{invoice.date}</span>
          <span className={styles.invoiceCustomer}>{invoice.customer}</span>
          <span className={styles.invoiceAddress}>{invoice.address}</span>
        </div>
        <div className={styles.invoiceBody}>
          {invoice.details.map((detail, index) => (
            <div className={styles.invoiceDetail} key={index}>
              <span className={styles.detailQuantity}>{detail.quantity}</span>
              <span className={styles.detailProduct}>{detail.product}</span>
              <span className={styles.itemPrice}>{detail.itemPrice}.00</span>
              <span className={styles.totalItem}>{detail.totalItem}.00</span>
            </div>
          ))}

          <div className={styles.invoiceFooter}>
            <span className={styles.totalItems}>{invoice.subtotal}.00</span>
            <span className={styles.taxes}>{invoice.taxes}</span>
            <span className={styles.total}>{invoice.total}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoredInvoice;
