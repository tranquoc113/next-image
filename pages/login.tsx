import React from "react";
// import { LoginForm } from '@/components/auth'
import { useAuth } from "@/hooks";
import { LoginPayload } from "@/models";
import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth({
    revalidateOnMount: false, // login không gọi api
  });

  async function handleLoginSubmit(payload: LoginPayload) {
    try {
      await login(payload);
      router.push("/about");
    } catch (error) {
      console.log("failed to login", error);
    }
  }
  return (
    <div>
      Login------------------ Page login
      <div>
        <Button
          onClick={() => {
            handleLoginSubmit(
				{
					username:"test1",
					password:"123123"
				}
			)
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
