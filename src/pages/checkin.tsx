import { NextSeo } from 'next-seo';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { NextPageWithLayout } from '@/types';
import Search from '@/components/search/search';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import RetroSearch from '@/components/search/retro-search';
import RootLayout from '@/layouts/_root-layout';
import Checkin from '@/components/search/checkin';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const CheckinPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { layout } = useLayout();

  // render retro layout
  if (layout === LAYOUT_OPTIONS.RETRO) {
    return (
      <>
        <NextSeo title="Local Places Check-In" description="ApeDrive" />
        <RetroSearch />
      </>
    );
  }

  // render default create NFT component
  return (
    <>
      <NextSeo title="Local Places Check-In" description="ApeDrive" />

      <Checkin />
    </>
  );
};

CheckinPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default CheckinPage;
