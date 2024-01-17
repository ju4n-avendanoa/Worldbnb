import { useErrorStore } from "@/store/errorStore";
import { signIn } from "next-auth/react";
import Image from "next/image";

function ProviderButton({
  provider,
  imagesrc,
}: {
  provider: string;
  imagesrc: string;
}) {
  const formatedProvider = provider.toLowerCase();

  const { setError, setErrorMessage } = useErrorStore();

  const handleLogin = async () => {
    try {
      setError(false);
      const res = await signIn(formatedProvider, {
        callbackUrl: "/",
      });

      if (res?.ok) {
        setError(true);
        setErrorMessage(res.error!);
        return;
      }
    } catch (error: any) {
      console.error({ message: error });
    }
  };

  return (
    <button
      className="flex items-center gap-4 px-4 py-4 border rounded-lg hover:bg-gray-200"
      onClick={() => handleLogin()}
    >
      <Image src={imagesrc} alt="logo" width={20} height={20} />
      <span>Continue with {provider}</span>
    </button>
  );
}

export default ProviderButton;
