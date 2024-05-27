// mui
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Box, Typography, Fab, useTheme, Stack } from '@mui/material';
import { IoIosRemove } from 'react-icons/io';
import { IoIosAdd } from 'react-icons/io';

// Incrementer Style
const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0.5, 0.75)
  // borderRadius: theme.shape.borderRadius,
  // border: `solid 1px ${theme.palette.divider}`
}));

function Incrementer({ ...props }) {
  const { available, quantity, onIncrease, onDecrease } = props;
  const theme = useTheme();
  return (
    <Stack sx={{ width: 96, mb: 0 }}>
      <IncrementerStyle>
        <Fab
          size="small"
          color="primary"
          onClick={onDecrease}
          disabled={quantity <= 1}
          sx={{
            width: 26,
            maxHeight: 26,
            minHeight: 'auto'
          }}
        >
          <IoIosRemove size={16} />
        </Fab>
        {quantity}
        <Fab
          size="small"
          color="primary"
          onClick={onIncrease}
          disabled={quantity >= available}
          sx={{
            width: 26,
            maxHeight: 26,
            minHeight: 'auto'
          }}
        >
          <IoIosAdd size={16} />
        </Fab>
      </IncrementerStyle>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        Available: {available}
      </Typography>
    </Stack>
  );
}

export default Incrementer;
Incrementer.propTypes = {
  available: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired
};
