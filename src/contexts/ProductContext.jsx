import { createContext, useContext, useState } from "react";

import { data, updateData } from "../data";


const ProductContext = createContext();
const useProductContext = () => useContext(ProductContext);
export default useProductContext;


export function ProductProvider({children}) {

    const [productsData, setProductsData] = useState(data || []); 

    function handleAddRemoveProductInCart(productId, isAddedToCartValue) {
        
        updateData(productId, isAddedToCartValue);

        const updatedData = productsData.map((product) => {
            if (product._id != productId) {
                return product;
            } 
            return {
                ...product,
                isAddedToCart: isAddedToCartValue
            }
        });

        setProductsData(updatedData);   

        // isAddedToCartValue === true ? alert("Product added to cart!") : alert("Removed from Cart!");
    }

    const noOfProductsInCart = productsData.filter(product => product.isAddedToCart).length;

    return (
        <ProductContext.Provider value={{productsData, handleAddRemoveProductInCart, noOfProductsInCart}}>
            {children}
        </ProductContext.Provider>
    )
}