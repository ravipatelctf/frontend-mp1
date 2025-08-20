
import useProductContext from "../contexts/ProductContext";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

export default function Products() {

    const { loading, error, productsData, searchedProducts} = useProductContext();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [productRating, setProductRating] = useState(null);
    const [sortBy, setSortBy] = useState(null);

    if (loading) {
        return <p className="text-center">Loading...</p>
    }

    if (error) {
        return <p className="text-center">Error occurred...</p>
    }

    function handleCategory(event) {
        const {checked, value} = event.target;
        if (checked) {
            setSelectedCategories((preValues) => [...preValues, value]);
        } else {
            setSelectedCategories((preValues) => preValues.filter(pv => pv !== value))
        }
    }

    function handleRating(event) {
        const ratingValue = parseInt(event.target.value);
        setProductRating(ratingValue)
    }

    let filteredProducts = productsData.filter((product) => {
        const categoryCondition = selectedCategories.length === 0 || selectedCategories.includes(product.category); 
        const ratingCondition = productRating === null || (product.rating >= productRating); ;
        return categoryCondition && ratingCondition;
    })

    // applying sort by price
    if (sortBy === "lowToHigh") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price); // if val1 - val2 => -ve , order reverses
    } else if (sortBy === "highToLow") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    function handleClearBtn(event) {
        event.preventDefault();

        setSelectedCategories([]);
        setProductRating(null);
        setSortBy(null);
        
        toast.success("Filters were cleared successfully.");
    }
    
    return (
        <main className="container py-4"> 
            <div className="row">
                <div className="col-md-3">
                    <form onSubmit={handleClearBtn}>
                    <p className="d-flex justify-content-between p-1">
                        <span className="fw-bold fs-5">
                            Filters
                        </span>
                        <button type="submit" className="fs-6 btn btn-outline-danger">
                            Clear
                        </button>
                    </p>
                    <div className="mb-4">
                        <p className="fw-bold mb-2">Category</p>
                        <label htmlFor="Men">
                            <input type="checkbox" checked={selectedCategories.includes("Men") ? true : false} name="Men" id="Men" value="Men" className="me-1" onChange={(event) => handleCategory(event)} />
                            Men's clothing
                        </label>
                        <br />
                        <label htmlFor="Men">
                            <input type="checkbox" checked={selectedCategories.includes("Women") ? true : false} name="Men" id="Men" value="Women" className="me-1" onChange={(event) => handleCategory(event)} />
                            Women's clothing
                        </label>
                        <br />
                        <label htmlFor="Men">
                            <input type="checkbox" checked={selectedCategories.includes("Kids") ? true : false} name="Men" id="Men" value="Kids" className="me-1" onChange={(event) => handleCategory(event)} />
                            Kids' clothing
                        </label>
                    </div>
                    <div  className="mb-4">
                        <label htmlFor="rating" className="form-label fw-bold">Rating</label>
                        <input
                            type="range"
                            id="rating"
                            className="form-range"
                            min="0"
                            max="5"
                            value={productRating ?? 0}
                            step="1" 
                            onChange={handleRating}/>
                    
                        <div className="d-flex justify-content-between">
                            {[0,1,2,3,4,5].map(num => <small key={num}>{num}★</small>)}
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="fw-bold">Sort by</p>
                        <label htmlFor="lowToHigh">
                            <input 
                                type="radio" 
                                name="sort" 
                                className="me-1" 
                                id="lowToHigh"
                                value="lowToHigh"
                                checked={sortBy === "lowToHigh"}
                                onChange={(event) => setSortBy(event.target.value)}
                            />
                            Price - Low to High
                        </label>
                        <br />
                        <label htmlFor="highToLow">
                            <input 
                                type="radio" 
                                name="sort" 
                                className="me-1" 
                                id="highToLow"
                                value="highToLow"
                                checked={sortBy === "highToLow"}
                                onChange={(event) => setSortBy(event.target.value)}
                            />
                            Price - High to Low
                        </label>
                    </div>
                    </form>
                </div>
                <div className="col-md-9"> 
                    <div className="row">
                        <p>
                            <span className="fw-bold fs-5">Showing All Products</span>
                            <span className="ms-2">( showing {filteredProducts.length} products )</span>
                        </p>
                        {(searchedProducts.length > 0 ? searchedProducts : filteredProducts).map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}