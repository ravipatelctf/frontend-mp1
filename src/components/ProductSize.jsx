
import useProductContext from "../contexts/ProductContext";
import { toast } from "react-toastify";

export function ProductSize() {
    
    const {sizeValue, setSizeValue} = useProductContext();
    return (
        <div className="d-flex gap-2 py-3">
            <p className="fw-bold">Size:</p>
            <button type="button" className={`btn btn-outline-primary text-secondary fw-bold ${sizeValue === "S" ? "active text-white" : ""}`} onClick={() => {
                toast.info("Size set 'S'")
                setSizeValue("S")
            }}>S</button>
            <button type="button" className={`btn btn-outline-primary text-secondary fw-bold ${sizeValue === "M" ? "active text-white" : ""}`} onClick={() => {
                toast.info("Size set 'M'")
                setSizeValue("M")
            }}>M</button>
            <button type="button" className={`btn btn-outline-primary text-secondary fw-bold ${sizeValue === "XL" ? "active text-white" : ""}`} onClick={() => {
                toast.info("Size set 'XL'")
                setSizeValue("XL")
            }}>XL</button>
            <button type="button" className={`btn btn-outline-primary text-secondary fw-bold ${sizeValue === "XXL" ? "active text-white" : ""}`} onClick={() => {
                toast.info("Size set 'XXL'")
                setSizeValue("XXL")
            }}>XXL</button>
        </div>
    );
}