import styles from "./formHeader.module.css";

function FormHeader({
  date,
  number,
  address,
  customer,
  handleSubmit,
  handleNameChange,
  handleAddressChange,
}) {
  return (
    <form onSubmit={handleSubmit} className={styles.formHeaderContainer}>
      <span className={styles.invoiceDate}>{date}</span>
      <span className={styles.invoiceNumber}>Factura N° {number}</span>
      <input
        type="text"
        id="client-name"
        value={customer}
        onChange={handleNameChange}
        required
        className={styles.clientName}
      />
      <input
        type="text"
        id="client-address"
        value={address}
        onChange={handleAddressChange}
        required
        className={styles.clientAddress}
      />
    </form>
  );
}

export default FormHeader;
