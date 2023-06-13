import FormRow from "../formRow/FormRow";
import styles from "./formBody.module.css";

function FormBody({ invoiceData, handleRowDelete, handleQuantityChange }) {
  const rowIndexes = ["0", "1", "2", "3", "4", "5", "6"];
  return (
    <section className={styles.formBodyContainer}>
      {rowIndexes.map((index) => (
        <FormRow
          key={index}
          index={index}
          invoiceData={invoiceData}
          handleRowDelete={handleRowDelete}
          handleQuantityChange={handleQuantityChange}
        />
      ))}
    </section>
  );
}

export default FormBody;
