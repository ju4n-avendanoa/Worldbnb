import { tokenInfo } from "@/utils/verifyToken";

async function VerifyToken({
  searchParams,
}: {
  searchParams: { userId: string; token: string };
}) {
  const message = await tokenInfo(searchParams.token, searchParams.userId);
  console.log(message);
  return (
    <div>
      {message.error ? message.error : null}
      {message.message ? message.message : null}
    </div>
  );
}

export default VerifyToken;
