// react
'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'next-share';
import { useRouter } from 'next-nprogress-bar';
import PropTypes from 'prop-types';
// mui
import {
  Box,
  Stack,
  Button,
  IconButton,
  Typography,
  FormHelperText,
  Skeleton,
  Rating,
  Tooltip,
  Grid,
  Card,
  Divider,
  useTheme
} from '@mui/material';

// formik
import { useFormik, Form, FormikProvider, useField } from 'formik';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
// redux
import { addCart } from 'src/redux/slices/product';
// styles
import RootStyled from './styled';
// components
import ColorPreview from 'src/components/colorPreview';
import SizePreview from 'src/components/sizePicker';

// hooks
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';
// icons
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { MdLockOutline } from 'react-icons/md';
import { FaRegStar } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { IoBagCheckOutline } from 'react-icons/io5';
import Label from 'src/components/label';

ProductDetailsSumary.propTypes = {
  product: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  totalRating: PropTypes.number.isRequired,
  brand: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  onClickWishList: PropTypes.func.isRequired,
  wishlist: PropTypes.array.isRequired
};

const Incrementer = ({ ...props }) => {
  const { available } = props;
  const [field, , helpers] = useField(props);
  // eslint-disable-next-line react/prop-types

  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box className="incrementer">
      <IconButton size="small" color="inherit" disabled={value <= 1} onClick={decrementQuantity}>
        <IoIosRemove />
      </IconButton>
      <Typography variant="body2" component="span" className="text">
        {value}
      </Typography>
      <IconButton size="small" color="inherit" disabled={value >= available} onClick={incrementQuantity}>
        <IoIosAdd />
      </IconButton>
    </Box>
  );
};
Incrementer.propTypes = {
  available: PropTypes.number.isRequired
};
export default function ProductDetailsSumary({ ...props }) {
  const { product, isLoading, totalRating } = props;
  // brand, category
  const theme = useTheme();
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  const [isClient, setIsClient] = useState(false);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const dispatch = useDispatch();

  const { checkout } = useSelector(({ product }) => product);

  const [isLoaded, setLoaded] = useState(false);

  const isMaxQuantity =
    !isLoading &&
    checkout.cart.filter((item) => item._id === product?._id).map((item) => item.quantity)[0] >= product?.available;

  const onAddCart = (param) => {
    toast.success('Added to cart');
    dispatch(addCart(param));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      pid: product?._id,
      cover: product?.cover,

      quantity: 1
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const alreadyProduct = !isLoading && checkout.cart.filter((item) => item.pid === values.pid);
        if (!Boolean(alreadyProduct.length)) {
          const colorSelected = product?.colors.find((_, index) => index === color);
          const sizeSelected = product?.sizes.find((_, index) => index === size);
          onAddCart({
            pid: product._id,
            sku: product.sku,
            color: colorSelected,
            size: sizeSelected,
            shop: product.shop,
            image: product?.images[0].url,
            quantity: values.quantity,
            price: product.priceSale === 0 ? product.price : product.priceSale,
            subtotal: (product.priceSale || product?.price) * values.quantity
          });
          setFieldValue('quantity', 1);
        }

        setSubmitting(false);
        router.push('/cart');
      } catch (error) {
        setSubmitting(false);
      }
    }
  });

  const { values, touched, errors, setFieldValue, handleSubmit } = formik;
  const handleAddCart = () => {
    const colorSelected = product?.colors.find((_, index) => index === color);
    const sizeSelected = product?.sizes.find((_, index) => index === size);
    onAddCart({
      pid: product._id,
      sku: product.sku,
      color: colorSelected,
      shop: product.shop,
      image: product?.images[0].url,
      size: sizeSelected,
      quantity: values.quantity,
      price: product.priceSale === 0 ? product.price : product.priceSale,
      subtotal: (product.priceSale || product?.price) * values.quantity
    });
    setFieldValue('quantity', 1);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <RootStyled>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <Box sx={{ p: 1 }}>
                <Typography noWrap variant="h6" paragraph color="text.secondary" sx={{ mb: 0, fontWeight: 500 }}>
                  {product?.sku}
                </Typography>
                <Typography variant="h3" className="heading">
                  {product?.name}
                </Typography>
                <Typography noWrap variant="h6" paragraph color="text.primary" sx={{ mb: 0, fontWeight: 500 }}>
                  {product?.shop?.title}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                  <Stack direction="row" alignItems="center" className="rating-wrapper" spacing={1}>
                    <Rating value={totalRating} precision={0.1} size="small" readOnly />
                    <Typography variant="subtitle2" color="text.secondary">
                      {product?.reviews.length} {Number(product?.reviews.length) > 1 ? 'Reviews' : 'Review'}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack spacing={1} mt={1.5} mb={3}>
                  <Stack spacing={1} pt={1}>
                    <Typography variant="subtitle1">Color</Typography>
                    <ColorPreview color={color} setColor={setColor} colors={product?.colors} isDetail />
                  </Stack>
                  <Stack spacing={1} pt={1}>
                    <Typography variant="subtitle1">Size</Typography>
                    <SizePreview size={size} setSize={setSize} sizes={product?.sizes} isDetail />
                  </Stack>
                </Stack>
                {/* <Typography variant="subtitle1">Description</Typography> */}
                <Typography variant="body1" color="text.secondary">
                  {' '}
                  {product?.description}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card sx={{ p: 2, position: 'sticky', top: 156 }}>
                <Stack direction="row" gap={1} alignItems="center">
                  <Typography variant="h4" className="text-price">
                    {!isLoading && isLoaded && fCurrency(cCurrency(product?.priceSale))} &nbsp;
                    {product?.price <= product?.priceSale ? null : (
                      <Typography component="span" className="old-price" color="text.secondary">
                        {!isLoading && isLoaded && fCurrency(cCurrency(product?.price))}
                      </Typography>
                    )}
                  </Typography>
                  {product?.price <= product?.priceSale ? null : (
                    <Label variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'} color={'success'}>
                      {(100 - (product?.priceSale / product?.price) * 100).toFixed(0)}% off
                    </Label>
                  )}
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1} className="incrementer-wrapper" my={2}>
                  {isLoading ? (
                    <Box sx={{ float: 'right' }}>
                      <Skeleton variant="rounded" width={120} height={40} />
                    </Box>
                  ) : (
                    <div>
                      <Incrementer name="quantity" available={product?.available} />
                      {touched.quantity && errors.quantity && (
                        <FormHelperText error>{touched.quantity && errors.quantity}</FormHelperText>
                      )}
                    </div>
                  )}
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    fontWeight={400}
                    sx={{
                      span: {
                        color: 'error.main'
                      }
                    }}
                  >
                    {product?.available > 0 ? `${product?.available} Items` : <span>Out of stock</span>}
                  </Typography>
                </Stack>

                <Stack spacing={1} className="contained-buttons" mb={2}>
                  <Button
                    fullWidth
                    disabled={isMaxQuantity || isLoading || product?.available < 1}
                    // size={isMobile ? 'medium' : 'large'}
                    type="button"
                    color="primary"
                    variant="text"
                    onClick={() => handleAddCart(product)}
                    startIcon={<FiShoppingCart />}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    disabled={isLoading || product?.available < 1}
                    fullWidth
                    // size={isMobile ? 'medium' : 'large'}
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<IoBagCheckOutline />}
                  >
                    Buy Now
                  </Button>

                  <Stack direction="row" spacing={0.5} justifyContent={'center'}>
                    <Tooltip title="Copy Prooduct URL">
                      <IconButton
                        aria-label="copy"
                        onClick={() => {
                          navigator.clipboard.writeText(window?.location.href);
                          toast.success('Link copied.');
                        }}
                      >
                        <MdContentCopy size={24} />
                      </IconButton>
                    </Tooltip>
                    {isClient && (
                      <>
                        <Tooltip title="Share on WhatsApp">
                          <WhatsappShareButton url={window?.location.href || ''}>
                            <IconButton sx={{ color: '#42BC50' }} aria-label="whatsapp">
                              <IoLogoWhatsapp size={24} />
                            </IconButton>
                          </WhatsappShareButton>
                        </Tooltip>
                        <Tooltip title="Share on Facebook">
                          <FacebookShareButton url={window?.location.href || ''}>
                            <IconButton sx={{ color: '#1373EC' }} aria-label="facebook">
                              <FaFacebook size={24} />
                            </IconButton>
                          </FacebookShareButton>
                        </Tooltip>
                        <Tooltip title="Share on Twitter">
                          <TwitterShareButton url={window?.location.href || ''}>
                            <IconButton sx={{ color: 'text.primary' }} aria-label="twitter">
                              <FaXTwitter size={24} />
                            </IconButton>
                          </TwitterShareButton>
                        </Tooltip>
                        <Tooltip title="Share on LinkedIn">
                          <LinkedinShareButton url={window?.location.href || ''}>
                            <IconButton sx={{ color: '#0962B7' }} aria-label="linkedin">
                              <FaLinkedin size={24} />
                            </IconButton>
                          </LinkedinShareButton>
                        </Tooltip>
                      </>
                    )}
                  </Stack>
                </Stack>

                <Divider />
                {shippingData.map((item, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    my={1}
                    sx={{
                      color: 'text.secondary'
                    }}
                  >
                    {item.icon}
                    <Typography variant="subtitle2" color="text.secondary">
                      {item.name}
                    </Typography>
                  </Stack>
                ))}
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </RootStyled>
  );
}

const shippingData = [
  {
    icon: <LiaShippingFastSolid size={20} />,
    name: 'Worldwide shipping'
  },
  {
    icon: <MdLockOutline size={20} />,
    name: 'Secure payment'
  },
  {
    icon: <FaRegStar size={20} />,
    name: '2 years full warranty'
  }
];
