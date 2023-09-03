import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';

import   Cookies      from 'js-cookie'               ;
import { useForm    } from 'react-hook-form'         ;
import { useRouter  } from 'next/router'             ;
import { ShopLayout } from '../../components/layouts';
import { countries  } from '../../utils'             ;
import { CartContext } from '../../context';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  return {
    firstName : Cookies.get('firstName') || '',
    lastName  : Cookies.get('lastName' ) || '',
    address   : Cookies.get('address'  ) || '',
    address2  : Cookies.get('address2' ) || '',
    zip       : Cookies.get('zip'      ) || '',
    city      : Cookies.get('city'     ) || '',
    country   : Cookies.get('country'  ) || '',
    phone     : Cookies.get('phone'    ) || '',
  };
};

const AddressPage = () => {
  const router = useRouter();
  const { updateAddress } = useContext(CartContext);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: getAddressFromCookies()
  });

  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    const addressFromCookies = getAddressFromCookies();
    setSelectedCountry(addressFromCookies.country);
  }, []);

  const onSubmitAddress = (data: FormData) => {
    Cookies.set('firstName' , data.firstName           );
    Cookies.set('lastName'  , data.lastName            );
    Cookies.set('address'   , data.address             );
    Cookies.set('address2'  , data.address2 || ''      );
    Cookies.set('zip'       , data.zip                 );
    Cookies.set('city'      , data.city                );
    Cookies.set('country'   , selectedCountry          );
    Cookies.set('phone'     , data.phone               );

    updateAddress(data);
    router.push('/checkout/summary');
  };

  // NOTE - este evento permite que el select de countries detecte la selección
  const onChangeCountry = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <ShopLayout title="Direccíon" pageDescription="Confirmar direccion de destinos">
      <form onSubmit={handleSubmit(onSubmitAddress)}>
        <Typography variant="h1" component="h1">Direccíon</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              {...register('firstName', {
                required: 'ESte campo es requerido',
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              {...register('lastName', {
                required: 'ESte campo es requerido',
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección"
              variant="filled"
              fullWidth
              {...register('address', {
                required: 'ESte campo es requerido',
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección 2 (opcional)"
              variant="filled"
              fullWidth
              {...register('address2')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Código Postal"
              variant="filled"
              fullWidth
              {...register('zip', {
                required: 'ESte campo es requerido',
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              {...register('city', {
                required: 'ESte campo es requerido',
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant="filled"
                label="País"
                {...register('country', {
                  required: 'País requerido',
                })}
                value={selectedCountry}
                onChange={onChangeCountry}
                error={!!errors.country}
              >
                {
                  countries.map(country => (
                    <MenuItem
                      key={country.code}
                      value={country.code}
                    >
                      {country.name}
                    </MenuItem>
                  ))
                }
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono"
              variant="filled"
              fullWidth
              {...register('phone', {
                required: 'Teléfono requerido',
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button type="submit" color="secondary" className="circular-btn" size="large">
            Revisar pedido
          </Button>
        </Box>
      </form>

    </ShopLayout>
  );
};

export default AddressPage;