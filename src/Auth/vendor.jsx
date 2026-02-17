import { useEffect, useState } from "react";
import axios from "../Apis/axiosConfig";
import { useNavigate } from "react-router-dom";

function Vendor() {
   const navigate = useNavigate();  
  const [vendors, setvendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadvendors();
  }, []);

  const loadvendors = async () => {
   
    try {
      const res = await axios.get("/vendor/all");
      setvendors(res.data);   // ✅ FIX 1
      // VERY IMPORTANT (because backend returns ResponseEntity inside ResponseEntity)
       
    } catch (error) {
      console.error("Error loading vendor", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ color: "white" }}>Loading vendor...</p>;
  }

  return (
    <div className="dashboard-main">
      <h1>Vendor</h1>

      <div className="vendor">
        <table>
          <thead>
            <tr>
             
              <th>Id</th>
              <th>Vendor Name</th>
              <th>Address</th>
              <th>Bank</th>
              <th>Contact</th>
              <th>GSTIN</th>
              <th>Payment Terms</th>
            </tr>
          </thead>

          <tbody>
  {vendors.length === 0 ? (
    <tr>
      <td colSpan="7">No vendor found</td>
    </tr>
  ) : (
    vendors.map((v) => (
      <tr key={v.id}>
         <td>{v.id}</td>
                <td>{v.vendorName}</td>
                <td>{v.address}</td>
                <td>{v.bankDetails}</td>
                <td>{v.contactNumber_email}</td>
                <td>{v.gstin_pan}</td>
                <td>{v.defaultPaymentTerms}</td>
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

export default Vendor;


