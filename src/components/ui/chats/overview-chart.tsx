import cn from 'classnames';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import SquareAvatar from '@/components/ui/squareavatar';
import AuthorImage from '@/assets/images/nft/rx7x.png';
import Image from '@/components/ui/image';

const data = [
  {
    name: 'Page A',
    uv: 1200,
    pv: 800,
  },
  {
    name: 'Page B',
    uv: 2600,
    pv: 100,
  },
  {
    name: 'Page C',
    uv: 1900,
    pv: 1600,
  },
  {
    name: 'Page D',
    uv: 2280,
    pv: 1508,
  },
  {
    name: 'Page E',
    uv: 1290,
    pv: 3500,
  },
  {
    name: 'Page F',
    uv: 1690,
    pv: 3000,
  },
  {
    name: 'Page G',
    uv: 2590,
    pv: 4500,
  },
];

interface Props {
  chartWrapperClass?: string;
}

export default function OverviewChart({ chartWrapperClass }: Props) {
  const { layout } = useLayout();

  return (
    <div
      className={cn('bg-light text-gray rounded-lg p-6 shadow-card sm:p-8', {
        'w-full lg:w-[49%]': layout === LAYOUT_OPTIONS.RETRO,
      })}
    >
      <div className={cn('h-60 w-full', chartWrapperClass)}>
        <ResponsiveContainer width="100%" height="100%">
          {/* <LineChart data={data}>
            <Line
              type="natural"
              dataKey="pv"
              stroke="#1E40AF"
              strokeWidth={4}
              dot={false}
            />
            <Line
              type="natural"
              dataKey="uv"
              stroke="#374151"
              strokeWidth={4}
              dot={false}
            />
          </LineChart> */}
          <Image
            src={AuthorImage}
            alt="ApeDrive Key3"
            className="mx-auto mb-6 w-3/4 rounded"
            // size="xl2"
          />
        </ResponsiveContainer>
      </div>
      <h3 className="text-gray mt-10 text-center text-xl font-medium tracking-tighter sm:text-3xl">
        Mazda RX-7
      </h3>
      <p className="mt-2 mb-1 text-center text-xs font-medium uppercase text-gray-400 sm:text-sm">
        Present Automobile (Using)
      </p>
    </div>
  );
}
