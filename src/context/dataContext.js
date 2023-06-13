import { createContext, useEffect, useState } from "react";
import invoiceData from "../assets/data/invoiceData.json";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [productList, setProductList] = useState([]);
  const [matchingOptions, setMatchingOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const jsonData = await response.json();
        setProductList(jsonData);
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoiceData));
    const storedInvoices = JSON.parse(localStorage.getItem("invoices"));
    if (storedInvoices) {
      setInvoices(storedInvoices);
    }
  }, []);

  const onSaveInvoice = (newInvoice) => {
    const updatedInvoices = [...invoices.invoices, newInvoice];
    setInvoices(updatedInvoices);

    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
  };

  const value = {
    invoices,
    productList,
    matchingOptions,
    selectedProducts,
    onSaveInvoice,
    setSelectedProducts,
    setMatchingOptions,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { DataContext, DataProvider };
