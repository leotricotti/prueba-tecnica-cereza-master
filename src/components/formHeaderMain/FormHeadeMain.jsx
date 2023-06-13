import Button from "../button/Button";
import styles from "./formHeaderMain.module.css";
import FormProductSearch from "../formProductSearch/FormProductSearch";

function FormHeaderMain({ handleSubmit }) {
  return (
    <header className={styles.invoiceHeader}>
      <div className={styles.headerInner}>
        <FormProductSearch />
        <div className={styles.buttonsContainer}>
          <Button
            text="Guardar"
            styles={styles.button}
            onClick={handleSubmit}
          />
          <span className={styles.separador}>/</span>
          <Button
            text="Cancelar"
            link={"/"}
            styles={`${styles.button} ${styles.cancel}`}
          />
        </div>
      </div>
    </header>
  );
}

export default FormHeaderMain;
