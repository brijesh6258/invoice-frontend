// function Login() {
//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Invoice Login</h1>
//       <p>Frontend is now wired correctly.</p>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import axios from "../Apis/axiosConfig";



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful");
    // } catch (err) {
    //   alert("Invalid credentials");
    // }

    }   catch (err) {
  console.log("FULL ERROR:", err);
  console.log("BACKEND RESPONSE:", err.response);

  alert(
    err.response?.data?.message || 
    "Login failed (no message from backend)"
  );
}
}
  

  return (
    <div style={{ padding: "40px" }}>
      <h1>Invoice Login</h1>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
