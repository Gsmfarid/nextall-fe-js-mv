// mui
import { Box, Container } from '@mui/material';

// components
import ShopDetailCover from 'src/components/_admin/shops/shopDetailCover';
import ProductList from 'src/components/_main/products';

// api
import * as api from 'src/services';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function generateStaticParams() {
  const { data } = await api.getCampaignSlugs();
  const mapped = data?.map((campaign) => {
    return {
      slug: campaign.slug
    };
  });
  return mapped;
}

export async function generateMetadata(props) {
  const params = await props.params;
  const { data: response } = await api.getCampaignBySlug(params.slug);

  return {
    title: response.metaTitle,
    description: response.metaDescription,
    title: response.title,
    openGraph: {
      images: [response.cover.url]
    }
  };
}
export default async function Listing(props) {
  const params = await props.params;
  const { slug } = params;
  const { data: campaign } = await api.getCampaignTitle(slug);

  return (
    <Box>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Box mt={3}>
            <ShopDetailCover page={'campaigns'} isUser data={campaign} isLoading={false} />
          </Box>

          <ProductList campaign={campaign} fetchFilters={'getFiltersByShop'} />
        </Container>
      </Box>
    </Box>
  );
}
