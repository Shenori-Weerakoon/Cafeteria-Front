import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, Grid, TextField, Button, Box } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import emailjs from 'emailjs-com';



const CashOnDelivery = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});
    const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems'));
    const email = sessionStorage.getItem("cusmail");
    const [itemList, setItemList] = useState([]);
    const [profile, setProfile] = useState([]);
    const profileDetails = profile[0] || {};

    useEffect(() => {
        const itemsWithQuantities = checkoutItems.items.map(item => `${item.itemName} x ${item.quantity}`);
        setItemList(itemsWithQuantities);
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/user/profile/${email}`);
            setProfile(res.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleLoyalProfile = async () => {
        try {
            if (profileDetails.isLoyal === 'true') {
                var newPoint = profileDetails.points + 5;
            }
            else {
                var newPoint = profileDetails.points;
            }
            const editData = {
                name: profileDetails.name,
                email: profileDetails.email,
                password: profileDetails.password,
                phone: profileDetails.phone,
                isLoyal: profileDetails.isLoyal,
                points: newPoint,
                userType: profileDetails.userType
            };
            const res = await axios.put(`http://localhost:5000/user/update`, editData);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!address.trim()) {
            errors.address = 'Address is required';
        }
        if (!city.trim()) {
            errors.city = 'City is required';
        }
        if (!postalCode.trim()) {
            errors.postalCode = 'Postal code is required';
        }
        if (!phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const orderDetails = {
                orderID: checkoutItems.orderID,
                totalPrice: checkoutItems.totalPrice,
                orderItems: itemList,
                status: 'Processing',
                address: address,
                city: city,
                postalCode: postalCode,
                phoneNumber: phoneNumber,
                email: email
            }
            try {
                const response = await axios.post(global.APIUrl + '/codOrder/addOrder', orderDetails).then(handleLoyalProfile);
                const templateParams = {
                    to_email: email,
                    order_id: checkoutItems.orderID,
                    price: checkoutItems.totalPrice,
                    address: address,
                };

                emailjs.send(
                    'service_o9w0gm7',
                    'template_4c24jl3',
                    templateParams,
                    'jMT_4sdBCj0m5mlLD'
                )
                    .then((response) => {
                        console.log('Email sent:', response);
                    })
                    .catch((error) => {
                        console.error('Email sending failed:', error);
                    });
                localStorage.setItem('checkoutItems', JSON.stringify([]));
                localStorage.setItem('cartItems', JSON.stringify([]));
                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed Successfully!',
                    text: 'Your order has been placed successfully.',
                    confirmButtonText: 'OK'
                })
                setTimeout(() => {
                    window.location.href = "/MenuPage";
                }, 3000);
            } catch (error) {
                console.error('Error adding order:', error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'There was an error placing your order. Please try again later.',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            setErrors(validationErrors);
        }
    };
    return (
        <div style ={{height:'150vh', paddingTop:'64px',backgroundColor:'#B7EBBD'}}>
            <AppBar position="static" sx={{ backgroundColor: '#EDAF28' }}>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Cash on Delivery Page
                    </Typography>
                    <Typography variant="h5" style={{ marginRight: '1rem', color:'#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>
                        Caravan Fresh
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ padding: '50px' }}>
                <Box sx={{ border: '1px solid #ccc', borderRadius: '10px', p: '50px' }}>
                    <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                        Order ID : {checkoutItems.orderID}
                    </Typography>
                    <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                        Payment Price : LKR {checkoutItems.totalPrice}
                    </Typography>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    Delivery Address
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    variant="outlined"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    error={!!errors.address}
                                    helperText={errors.address}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    variant="outlined"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    error={!!errors.city}
                                    helperText={errors.city}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Postal Code"
                                    variant="outlined"
                                    value={postalCode}
                                    onChange={(e) => {
                                        const inputPostalCode = e.target.value.replace(/\D/g, '').slice(0, 6);
                                        setPostalCode(inputPostalCode);
                                    }}
                                    error={!!errors.postalCode}
                                    helperText={errors.postalCode}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    Phone Number
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    variant="outlined"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        const inputPhoneNumber = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        setPhoneNumber(inputPhoneNumber);
                                    }}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                    inputProps={{ inputMode: 'numeric' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" sx={{bgcolor:'#009637',color:'#ffffff'}}>
                                    Place Order
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default CashOnDelivery;
