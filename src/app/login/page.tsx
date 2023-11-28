"use client";

import Link from "next/link";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="">
      <div className="">
        <h1 className="">Login</h1>
        <form className="">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="your@email.com"
            className="forms"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            className="forms"
            required
          />
          <button>Login</button>
        </form>
        <p className="">
          Don&apos;t have an account yet?{" "}
          <Link href={"/register"} className="text-blue-400 ml-2">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
