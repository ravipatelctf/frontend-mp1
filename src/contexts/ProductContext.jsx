import { createContext, useContext, useState } from "react";

import { data, updateData } from "../data";


const ProductContext = createContext();
const useProductContext = () => useContext(ProductContext);
export default useProductContext;



export function ProductProvider({children}) {

    const [productsData, setProductsData] = useState(data || []); 

    function handleAddRemoveProductInCart(productId, isAddedToCartValue) {
        
        updateData(productId, {isAddedToCart: isAddedToCartValue});

        const updatedData = (preValues) => {
            return preValues.map((product) => {
                if (product._id != productId) {
                    return product;
                } 
                return {
                    ...product,
                    isAddedToCart: isAddedToCartValue
                }
            });
        }   

        setProductsData((preValues) => updatedData(preValues));   
    }

    function handleAddRemoveProductInWishlist(productId, isAddedToWishlistValue) {
        
        updateData(productId, {isAddedToWishlist: isAddedToWishlistValue});

        const updatedData = (preValues) => {
            return preValues.map((product) => {
                if (product._id != productId) {
                    return product;
                } 
                return {
                    ...product,
                    isAddedToWishlist: isAddedToWishlistValue
                }
            });
        }

        setProductsData((preValues) => updatedData(preValues));   
    }

    const noOfUniqueProductsInCart = productsData.filter(product => product.isAddedToCart).length;
    const noOfProductsInWishlist = productsData.filter(product => product.isAddedToWishlist).length;

    const quanityOfProductsInCart = productsData.reduce((acc, curr) => {
        if (curr.isAddedToCart) {
            acc += curr.quantity;
        }
        return acc;
    }, 0);

    return (
        <ProductContext.Provider value={{productsData, setProductsData, handleAddRemoveProductInCart, noOfUniqueProductsInCart, quanityOfProductsInCart, handleAddRemoveProductInWishlist, noOfProductsInWishlist}}>
            {children}
        </ProductContext.Provider>
    )
}

