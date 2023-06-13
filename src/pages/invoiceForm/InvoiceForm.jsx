import React, { useEffect, useContext, useState } from "react";
import styles from "./invoiceForm.module.css";
import Spinner from "../../components/spinner/Spinner";
import { DataContext } from "../../context/dataContext";
import FormBody from "../../components/formBody/FormBody";
import FormFooter from "../../components/formFooter/FormFooter";
import FormHeader from "../../components/formHeader/FormHeader";
import FormHeaderMain from "../../components/formHeaderMain/FormHeadeMain";

function InvoiceForm() {
  const [isLoading, setIsLoading] = useState(true);
  const localDate = new Date().toLocaleDateString();
  const { selectedProducts, setSelectedProducts, invoices, onSaveInvoice } =
    useContext(DataContext);
  const indexSelected = parseInt(selectedProducts.length - 1);
  const productSelected = selectedProducts?.map((product) => product.title);
  const priceItem = selectedProducts?.map((product) => product.price);
  const [invoiceData, setInvoiceData] = useState({
    number: "",
    customer: "",
    address: "",
    date: "",
    details: Array(7)
      .fill()
      .map(() => ({
        product: "",
        itemPrice: "",
        quantity: "",
        totalItem: "",
      })),
    subtotal: "",
    taxes: "",
    total: "",
  });
  const { date, taxes, total, number, address, customer, subtotal } =
    invoiceData;
  const detail = invoiceData.details[selectedProducts.length - 1];
  const { quantity, totalItem } = detail || {};
  const invoiceNumber = invoices.invoices.length + 1;

  const calculateItemTotal = () => {
    const totalItems = invoiceData.details.reduce((accumulator, detail) => {
      const detailTotal = parseFloat(detail.totalItem);
      return accumulator + (isNaN(detailTotal) ? 0 : detailTotal);
    }, 0);
    return totalItems.toFixed(2);
  };

  const itemTotal = calculateItemTotal();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    handleDateChange(localDate);
    handelNumberChange(invoiceNumber || 0);
    if (selectedProducts.length === 0) {
      return;
    }
    handleTaxesChange(subtotal);
    handleSubtotalChange(itemTotal);
    handleTotalChange(subtotal, taxes);
    handleItemPriceChange(
      indexSelected,
      "itemPrice",
      priceItem[selectedProducts.length - 1]
    );
    handleProductChange(
      indexSelected,
      "product",
      productSelected[selectedProducts.length - 1]
    );
    handleTotalItemChange(
      indexSelected,
      "totalItem",
      priceItem[selectedProducts.length - 1],
      quantity
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProducts, quantity, number, totalItem, subtotal, taxes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveInvoice(invoiceData);
  };

  console.log(invoiceData);

  const handelNumberChange = (number) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      number: "0000" + number,
    }));
  };

  const handleNameChange = (e) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      customer: e.target.value,
    }));
  };

  const handleAddressChange = (e) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      address: e.target.value,
    }));
  };

  const handleDateChange = (date) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      date: date,
    }));
  };

  const handleQuantityChange = (index, label, value) => {
    setInvoiceData((prevData) => {
      const updatedQuantity = [...prevData.details];
      updatedQuantity[index] = {
        ...updatedQuantity[index],
        [label]: value,
      };
      return {
        ...prevData,
        details: updatedQuantity,
      };
    });
  };

  const handleProductChange = (index, label, value) => {
    setInvoiceData((prevData) => {
      const updatedProduct = [...prevData.details];
      updatedProduct[index] = {
        ...updatedProduct[index],
        [label]: value,
      };
      return {
        ...prevData,
        details: updatedProduct,
      };
    });
  };

  const handleItemPriceChange = (index, label, value) => {
    setInvoiceData((prevData) => {
      const updatedPrice = [...prevData.details];
      updatedPrice[index] = {
        ...updatedPrice[index],
        [label]: parseInt(value).toFixed(2),
      };
      return {
        ...prevData,
        details: updatedPrice,
      };
    });
  };

  const handleTotalItemChange = (index, label, value, quantity) => {
    setInvoiceData((prevData) => {
      const updatedTotalItem = [...prevData.details];
      updatedTotalItem[index] = {
        ...updatedTotalItem[index],
        [label]: parseFloat(value * quantity).toFixed(2),
      };
      return {
        ...prevData,
        details: updatedTotalItem,
      };
    });
  };

  const handleSubtotalChange = (value) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      subtotal: parseFloat(value + value).toFixed(2),
    }));
  };

  const handleTaxesChange = (subtotal) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      taxes: (subtotal * 0.21).toFixed(2),
    }));
  };

  const handleTotalChange = (subtotal, taxes) => {
    subtotal = parseInt(subtotal);
    taxes = parseInt(taxes);
    setInvoiceData((prevData) => ({
      ...prevData,
      total: (subtotal + taxes).toFixed(2),
    }));
  };

  const handleRowDelete = (index) => {
    setSelectedProducts((prevSelectedProducts) => {
      const updatedSelectedProducts = [
        ...prevSelectedProducts.slice(0, index),
        ...prevSelectedProducts.slice(index + 1),
      ];
      return updatedSelectedProducts;
    });

    setInvoiceData((prevInvoiceData) => {
      const updatedInvoiceDetails = [...prevInvoiceData.details];
      updatedInvoiceDetails[index] = {};
      return {
        ...prevInvoiceData,
        details: updatedInvoiceDetails,
      };
    });
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <main className={styles.invoiceContainer}>
      <FormHeaderMain handleSubmit={handleSubmit} />
      <div className={styles.innerInvoice}>
        <FormHeader
          date={date}
          number={number}
          address={address}
          customer={customer}
          handleNameChange={handleNameChange}
          handleAddressChange={handleAddressChange}
        />
        <FormBody
          invoiceData={invoiceData}
          handleRowDelete={handleRowDelete}
          handleQuantityChange={handleQuantityChange}
        />
        <FormFooter taxes={taxes} total={total} subtotal={subtotal} />
      </div>
    </main>
  );
}

export default InvoiceForm;
