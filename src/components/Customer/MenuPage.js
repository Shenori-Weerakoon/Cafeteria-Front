import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    IconButton,
    TextField,
} from '@material-ui/core';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Navbar from '../Main/NavBar';
import Footer from '../Main/Footer';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
    },
    card: {
        maxWidth: 345,
        margin: theme.spacing(2),
    },
    media: {
        height: 200,
    },
    addButton: {
        marginLeft: 'auto',
    },
    qtyField: {
        width: 60,
        textAlign: 'center',
        margin: theme.spacing(0, 2),
    },
    addToCartButton: {
        marginTop: theme.spacing(2),
    },
}));

const MenuPage = () => {
    const classes = useStyles();
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState({});
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetchMenuDetails();
    }, []);

    

    return (
        <div>
            App
        </div>
    );
};

export default MenuPage;
