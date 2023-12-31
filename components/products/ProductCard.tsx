import React, { FC, useMemo, useState } from 'react';
import { Link as MuiLink, Grid, Card, CardActionArea, CardMedia, Box, Typography, Chip, Button } from '@mui/material';
import { IProduct } from '../../interface';
import Link from 'next/link';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    const [firstImage, secondImage] = product.images;
    const HOST_NAME = process.env.NEXT_PUBLIC_HOST_NAME || '';

    const urlImg1 = firstImage && firstImage.startsWith('http')
      ? firstImage
      : `${HOST_NAME}/products/${firstImage}`;

    const urlImg2 = secondImage && secondImage.startsWith('http')
      ? secondImage
      : `${HOST_NAME}/products/${secondImage}`;

    return isHovered ? urlImg1 : urlImg2;
  }, [isHovered, product.images]);


  return (
    <Grid
      item
      xs={6}
      sm={4}
      key={product.slug}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <Link href={`/product/${product.slug}`} prefetch={false} >
          <MuiLink underline="always" component={'span'} >

            <CardActionArea>
              {
                product.inStock === 0 &&
                <Chip
                  color="primary"
                  label="No hay disponibles"
                  sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                />
              }
              <CardMedia
                component="img"
                image={productImage}
                alt={product.title}
                className="fadeIn"
                onLoad={() => setIsImageLoaded(true)}
              />

            </CardActionArea>
          </MuiLink>
        </Link>
      </Card>

      <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className="fadeIn" >
        <Typography fontWeight={700} >{product.title}</Typography>
        <Typography fontWeight={500} >{product.price}</Typography>
      </Box>

    </Grid>
  );
};
