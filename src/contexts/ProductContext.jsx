import { createContext, useContext, useEffect, useState } from "react";
import { getData, updateData } from "../data";
import { toast } from "react-toastify";

const ProductContext = createContext();
const useProductContext = () => useContext(ProductContext);
export default useProductContext;


export function ProductProvider({children}) {

    const [productsData, setProductsData] = useState([]);
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [sizeValue, setSizeValue] = useState(null);
    const [address, setAddresses] = useState([]);

    // ---------------------------------------------------------------------

    const [cartProducts, setCartProducts] = useState([]);
    const [wishlistProducts, setIsInWishlist] = useState([]);
    // ---------------------------------------------------------------------
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // ----------------------------------------------------------------------
    const [productSize, setProductSize] = useState(null);
    const [productQuantity, setProductQuantity] = useState(null);

    const [btnState, setBtnState] = useState(null);
    // ----------------------------------------------------------------------
    
    // ----------------------------------------------------------------------
    const [selectedCategories, setSelectedCategories] = useState([]);
    // ----------------------------------------------------------------------
    const [orderSummary, setOrderSummary] = useState({});
    const [orderSummaryStatus, setOrderSummaryStatus] = useState(false);



    // ----------------------------------------------------------------------
    const [currentSize, setCurrentSize] = useState({});
    function handleSizeChange(product, size) {
        setCurrentSize((preValues) => {
            return {
                ...preValues,
                [product._id] : size
            }
        })                         
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
    // ----------------------------------------------------------------------

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
    
// -------------------------------------------------------------------------------------------------
    useEffect(() => {
        setCartProducts(() => [...productsData.filter(e => e.isAddedToCart)])

        const dataInWishlist = productsData.filter(product => product.isAddedToWishlist);
        
        setIsInWishlist(() => [...dataInWishlist])
        // ------------------------------------------
        if (productsData && productsData.length > 0) {        
            setCurrentSize((preValues) => {
                const newSizes = {...preValues};
                productsData.forEach((product) => {
                    if (!newSizes[product._id]) {
                        newSizes[product._id] = "S";
                    }
                });
                return newSizes;
            }) 
        }
        // ------------------------------------------
        console.log(("productsData:", productsData))
    }, [productsData])


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


    const noOfUniqueProductsInCart = cartProducts.length;
    const noOfProductsInWishlist = wishlistProducts.length;

    const quanityOfProductsInCart = cartProducts.reduce((acc, curr) => {
        if (curr.isAddedToCart) {
            acc += curr.quantity;
        }
        return acc;
    }, 0);

// ---------------------------------------------------------------------------------------------------

    // localStorage.setItem

// ---------------------------------------------------------------------------------------------------
    return (
        <ProductContext.Provider value={{
            btnState,
            setBtnState, 
            address, 
            setAddresses, 
            productSize, 
            setProductSize, 
            productQuantity, 
            setProductQuantity, 
            loading, 
            error, 
            productsData, 
            setProductsData, 
            sizeValue, 
            setSizeValue,
            currentSize, 
            setCurrentSize,
            handleSizeChange,
            noOfUniqueProductsInCart, 
            quanityOfProductsInCart, 
            
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
            setOrderSummaryStatus
        }}>
            {children}
        </ProductContext.Provider>
    )
}

