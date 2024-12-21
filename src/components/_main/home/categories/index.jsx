// react
import React from 'react';
import NextLink from 'next/link';
// mui
import { Typography, Grid, Box, Stack, Paper, Button } from '@mui/material';
import { IoIosArrowForward } from 'react-icons/io';
// component
import CategoryCard from 'src/components/cards/category';
// api
import * as api from 'src/services';

export default async function Categories() {
  const { data } = await api.getHomeCategories();

  return (
    <Paper elevation={0}>
      <Stack
        direction={'column'}
        sx={{
          gap: 3,
          mt: 5
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          textAlign={{ xs: 'center', md: 'left' }}
          alignItems="center"
        >
          <Box>
            <Typography variant="h2" color="text.primary">
              Top Categories
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 6,
              display: { xs: 'none', md: 'flex' },
              minWidth: 130,
              px: 1
            }}
            endIcon={<IoIosArrowForward />}
            component={NextLink}
            href={`/categories`}
          >
            View More
          </Button>
        </Stack>

        <Box>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {data.map((inner) => (
              <React.Fragment key={Math.random()}>
                <Grid item lg={2} md={3} sm={4} xs={4}>
                  <CategoryCard category={inner} isLoading={false} />
                </Grid>
              </React.Fragment>
            ))}
            {!Boolean(data.length) && (
              <Typography variant="h3" color="error.main" textAlign="center">
                Categories not found
              </Typography>
            )}
          </Grid>
          <Button
            variant="text"
            color="primary"
            size="small"
            sx={{
              borderRadius: 6,
              mx: 'auto',
              mt: 3,
              display: { md: 'none', xs: 'flex' },
              maxWidth: '120px'
            }}
            endIcon={<IoIosArrowForward />}
            component={NextLink}
            href={`/categories`}
          >
            View More
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
