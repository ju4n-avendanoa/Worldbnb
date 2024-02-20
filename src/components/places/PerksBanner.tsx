import { perksLogos } from "@/utils/perksLogos";
import ImageWithFallback from "../ImageWithFallback";

type Props = {
  perk: string;
};

function PerksBanner({ perk }: Props) {
  return (
    <div
      className="flex items-center justify-center border-2 rounded-lg border-sky-700 bg-sky-50 w-8 h-8 lg:w-10 lg:h-10"
      title={perk}
    >
      <ImageWithFallback
        src={perksLogos[perk].link}
        fallbackSrc={perksLogos.default.link}
        alt={perk}
        height={50}
        width={50}
        className="w-5 h-auto lg:w-7"
      />
    </div>
  );
}

export default PerksBanner;
