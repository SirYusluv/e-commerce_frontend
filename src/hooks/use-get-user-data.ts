import { ACCESS_TOKEN, API_URL, HTTP_STATUS, IUser } from "@/util/data";
import { useEffect, useState } from "react";

export default function useGetUserData() {
  const [user, setUser] = useState<IUser | null | { [key: string]: string }>(
    {}
  );

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setUser(null);
      return;
    }

    const response = await fetch(`${API_URL}/user/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setUser(null);
      return;
    }

    const result = await response.json();

    if (result.status != HTTP_STATUS.ok || !result.user?._id) {
      setUser(null);
      return;
    }

    setUser(result.user as IUser);
  }

  return user;
}
