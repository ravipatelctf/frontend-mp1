
import useProductContext from "../contexts/ProductContext";
import { toast } from "react-toastify";

export function ProductSize() {
    
    const {sizeValue, setSizeValue} = useProductContext();
    return (
        <div>
            <label htmlFor="size" className="fw-bold">Size:</label>
            <div className="mb-1">
                <button type="button" name="size" className={`m-1 btn btn-outline-primary text-secondary fw-bold ${sizeValue === "S" ? "active text-white" : ""}`} onClick={() => {
                    toast.info("Size set 'S'")
                    setSizeValue("S")
                }}>S</button>
                <button type="button" name="size" className={`m-1 btn btn-outline-primary text-secondary fw-bold ${sizeValue === "M" ? "active text-white" : ""}`} onClick={() => {
                    toast.info("Size set 'M'")
                    setSizeValue("M")
                }}>M</button>
                <button type="button" name="size" className={`m-1 btn btn-outline-primary text-secondary fw-bold ${sizeValue === "XL" ? "active text-white" : ""}`} onClick={() => {
                    toast.info("Size set 'XL'")
                    setSizeValue("XL")
                }}>XL</button>
                <button type="button" name="size" className={`m-1 btn btn-outline-primary text-secondary fw-bold ${sizeValue === "XXL" ? "active text-white" : ""}`} onClick={() => {
                    toast.info("Size set 'XXL'")
                    setSizeValue("XXL")
                }}>XXL</button>
            </div>
        </div>
    );
}