import { useEffect, useState } from "react";
import axios from "../Apis/axiosConfig";
import { useNavigate } from "react-router-dom";

function Products() {
   const navigate = useNavigate();  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get("/inventory/products");
      console.log("API DATA 👉", res.data.body);


      // VERY IMPORTANT (because backend returns ResponseEntity inside ResponseEntity)
      const data = res.data?.body || [];

      setProducts(data);
    } catch (error) {
      console.error("Error loading products", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ color: "white" }}>Loading products...</p>;
  }

  return (
    <div className="dashboard-main">
      <h1>Products</h1>

      <div className="card glass">
        <table>
          <thead>
            <tr>
              <th>product_id</th>
              <th>product_name</th>
              <th>product_code</th>
              <th>Unit</th>
              <th>product_price</th>
              <th>product_quantity</th>
              <th>total_price</th>
              
            </tr>
          </thead>

          {/* <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7">No products found</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.productId}>
                  <td>{p.productId}</td>
                  <td>{p.productCode}</td>
                  <td>{p.productName}</td>
                  <td>₹{p.productPrice}</td>
                  <td>{p.productStock}</td>
                  <td>₹{p.totalPrice}</td>
                  <td>{p.unit}</td>
                </tr>
              ))
            )}
          </tbody> */}
          <tbody>
  {products.length === 0 ? (
    <tr>
      <td colSpan="7">No products found</td>
    </tr>
  ) : (
    products.map((p) => (
      <tr key={p.productId}>
        <td>{p.productId}</td>
        <td>{p.productName}</td>
        <td>{p.productCode}</td>
        <td>{p.unit}</td>
        <td>₹{p.productPrice}</td>
        <td>{p.productStock}</td>
        <td>₹{p.totalPrice}</td>
      </tr>
    ))
  )}
</tbody>

        </table>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h1></h1>

  <button
    onClick={() => navigate("/dashboard")}
    style={{
      padding: "8px 14px",
      backgroundColor: "#ff4d4f",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer"
    }}
  >
    ← Back
  </button>
</div>

      </div>
    </div>
  );
}

export default Products;
