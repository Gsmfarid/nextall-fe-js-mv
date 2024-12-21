import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next-nprogress-bar';
// components
import Image from 'src/components/blurImage';
// mui
import { Typography, Box, Stack, Card, Grid, CardActionArea } from '@mui/material';
// // api
import * as api from 'src/services';

export default async function Brands() {
  // const { push } = useRouter();
  const { data } = await api.getHomeBrands();
  return (
    <Box
      sx={{
        my: 6,
        display: { md: 'block', xs: 'none' }
      }}
    >
      <Typography variant="h2" color="text.primary" textAlign="center">
        Brands
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        className="description"
        sx={{
          textTransform: 'capitalize',
          mt: 1,
          mb: 5
        }}
      >
        Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
      </Typography>

      {Boolean(data?.length) ? (
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          {data.map((v) => (
            <Grid key={v._id} item xs={6} sm={3} md={2}>
              <Card
                className="slider-main"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  position: 'relative',
                  mb: 3,
                  img: {
                    borderRadius: '8px',
                    objectFit: 'contain'
                  }
                }}
              >
                <CardActionArea component={Link} href={`/products?brand=${v.slug}`} sx={{ p: 1, pr: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Image src={v.logo.url} alt="logo" width={70} height={70} draggable="false" objectFit="cover" />
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary" noWrap>
                        {v.name}
                      </Typography>
                      <Typography variant="body1" noWrap>
                        {v.totalProducts + ' ' + (v.totalProducts <= 1 ? 'Product' : 'Products')}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h3" color="error.main" textAlign="center">
          Brands not found
        </Typography>
      )}
    </Box>
  );
}
