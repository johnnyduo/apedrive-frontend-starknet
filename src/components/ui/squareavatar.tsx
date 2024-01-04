import cn from 'classnames';
import Image from '@/components/ui/image';
import { StaticImageData } from 'next/image';

interface AvatarProps {
  image: StaticImageData;
  alt: string;
  className?: string;
  size?: SizeNames;
  width?: number;
  height?: number;
}

type SizeNames = 'xl2' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

const sizes: Record<SizeNames, string[]> = {
  xl2: [
    'border-white border-[5px] h-35 w-35 sm:h-32 sm:w-32 md:h-56 md:w-56 3xl:h-70 3xl:w-70 3xl:border-11 shadow-large',
  ],
  xl: [
    'border-white border-[5px] h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 3xl:h-40 3xl:w-40 3xl:border-8 shadow-large',
  ],
  lg: ['border-white border-4 h-20 w-20 lg:h-24 lg:w-24'],
  md: ['border-white h-10 w-10 drop-shadow-main border-3'],
  sm: ['border-white h-8 w-8 border-2 shadow-card'],
  xs: ['h-6 w-6'],
};

function SquareAvatar({
  image,
  alt,
  className,
  size = 'md',
  width,
  height,
}: AvatarProps) {
  const sizeClassNames = sizes[size];

  return (
    <figure
      className={cn(
        'relative shrink-0 overflow-hidden',
        className,
        sizeClassNames
      )}
    >
      <Image
        src={image}
        alt={alt}
        width={width}
        height={height}
        priority
        placeholder="blur"
        className="rounded-[6px]"
      />
    </figure>
  );
}

export default SquareAvatar;
