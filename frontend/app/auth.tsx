"use client";

import usePocketBase from "@/pocketbase/pb-hook";
import Record from "pocketbase";
import { useEffect, useState } from "react";

interface UserModel extends Record {
  avatar: number;
  email: string;
  username: string;
}

function AuthShowcase() {
  const { pb } = usePocketBase();
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    setUser(pb.authStore.model as UserModel);
  }, []);

  if (pb.authStore.isValid && user) {
    return (
      <>
        <Logout />
        <h1>Hi, {user.username}</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </>
    );
  } else {
    return <Login />;
  }
}

function Login() {
  const { pb } = usePocketBase();

  const loginHandler = () => {
    (async () => {
      await pb
        .collection("users")
        .authWithOAuth2({ provider: "discord" })
        .catch((err) => {
          console.error(err);
        });
    })();
  };

  return (
    <div>
      <button onClick={loginHandler}>login</button>
    </div>
  );
}

function Logout() {
  const { pb } = usePocketBase();

  const logoutHandler = () => {
    pb.authStore.clear();
  };

  return (
    <div>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
}

export default AuthShowcase;
