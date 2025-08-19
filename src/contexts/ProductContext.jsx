import { createContext, useContext, useEffect, useState } from "react";
import { getData, updateData } from "../data";


const ProductContext = createContext();
const useProductContext = () => useContext(ProductContext);
export default useProductContext;



export function ProductProvider({children}) {

    const [productsData, setProductsData] = useState([]);
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [sizeValue, setSizeValue] = useState(null);
    // ---------------------------------------------------------------------
    // I don't understand this code block especially `useFetch()`
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getData();
                setProductsData(data);
            } catch (error) {
                setLoading(false);
                setError(true)
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // ----------------------------------------------------------------------


    function handleSearch(event) {
        setSearchedProducts(productsData.filter(product => product.name.toLowerCase().includes(event.target.value)));
    }

    function handleAddRemoveProductInCart(productId, isAddedToCartValue) {

        const updatedData = (preValues) => {
            return preValues.map((product) => {
                if (product._id != productId) {
                    return product;
                } 

                if (isAddedToCartValue) {
                   return {
                    ...product,
                    quantity: (product.quantity || 0) + 1,
                    isAddedToCart: true,
                   };
                }

                return {
                    ...product,
                    quantity: 0,
                    isAddedToCart: false

                }
            });
        }   

        updateData(productId, {
            isAddedToCart: isAddedToCartValue,
            quantity: isAddedToCartValue ? undefined : 0
        });
        setProductsData((preValues) => updatedData(preValues));
        
        if (isAddedToCartValue === true) {
            alert("Product added to cart successfully.")
        } else if (isAddedToCartValue === false) {
            alert("Product removed from cart successfully.")
        }
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
        if (isAddedToWishlistValue === true) {
            alert("Product added to wishlist successfully.")
        } else if (isAddedToWishlistValue === false) {
            alert("Product removed from wishlist successfully.")
        }   
    }

    const noOfUniqueProductsInCart = productsData.filter(product => (product.isAddedToCart && !product.isAddedToWishlist)).length;
    const noOfProductsInWishlist = productsData.filter(product => product.isAddedToWishlist).length;

    const quanityOfProductsInCart = productsData.reduce((acc, curr) => {
        if (curr.isAddedToCart) {
            acc += curr.quantity;
        }
        return acc;
    }, 0);

    return (
        <ProductContext.Provider value={{loading, error, productsData, setProductsData, sizeValue, setSizeValue, handleAddRemoveProductInCart, noOfUniqueProductsInCart, quanityOfProductsInCart, handleAddRemoveProductInWishlist, noOfProductsInWishlist, searchedProducts, handleSearch}}>
            {children}
        </ProductContext.Provider>
    )
}

