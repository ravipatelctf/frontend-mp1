import { createContext, useContext, useEffect, useState } from "react";
import { getData } from "../data";
import { toast } from "react-toastify";


const ProductContext = createContext();
const useProductContext = () => useContext(ProductContext);
export default useProductContext;


export function ProductProvider({children}) {

    const [productsData, setProductsData] = useState([]);
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [address, setAddresses] = useState([]);

    // ---------------------------------------------------------------------

    const [cartProducts, setCartProducts] = useState([]);
    const [wishlistProducts, setIsInWishlist] = useState([]);
    // ---------------------------------------------------------------------
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    // ----------------------------------------------------------------------
    const [btnState, setBtnState] = useState(null);
    // ----------------------------------------------------------------------
    const [selectedAddress, setSelectedAddress] = useState("");
    const [placeOrderAddresses, setPlaceOrderAddresses] = useState([]);
    // ----------------------------------------------------------------------
    const [selectedCategories, setSelectedCategories] = useState([]);
    // ----------------------------------------------------------------------
    const [orderSummary, setOrderSummary] = useState({});
    const [orderSummaryStatus, setOrderSummaryStatus] = useState(false);
    
    // ----------------------------------------------------------------------
    const storedData = JSON.parse(localStorage.getItem("dataOfProducts"));
    // ----------------------------------------------------------------------
    useEffect(() => {
        try {
            async function fetchProducts() {
                try {
                    const data = await getData();
                    if (data) {
                        setLoading(false)
                        setProductsData(data);
                    }
                    
                } catch (error) {
                    setLoading(false);
                    setError(true)
                } finally {
                    setLoading(false);
                }
            }
            
            if (storedData && storedData.length > 0) {
                setLoading(false)
                setProductsData(storedData);
            } else {
                fetchProducts();
                localStorage.setItem("dataOfProducts", JSON.stringify(productsData))
            }

        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }, []);
    
    // -------------------------------------------------------------------------------------------------
    useEffect(() => {
        setCartProducts(() => [...productsData.filter(product => product && product.isAddedToCart)])
        setIsInWishlist(() => [...productsData.filter(product => product && product.isAddedToWishlist)])

        localStorage.setItem("dataOfProducts", JSON.stringify(productsData));
    }, [productsData])
    // -------------------------------------------------------------------------------------------------

    function handleDetailsPageAddToCartProducts(product) {
        
        const newProducts = (preValues) => { 
            return preValues.map((item) => {
                if (item._id !== product._id) {
                    return item;
                }

                return {
                    ...item,
                    isAddedToCart: true,
                }
            });
        }
        setProductsData((preValues) => newProducts(preValues));
    }

    function handleAddToCartProducts(product) {
        
        const newProducts = (preValues) => { 
            return preValues.map((item) => {
                if (item._id !== product._id) {
                    return item;
                }

                if (item.isAddedToCart === true){
                    return {
                        ...item,
                        
                        quantity: item.quantity + 1   
                    }
                }

                return {
                    ...item,
                    isAddedToCart: true,
                }
            });
        }
        setProductsData((preValues) => newProducts(preValues));
    }

    function handleRemoveFromCartProducts(product) {
        
        const newProducts = (preValues) => { 
            return preValues.map((item) => {
                if (item._id !== product._id) {
                    return item;
                }

                if (item.isAddedToCart === true){
                    return {
                        ...item,
                        isAddedToCart: false,
                        quantity: 1   
                    }
                }
            });
        }
        setProductsData((preValues) => newProducts(preValues));
    }

    function handleAddToWishlistProducts(product) {
        
        const newProducts = (preValues) => { 
            return preValues.map((item) => {
                if (item._id !== product._id) {
                    return item;
                }

                return {
                    ...item,
                    isAddedToWishlist: true,
                }
            });
        }
        setProductsData((preValues) => newProducts(preValues));
    }

    function handleRemoveFromWishlistProducts(product) {
        
        const newProducts = (preValues) => { 
            return preValues.map((item) => {
                if (item._id !== product._id) {
                    return item;
                }

                return {
                    ...item,
                    isAddedToWishlist: false,
                }
            });
        }
        setProductsData((preValues) => newProducts(preValues));
    }

    function handleSizeChange(product, size) {
                            
        toast.info(`Size set ${size}`)
        // --------------------------------------------
        const updatedProduct = (preValues) => {
            return preValues.map((curr) => {
                if (curr._id != product._id) {
                    return curr;
                }
                return {
                    ...curr,
                    size: size
                }
            })
        }
        setProductsData((preValues) => updatedProduct(preValues))
        // --------------------------------------------
    }

    // ---------------------------------------------------------------------------------------------------

    function handleCategory(event) {
        const {checked, value} = event.target;
        if (checked) {
            setSelectedCategories((preValues) => [...preValues, value]);
        } else {
            setSelectedCategories((preValues) => preValues.filter(pv => pv !== value))
        }
    }
    // ----------------------------------------------------------------------

    function handleSearch(event) {
        setSearchedProducts(productsData.filter(product => product.name.toLowerCase().includes(event.target.value)));
    }
    // -------------------------------------------------------------------------------------------------

    const noOfUniqueProductsInCart = cartProducts.length;
    const noOfProductsInWishlist = wishlistProducts.length;

    const quantityOfProductsInCart = cartProducts.reduce((acc, curr) => {
        if (curr.isAddedToCart) {
            acc += curr.quantity;
        }
        return acc;
    }, 0);

    // ---------------------------------------------------------------------------------------------------
    return (
        <ProductContext.Provider value={{
            btnState,
            setBtnState, 
            address, 
            setAddresses, 
            loading, 
            error, 
            productsData, 
            setProductsData, 

            handleSizeChange,
            noOfUniqueProductsInCart, 
            quantityOfProductsInCart, 
            
            noOfProductsInWishlist, 
            searchedProducts, 
            handleSearch, 
            selectedCategories, 
            setSelectedCategories,
            handleCategory,
            
            handleAddToCartProducts,
            handleRemoveFromCartProducts,
            handleAddToWishlistProducts,
            handleRemoveFromWishlistProducts,
            handleDetailsPageAddToCartProducts,
            cartProducts,
            wishlistProducts,
            
            orderSummary,
            setOrderSummary,
            orderSummaryStatus, 
            setOrderSummaryStatus,

            selectedAddress, 
            setSelectedAddress,
            placeOrderAddresses, 
            setPlaceOrderAddresses,
        }}>
            {children}
        </ProductContext.Provider>
    )
}

