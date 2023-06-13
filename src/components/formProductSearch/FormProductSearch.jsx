import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../../context/dataContext";
import styles from "./formProductSearch.module.css";

function FormProductSearch() {
  const {
    productList,
    matchingOptions,
    selectedProducts,
    setMatchingOptions,
    setSelectedProducts,
  } = useContext(DataContext);
  const [showMenu, setShowMenu] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    const filteredOptions = productList.products.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setShowMenu(true);
    setInputValue(value);
    setMatchingOptions(filteredOptions);
  };

  const handleProductClick = (product) => {
    setShowMenu(false);
    setInputValue(product.title);
    setSelectedProducts([...selectedProducts, product]);
  };

  const handleClick = () => {
    setShowMenu(true);
    setInputValue("");
  };

  return (
    <div className={styles.searchBarContainer}>
      <button type="submit" className={styles.button}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Buscar producto..."
        onClick={handleClick}
        className={styles.input}
      />
      {showMenu && (
        <ul className={styles.searchMenu}>
          {matchingOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleProductClick(option)}
              className={styles.searchItem}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FormProductSearch;
