'use client';
import React from 'react';
import Image from 'src/components/blurImage';
// mui
import { Typography, Box, Stack, Card, Link, Skeleton } from '@mui/material';
// // api
import * as api from 'src/services';
import { useQuery } from 'react-query';
// Marquee
import Marquee from 'react-fast-marquee';
import NextLink from 'src/utils/link';

export default function Brands() {
  const setting = {
    gradient: false
  };
  const { data, isLoading } = useQuery(['get-brands-products'], () => api.getHomeBrands());
  console.log(data?.data, 'brands');
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

      {isLoading ? (
        <Skeleton variant="rounded" width={80} height={80} />
      ) : Boolean(data?.data?.length) ? (
        <Stack direction="row" alignItems="center" justifyContent="center" flexWrap>
          {(isLoading ? Array.from(new Array(6)) : data?.data).map((v) => (
            <Card
              key={v._id}
              className="slider-main"
              sx={{
                mx: 2.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                // width: '80px',
                height: '80px',
                borderRadius: '10px',
                position: 'relative',
                mb: 3,
                img: {
                  borderRadius: '8px',
                  objectFit: 'contain'
                }
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Image
                  src={v.logo.url}
                  alt="logo"
                  width={70}
                  height={70}
                  draggable="false"
                  placeholder="blur"
                  blurDataURL={v?.logo?.blurDataURL}
                />
                <Stack>
                  <Typography
                    variant="subtitle1"
                    component={NextLink}
                    href={`/products?brand=${v.slug}`}
                    color="text.primary"
                  >
                    {v.name}
                  </Typography>
                  <Typography variant="body1">3 Products</Typography>
                </Stack>
              </Stack>
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography variant="h3" color="error.main" textAlign="center">
          Brands not found
        </Typography>
      )}
    </Box>
  );
}
