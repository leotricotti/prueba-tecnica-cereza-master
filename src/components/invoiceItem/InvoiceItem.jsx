import { useContext } from "react";
import { DataContext } from "../../context/dataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faFolderOpen,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./invoiceItem.module.css";

function InvoiceItem({ handleShowInvoice }) {
  const { invoices } = useContext(DataContext);
  const sortedInvoices = invoices.invoices.sort((a, b) => b.number - a.number);

  return (
    <div className={styles.invoiceContainer}>
      {sortedInvoices.map((invoice) => (
        <div key={invoice.number} className={styles.invoiceInner}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faFileLines} className={styles.icon} />
          </div>
          <h4 className={styles.title}>
            Factura # <br /> {invoice.number}
          </h4>
          <table>
            <tbody className={styles.body}>
              <tr className={styles.item}>
                <td>
                  <p>Cliente</p>
                </td>
                <td>
                  <strong>{invoice.customer}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.options}>
            <button onClick={() => handleShowInvoice(invoice.number)}>
              <FontAwesomeIcon
                icon={faFolderOpen}
                className={styles.optionsIcon}
              />
            </button>
            <button>
              <FontAwesomeIcon icon={faPrint} className={styles.optionsIcon} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InvoiceItem;
