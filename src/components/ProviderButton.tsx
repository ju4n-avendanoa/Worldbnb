import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Image from "next/image";

function ProviderButton({
  provider,
  imagesrc,
}: {
  provider: string;
  imagesrc: string;
}) {
  const formatedProvider = provider.toLowerCase();

  const handleLogin = async () => {
    try {
      const res = await signIn(formatedProvider, {
        callbackUrl: "/",
      });

      if (res?.ok) {
        toast.error(res.error!);
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
