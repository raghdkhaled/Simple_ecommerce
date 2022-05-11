import Product from "./Product";
import { useEffect, useState } from "react";
import { getProducts } from "../../../services/products";
import SearchBar from "material-ui-search-bar";
import Fuse from "fuse.js";
import { useSessionStorage } from "../../common/Hooks/useStorage";
import { paginate } from "./../../../utils/paginate";

const Products = () => {
  const [products, setProducts] = useSessionStorage("products", []);
  const [searchQuery, setSearchQuery] = useState("");
  const [productsToRender, setProductsToRender] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getPagedData = () => {
    const products = paginate(productsToRender, currentPage, pageSize);
    return products;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getProducts();
      setProducts(data);
      setProductsToRender(data);
    };
    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      //if no query is entered render all customers
      setProductsToRender(products);
      return;
    }

    //construct fuse array to be able to fuzzy search
    const fuse = new Fuse(products, {
      shouldSort: true,
      keys: ["name"],
    });

    const result = fuse.search(query);
    const newProducts = result.map((res) => res.item);
    setProductsToRender(newProducts);
  };

  return (
    <div className="col-12 align-items-center d-flex flex-column justify-content-between flex-grow-1  ">
      <div className="col-12 align-items-center d-flex flex-column">
        <div className="col-12 col-md-8 d-flex flex-column align-items-center ">
          <SearchBar
            className="col-12 my-3 shadow "
            value={searchQuery}
            onChange={(searchVal) => handleSearch(searchVal)}
            onCancelSearch={() => handleSearch("")}
          />
        </div>
        <div className="row justify-content-center">
          {getPagedData().map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>

      <nav className="">
        <ul class="pagination">
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => {
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
            >
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>

          {[...Array(Math.ceil(productsToRender.length / pageSize)).keys()].map(
            (item, index) => (
              <li
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
                }`}
                onClick={() => {
                  setCurrentPage(index + 1);
                }}
              >
                <a class="page-link" href="#">
                  {index + 1}
                </a>
              </li>
            )
          )}

          <li class="page-item">
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              onClick={() => {
                if (currentPage < Math.ceil(productsToRender.length / pageSize))
                  setCurrentPage(currentPage + 1);
              }}
            >
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Products;
