import { tokenInfo } from "@/utils/verifyToken";
import React from "react";

type Props = {
  token: string;
  userId: string;
};

async function VerifyingCard({ token, userId }: Props) {
  const message = await tokenInfo(token, userId);
  return (
    <div>
      <p className="text-center p-4">
        {message.error ? message.error : message.message}
      </p>
    </div>
  );
}

export default VerifyingCard;
