import { useState, useContext } from "react";
import styles from "./invoiceListSearch.module.css";
import { DataContext } from "../../context/dataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function InvoiceListSeach({ setInvoiceId, setShowInvoice, setIsLoading }) {
  const { invoices } = useContext(DataContext);
  const [showMenu, setShowMenu] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [matchingOptions, setMatchingOptions] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const matchingOptions = invoices.invoices.filter((item) =>
      item.customer.toLowerCase().includes(inputValue.toLowerCase())
    );
    setShowMenu(true);
    setInputValue(inputValue);
    setMatchingOptions(matchingOptions);
  };

  const handleOptionClick = (option) => {
    setShowMenu(false);
    setIsLoading(true);
    setShowInvoice(true);
    setMatchingOptions(option);
    setInvoiceId(option.number);
    console.log(option.number);
  };

  return (
    <div className={styles.searchBar}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
      <input
        type="text"
        placeholder="Buscar factura..."
        value={inputValue}
        onChange={handleInputChange}
        className={styles.input}
      />
      {showMenu && (
        <ul className={styles.menu}>
          {matchingOptions.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleOptionClick(option)}
              className={styles.item}
            >
              {option.customer}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InvoiceListSeach;
