import Image from 'next/image';
import Logo from '~/public/assets/PPPP_logo.png';

export const Brand: React.FC = () => (
  <div className="flex items-center justify-center gap-6">
    <Image
      src={Logo}
      placeholder="blur"
      alt="poker planning logo"
      className="w-12"
    />
    <div>
      <h2 className="text-2xl font-bold leading-5 text-txtMedium">
        Poker Planning
      </h2>
      <h3 className="text-md text-txtMedium">Application</h3>
    </div>
  </div>
);
