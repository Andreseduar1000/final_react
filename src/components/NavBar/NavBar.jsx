import { Link } from "react-router-dom";
import { CartWidget } from "../CartWidget/CartWidget";
import { useEffect, useState } from "react";
import { getProducts } from "../../asyncMock";

export const NavBar = () => {
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    getProducts()
      .then((products) => {
        const categories = new Set(products.map((product) => product.category));
        setUniqueCategories([...categories]);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <nav className="d-flex justify-content-around mt-2">
      <Link to={"/"}>
        <h4>Footwear World</h4>
      </Link>
      <div>
        <Link to={"/"}>
          <button className="btn btn-outline-dark mx-2">Home</button>
        </Link>
        {uniqueCategories.map((category) => (
          <Link key={category} to={`/category/${category}`}>
            <button className="btn btn-outline-dark mx-2">{category}</button>
          </Link>
        ))}
        <Link to={"/contact"}>
          <button className="btn btn-outline-dark mx-2">Contacto</button>
        </Link>
      </div>
      <CartWidget />
    </nav>
  );
};
