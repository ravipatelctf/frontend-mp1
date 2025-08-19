import { useState } from "react";
import useProductContext from "../contexts/ProductContext";

export function ProductSize() {
    
    const {sizeValue, setSizeValue} = useProductContext();
    console.log(sizeValue)
    return (
        <div className="d-flex gap-2 py-3">
            <p className="fw-bold">Size:</p>
            <button type="button" className={`btn btn-outline-primary text-secondary fw-bold ${sizeValue === "S" ? "active text-white" : ""}`} onClick={() => setSizeValue("S")}>S</button>
            <button type="button" className={`btn btn-outline-primary text-secondary fw-bold ${sizeValue === "M" ? "active text-white" : ""}`} onClick={() => setSizeValue("M")}>M</button>
            <button type="button" className={`btn btn-outline-primary text-secondary fw-bold ${sizeValue === "XL" ? "active text-white" : ""}`} onClick={() => setSizeValue("XL")}>XL</button>
            <button type="button" className={`btn btn-outline-primary text-secondary fw-bold ${sizeValue === "XXL" ? "active text-white" : ""}`} onClick={() => setSizeValue("XXL")}>XXL</button>
        </div>
    );
}