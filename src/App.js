import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "./App.css";

function App() {
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const callApi = () => {
    axios
      .get("http://localhost:5000/")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const callProtecedApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      const response = await axios.get(`http://localhost:5000/private`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <h1>Auth0 Authentication</h1>
      <ul>
        <li>
          <button onClick={loginWithPopup}>login_With_Popup</button>
        </li>
        <li>
          <button onClick={loginWithRedirect}>login_With_Redirect</button>
        </li>
        <li>
          <button onClick={logout}>logout</button>
        </li>
      </ul>

      <h3>{isAuthenticated ? "User is Logged_In" : "Not logged_In"}</h3>

      <ul>
        <li>
          <button onClick={callApi}>Call API</button>
        </li>
        <li>
          <button onClick={callProtecedApi}>Call Protected API route</button>
        </li>
      </ul>

      {isAuthenticated && (
        <pre style={{ textAlign: "start" }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
