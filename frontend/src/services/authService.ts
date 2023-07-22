import axios from "axios";

const apiUrl = import.meta.env.REACT_APP_API_BASE_URL;

// interface LoginSend {
//   username: string;
//   password: string;
// }

interface User {
  id: string;
  username: string;
  password: string;
}

export async function login(
  username: string,
  password: string
){
  try {
    const response = await axios.post(apiUrl + "/auth/login", {
      username,
      password,
    }, {
      withCredentials: true
    });
    
    console.log(username,password)
    const setCookieHeader = response.headers["set-cookie"];
    
    console.log(Object.keys(response.headers))
    if (setCookieHeader && Array.isArray(setCookieHeader)) {
      const token = extractTokenFromSetCookie(setCookieHeader[0]);
      if (token) {
        // Store the token in the browser's local storage or cookie
        console.log(token)
        // localStorage.setItem("token", token);
        return true;
      }
    }
    return '123'
    throw new Error("Login failed. Token not found in the response.");
  } catch (error) {
    console.log(error);
    throw new Error("Login failed. Please check your credentials.");
  }
}

export function logout(): void {
  // Remove the token from the browser's local storage or cookie
  localStorage.removeItem("token");
}

export async function getCurrentUser(): Promise<User | null> {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await axios.get(apiUrl + "/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      // Handle error, e.g., token expired or invalid
    }
  }
  return null;
}

function extractTokenFromSetCookie(setCookieHeader: string): string | null {
  const tokenMatch = setCookieHeader.match(/token=([^;]+)/);
  return tokenMatch ? tokenMatch[1] : null;
}
