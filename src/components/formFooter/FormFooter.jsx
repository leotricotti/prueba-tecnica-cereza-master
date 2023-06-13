import styles from "./formFooter.module.css";

const FormFooter = ({ taxes, total, subtotal }) => {
  return (
    <section className={styles.invoiceFooterContainer}>
      <div className={styles.totalItems}>{subtotal}</div>
      <div className={styles.taxes}>{taxes}</div>
      <div className={styles.total}>{total}</div>
    </section>
  );
};

export default FormFooter;
