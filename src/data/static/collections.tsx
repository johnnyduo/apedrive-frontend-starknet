import CollectionCover1 from '@/assets/images/collection/grid/1.jpg';
import CollectionCover2 from '@/assets/images/collection/grid/2.jpg';
import CollectionCover3 from '@/assets/images/collection/grid/3.jpg';
import CollectionCover4 from '@/assets/images/collection/grid/4.jpg';
import CollectionCover5 from '@/assets/images/collection/grid/5.jpg';
import CollectionCover6 from '@/assets/images/collection/grid/6.jpg';
import CollectionCover7 from '@/assets/images/collection/grid/7.jpg';
import CollectionCover8 from '@/assets/images/collection/grid/8.jpg';
import User1 from '@/assets/images/apedrive_avatar.png';
import User2 from '@/assets/images/apedrive_avatar.png';
import User3 from '@/assets/images/avatar/3.png';
import User4 from '@/assets/images/avatar/1.png';
import User5 from '@/assets/images/avatar/6.png';
import CollectionImage1 from '@/assets/images/apedrive_avatar.png';
import CollectionImage2 from '@/assets/images/apedrive_avatar.png';
import CollectionImage3 from '@/assets/images/collection/collection-3.jpg';
import CollectionImage4 from '@/assets/images/collection/collection-4.jpg';
import CollectionImage5 from '@/assets/images/collection/collection-5.jpg';
import CollectionImage6 from '@/assets/images/collection/collection-6.jpg';
import Car1 from '@/assets/images/nft/rx7x.png';
import Car2 from '@/assets/images/nft/mitsux.png';


export const collections = [
  {
    id: 1,
    name: 'Collection ApeDrive',
    slug: '#',
    title: 'Mazda RX-7 Turbo',
    cover_image: Car1,
    number_of_artwork: 3,
    image: CollectionImage1,
    user: {
      avatar: User1,
      name: 'ApeDrive',
      slug: 'mazdarx7',
    },
  },
  {
    id: 2,
    name: 'Collection ApeDrive',
    slug: '#',
    title: 'Mitsubishi Lancer EVO',
    cover_image: Car2,
    number_of_artwork: 3,
    image: CollectionImage2,
    user: {
      avatar: User2,
      name: 'ApeDrive',
      slug: 'apedrive',
    },
  },
];
