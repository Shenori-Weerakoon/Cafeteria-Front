import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '40%',
    },
    formControl: {
        minWidth: 200,
    },
    button: {
        margin: theme.spacing(1),
        width: 200,
        height: 50,
        fontSize: 16,
    },
}));

const CheckoutPage = () => {
    const classes = useStyles();
    const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems'));
    const [promotion, setPromotion] = useState('');
    const [orderId, setOrderId] = useState(checkoutItems.orderID);
    const [fullPrice, setFullPrice] = useState(checkoutItems.totalPrice);
    const [finalPrice, setFinalPrice] = useState(fullPrice);
    const [email, setEmail] = useState('');
    const [promotions, setPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
   

    useEffect(() => {
        fetchPromotionDetails();
        const userEmail = sessionStorage.getItem("cusmail");
        setEmail(userEmail);
    }, []);

    const fetchPromotionDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/promotion/all');
            setPromotions(response.data);
        } catch (error) {
            console.error('Error fetching promotion details:', error);
        }
    };

   

    const handleChange = (event) => {
        const selectedPromoId = event.target.value;
        const selectedPromo = promotions.find(promo => promo._id === selectedPromoId);
        console.log("promotion details" + selectedPromo.promo)
        setSelectedPromotion(selectedPromo);
        setPromotion(selectedPromoId);
        console.log("promotion "+ promotion)
        if (selectedPromo) {
            console.log(selectedPromo);
            const discountedPrice = fullPrice - (fullPrice * (selectedPromo.promo / 100));
            if (fullPrice >= selectedPromo.con) {
                setFinalPrice(discountedPrice);
                console.log(discountedPrice)
            } else {
                setFinalPrice(fullPrice);
            }
        } else {
            setFinalPrice(fullPrice);
        }
    };

    const handlePay = () => {
        checkoutItems.totalPrice = finalPrice;
        localStorage.setItem('checkoutItems', JSON.stringify(checkoutItems));
        window.location.href = '/Payment';
    };

    const handleCOD = () => {
        checkoutItems.totalPrice = finalPrice;
        localStorage.setItem('checkoutItems', JSON.stringify(checkoutItems));
        window.location.href = '/CashOnDelivery';
    };

    const handleCancel = () => {
        localStorage.setItem('checkoutItems', JSON.stringify([]));
        localStorage.setItem('cartItems', JSON.stringify([]));
        window.location.href = '/MenuPage';
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h4" gutterBottom style={{ color: 'black' }}>
                    Checkout
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Order ID: {orderId}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Email: {email}
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Full Price: LKR {fullPrice}
                </Typography>

                {selectedPromotion && (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Promotion: {selectedPromotion.name}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Promotion Discount: {selectedPromotion.promo}%
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Promotion Condition: {selectedPromotion.con}
                        </Typography>
                    </>
                )}

                <Typography variant="h6" gutterBottom>
                    Final Price after Promotion: LKR {finalPrice}
                </Typography>

                <FormControl className={classes.formControl} style={{ marginBottom: '20px' }}>
                    <InputLabel id="demo-simple-select-label">Promotion</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={promotion}
                        onChange={handleChange}
                    >
                        {promotions
                            .filter(item => item.status === 'Activate')
                            .map(item => (
                                <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <br />
                <Button variant="contained" color="primary" className={classes.button} onClick={handlePay}>
                    Pay
                </Button>

                <Button variant="contained" color="secondary" className={classes.button} onClick={handleCOD}>
                    Cash on Delivery
                </Button>

                <Button variant="contained" className={classes.button} onClick={handleCancel}>
                    Cancel
                </Button>
            </Paper>
        </div>
    );
};

export default CheckoutPage;
