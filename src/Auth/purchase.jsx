import { useEffect, useState } from "react";
import axios from "../Apis/axiosConfig";
import { useNavigate } from "react-router-dom";

function purchase() {
   const navigate = useNavigate();  
  const [purchase, setpurchase] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadpurchase();
  }, []);

  const loadpurchase = async () => {
    try {
      const res = await axios.get("/purchase/all");
      setpurchase(res.data);
    } catch (error) {
      console.error("Error loading purchase", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ color: "white" }}>Loading purchase...</p>;
  }

  return (
    <div className="dashboard-main">
      <h1>Purchase</h1>

      <div className="purchase">
        <table>
          <thead>
            <tr>
                <th>PurchaseID</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Vendor</th>
                <th>ProductID</th>
            </tr>
          </thead>

          <tbody>
            {purchase.length === 0 ? (
              <tr>
                <td colSpan="5">No purchase found</td>
              </tr>
            ) : (
              purchase.map((pv) => (
                <tr key={pv.purchaseId}>
                  <td>{pv.purchaseId}</td>
                    <td>{pv.date}</td>
                    <td>{pv.quantity}</td>
                    <td>{pv.vendor}</td>
                    <td>{pv.product?.productId}</td>
                  
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

export default purchase;
