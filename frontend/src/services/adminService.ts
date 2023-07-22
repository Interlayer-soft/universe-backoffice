import axios from "axios";

const apiUrl =  import.meta.env.REACT_APP_API_BASE_URL;


interface User {
    id: string;
    username: string;
    password: string;
  }

export async function getAdmins(): Promise<User[]> {
    const token = getCookie("token");
    console.log(token)
    if (token) {
      try {
        const response = await axios.get<User[]>(`${apiUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        // Handle error, e.g., token expired or invalid
      }
    }
    return [];
}


export async function getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get<User>(`${apiUrl}/user`, {
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
  

  function getCookie(name: string): string | null {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }