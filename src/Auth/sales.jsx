import { useEffect, useState } from "react";
import axios from "../Apis/axiosConfig";
import { useNavigate } from "react-router-dom";

function sales() {
   const navigate = useNavigate();  
  const [sales, setsales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadsales();
  }, []);

  const loadsales = async () => {
    try {
      const res = await axios.get("/sale/all");
      setsales(res.data);
    } catch (error) {
      console.error("Error loading sale", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ color: "white" }}>Loading sale...</p>;
  }

  return (
    <div className="dashboard-main">
      <h1>Sale</h1>

      <div className="sale">
        <table>
          <thead>
            <tr>
              <th> SalesId</th>
              <th>Date</th>
             <th>Quantity</th>
             <th>Selling Price</th>
             <th>ProductId</th>
            </tr>
          </thead>

          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan="5">No sales found</td>
              </tr>
            ) : (
              sales.map((s) => (
                <tr key={s.salesId}>
                <td>{s.salesId}</td>
                 <td>{s.date}</td>
                 <td>{s.quantity}</td>
                 <td>{s.sellingPrice}</td>
                 <td>{s.product.productId}</td>
                  
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

export default sales;

