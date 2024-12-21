// mui
import { Box, Container } from '@mui/material';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import ProductList from 'src/components/_main/products';

// api
import * as api from 'src/services';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

// export async function generateStaticParams() {
//   const { data } = await api.getSubCategorySlugs();
//   return data?.map((cat) => {
//     return {
//       subCategory: cat.slug,
//       category: cat.parentCategory.slug
//     };
//   });
// }

export async function generateMetadata(props) {
  const params = await props.params;
  const { data: response } = await api.getSubCategoryBySlug(params.subCategory);

  return {
    title: response.metaTitle,
    description: response.metaDescription,
    title: response.name,
    openGraph: {
      images: [response.cover.url]
    }
  };
}

export default async function Listing(props) {
  const params = await props.params;
  const { category, subCategory } = params;
  const { data: subCategoryData } = await api.getSubCategoryTitle(subCategory);

  return (
    <Box>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <HeaderBreadcrumbs
            heading={subCategoryData?.name}
            links={[
              {
                name: 'Home',
                href: '/'
              },
              {
                name: 'Products',
                href: '/products'
              },
              {
                name: subCategoryData?.parentCategory?.name,
                href: `/products/${category}`
              },
              {
                name: subCategoryData?.name
              }
            ]}
          />
          <ProductList subCategory={subCategoryData} />
        </Container>
      </Box>
    </Box>
  );
}
