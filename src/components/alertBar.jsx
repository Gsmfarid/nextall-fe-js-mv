'use client';
import * as React from 'react';
import Link from 'next/link';
// mui
import { Box, Toolbar, Stack, Button, Typography } from '@mui/material';
import { FiAlertTriangle } from 'react-icons/fi';

export default function Alertbar() {
  const [initial, setInitial] = React.useState(false);
  React.useEffect(() => {
    setInitial(window === window.top);
  }, [initial]);
  return (
    <>
      {!initial && (
        <Toolbar
          sx={{
            position: 'fixed',
            p: 1,
            bottom: { md: 0, xs: 'auto' },
            top: { md: 'auto', xs: 0 },
            left: 0,
            width: '100%',
            zIndex: 9999,
            bgcolor: '#000000db',
            backdropFilter: ' blur(5px)'
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            justifyContent="space-between"
            width="100%"
            sx={{
              flexDirection: { md: 'row', xs: 'column' }
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                flexDirection: { md: 'row', xs: 'column' }
              }}
            >
              <Box
                sx={{
                  height: 36,
                  width: 36,
                  borderRadius: 2,
                  bgcolor: 'rgb(255 70 33 / 37%)',
                  color: 'error.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FiAlertTriangle size={20} />
              </Box>
              <Typography
                variant="subtitle1"
                color="error.main"
                sx={{
                  textAlign: { md: 'left', xs: 'center' }
                }}
              >
                Please click the button for a better demo experience, as authentication may be affected.
              </Typography>
            </Stack>
            <Button
              component={Link}
              target="_blank"
              href="https://nextall.vercel.app"
              variant="contained"
              color="primary"
              size="small"
              sx={{
                minWidth: 150
              }}
            >
              View Demo
            </Button>
          </Stack>
        </Toolbar>
      )}
    </>
  );
}
