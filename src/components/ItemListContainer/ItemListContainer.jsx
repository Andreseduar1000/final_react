import { useEffect, useState } from "react";
import { getProducts } from "../../asyncMock";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";

export const ItemListContainer = ({ greeting }) => {
  const { category} = useParams();

  const [products, setProducts] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((resp) => {
        if (category) {
          console.log(products)
          const productsFilterByCategory = resp.filter(
            (product) => product.category === category
          );
        setProducts(productsFilterByCategory);
        
          
        setIsLoading(false);
        
        } else {
          
          setProducts(resp);
        setIsLoading(false);
          
        }
      })
      .catch((error) => console.log(error));
  }, [category]); 


  return (
    <>
      <div> {greeting} </div>
      {}
      { isLoading ? <h2>Cargando productos ..</h2> : <ItemList products={products} /> }

    </>
  );
};
