import styles from "./formRow.module.css";

function FormRow({
  index,
  invoiceData,
  handleRowDelete,
  handleQuantityChange,
}) {
  const { details } = invoiceData;

  const handleInputClick = () => {
    handleRowDelete(index);
  };

  return details[index] === "" ? null : (
    <div className={styles.invoiceRow}>
      <input
        type="text"
        value={details[index]?.quantity || ""}
        onChange={(e) => {
          handleQuantityChange(index, "quantity", e.target.value);
        }}
        required
        className={styles.quantity}
      />
      <input
        defaultValue={details[index]?.product || ""}
        className={styles.product}
        onClick={handleInputClick}
      />
      <span className={styles.price}>{details[index]?.itemPrice}</span>
      <span className={styles.total}>{details[index]?.totalItem}</span>
    </div>
  );
}

export default FormRow;
