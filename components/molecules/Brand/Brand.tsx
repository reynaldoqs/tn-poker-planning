import Image from "next/image";

export const Brand: React.FC = () => (
  <div className="flex items-center justify-center gap-6">
    <Image
      src="/assets/PPPP_logo.png"
      alt="poker planning logo"
      width="48px"
      height="52px"
    />
    <div>
      <h2 className="text-2xl font-bold leading-5 text-txtMedium">
        Poker Planning
      </h2>
      <h3 className="text-md text-txtMedium">Application</h3>
    </div>
  </div>
);
