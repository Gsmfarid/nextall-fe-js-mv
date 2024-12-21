// mui
import { Container } from '@mui/material'; // Importing Container component from MUI (Material-UI) library.

// components
import Hero from 'src/components/_main/home/hero'; // Importing the Hero component.
import WhyUs from 'src/components/_main/home/whyUs'; // Importing the WhyUs component.
import TopBanners from 'src/components/_main/home/topBanners'; // Importing the TopBanners component.
import Categories from 'src/components/_main/home/categories'; // Importing the TopBanners component.
import BestSellingProducs from 'src/components/_main/home/bestSelling'; // Importing the TopBanners component.
import Banner from 'src/components/_main/home/banner'; // Importing the TopBanners component.
import Brands from 'src/components/_main/home/brands'; // Importing the TopBanners component.
import TopCollection from 'src/components/_main/home/top'; // Importing the TopBanners component.
import Shops from 'src/components/_main/home/shop'; // Importing the TopBanners component.
import Campaigns from 'src/components/_main/home/campaign'; // Importing the TopBanners component.
import Testimonials from 'src/components/_main/home/testimonials'; // Importing the TopBanners component.
import FeaturedProducts from 'src/components/_main/home/featured'; // Importing the TopBanners component.
import SubscriptionModal from 'src/components/_main/home/subscription';

export const dynamic = 'force-dynamic';
export const revalidate = 60;
export default function IndexPage() {
  return (
    <>
      <Container maxWidth="xl">
        <Hero />
      </Container>
      <TopBanners />
      <Container maxWidth="xl">
        <WhyUs />
        <Categories />
        <BestSellingProducs />
        <Campaigns />
      </Container>
      <Banner />
      <Container maxWidth="xl">
        <TopCollection />
        <Shops />
        <FeaturedProducts />
      </Container>
      <Testimonials />
      <Container maxWidth="xl">
        <Brands />
      </Container>

      <SubscriptionModal />
    </>
  );
}
