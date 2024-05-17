'use client';
// next
import Link from 'src/utils/link';
// mui
import { Typography, Card, Box, Stack, CardContent, alpha } from '@mui/material';
// components
import Image from 'src/components/blurImage';
import Countdown from 'react-countdown';

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <p>Good Luck</p>;
  } else {
    // Render a countdown
    return (
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          '.main-card': {
            height: 70,
            width: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
            borderRadius: 2
          }
        }}
      >
        <Box className="main-card">
          <Stack alignItems="center">
            <Typography variant="h6">{days}</Typography>
            <Typography variant="body2" color="text.secondary">
              Days
            </Typography>
          </Stack>
        </Box>
        <Box className="main-card">
          <Stack alignItems="center">
            <Typography variant="h6">{hours}</Typography>
            <Typography variant="body2" color="text.secondary">
              Hours
            </Typography>
          </Stack>
        </Box>
        <Box className="main-card">
          <Stack alignItems="center">
            <Typography variant="h6">{minutes}</Typography>
            <Typography variant="body2" color="text.secondary">
              Minutes
            </Typography>
          </Stack>
        </Box>
        <Box className="main-card">
          <Stack alignItems="center">
            <Typography variant="h6">{seconds}</Typography>
            <Typography variant="body2" color="text.secondary">
              Seconds
            </Typography>
          </Stack>
        </Box>
      </Stack>
    );
  }
};

export default function CompaginCard({ compaign, isLoading }) {
  const baseUrl = '/compagin/';
  return (
    <Card
      sx={{
        // px: 3,
        // py: 2,
        borderRadius: 2
      }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          height: 100
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
        >
          <Image
            alt="shop"
            src={compaign?.cover?.url}
            layout="fill"
            objectFit="cover"
            static
            draggable="false"
            quality={5}
            sizes={'50vw'}
          />
        </Box>
      </Box>
      <CardContent>
        <Stack spacing={1}>
          <Typography
            component={Link}
            href={baseUrl}
            color="text.primary"
            variant="h6"
            textAlign="center"
            lineHeight={0.5}
            sx={{ textTransform: 'capitalize' }}
          >
            {compaign?.name}
          </Typography>
          <Typography color="text.secondary" variant="body1" textAlign="center">
            {compaign?.products?.length} {compaign?.products?.length > 1 ? 'Products' : 'Product'}
          </Typography>
          <Countdown date={new Date(compaign?.endDate)} renderer={renderer} />
        </Stack>
      </CardContent>
    </Card>
  );
}
