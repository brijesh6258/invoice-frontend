import { useEffect, useState } from "react";
import axios from "../Apis/axiosConfig";
import { useNavigate } from "react-router-dom";

function stock() {
   const navigate = useNavigate();  
  const [stock, setstock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadstock();
  }, []);

  const loadstock = async () => {
    try {
      const res = await axios.get("/stock/all");
      setstock(res.data);
    } catch (error) {
      console.error("Error loading stock", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ color: "white" }}>Loading stock...</p>;
  }

  return (
    <div className="dashboard-main">
      <h1>Stock</h1>

      <div className="stock">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Opening Stock</th>
              <th>Purchase Quantity</th>
              <th>Sold Quantity</th>
              <th>Closing Quantity</th>
            </tr>
          </thead>

          <tbody>
            {stock.length === 0 ? (
              <tr>
                <td colSpan="5">No stock found</td>
              </tr>
            ) : (
              stock.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                    <td>{s.openingStock}</td>
                    <td>{s.purchaseQuantity}</td>
                    <td>{s.soldQuantity}</td>
                    <td>{s.closingStock}</td>
                  
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

export default stock;
