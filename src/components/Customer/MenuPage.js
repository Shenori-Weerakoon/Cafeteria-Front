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
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchMenuDetails();
    }, []);

    const fetchMenuDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/menuItem/allMenuItem');
            const menusWithId = response.data.map((menu, index) => ({
                id: index + 1,
                ...menu
            }));
            setMenu(menusWithId);
        } catch (error) {
            console.error('Error fetching menu details:', error);
        }
    };

    const handleAddToCart = (menuItem) => {
        const itemQuantity = quantity[menuItem.id] || 0;
        if (itemQuantity <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Quantity',
                text: 'Please enter a valid quantity greater than zero.',
            });
            return;
    }

    const newItem = { ...menuItem, quantity: itemQuantity };
        const updatedCart = [...cartItems, newItem];
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        console.log('Cart Items:', updatedCart);
        Swal.fire({
            icon: 'success',
            title: 'Added to Cart!',
            text: `${menuItem.itemName} has been added to your cart.`,
        });

    };

    const handleQtyChange = (event, menuItem) => {
        const { value } = event.target;
        setQuantity(prevState => ({
            ...prevState,
            [menuItem.id]: value
        }));
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/menuItems/search?query=${searchQuery}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching menu items:', error);
        }
    };


    return (
        <div>
            <Navbar />
            <div className={classes.root}>
                <Typography gutterBottom variant="h3" component="h3" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Menu Items
                    <hr style={{ width: '150px' }} />
                </Typography>

                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    placeholder="Search for items..." 
                />
                    <button onClick={handleSearch}>Search</button>
                <ul>
                    {searchResults.map(item => (
                    <li key={item.id}>{item.name}</li>
                    ))}
                </ul>

                <Grid container spacing={4} style={{marginBottom:'153px'}}>
                    {menu.map((menuItem) => (
                        <Grid item xs={12} sm={6} md={4} key={menuItem.id}>
                            {menuItem.status === 'Activate' && (
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        image={menuItem.picture}
                                        title={menuItem.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 'bold', }}>
                                            {menuItem.itemName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {menuItem.description}
                                        </Typography>
                                        <Typography variant="body1" color="textPrimary">
                                            Calorie: {menuItem.calorieCount}
                                        </Typography>
                                        <Typography variant="body1" color="textPrimary" style={{ fontWeight: 'bold' }}>
                                            Price: Rs. {menuItem.price}
                                        </Typography>
                                        <br />
                                        <div>

                                            {/* When clicked, it triggers the handleQtyChange function with an updated quantity value calculated by subtracting 1 from the current quantity. 
                                            The Math.max(quantity[menuItem.id] - 1, 0) ensures that the quantity cannot go below zero. */}
                                            <IconButton
                                                aria-label="remove"
                                                onClick={() => handleQtyChange({ target: { value: Math.max(quantity[menuItem.id] - 1, 0) } }, menuItem)}
                                            >
                                                <RemoveIcon />
                                            </IconButton>

                                            <TextField
                                                className={classes.qtyField}
                                                type="number"
                                                variant="outlined"
                                                size="small"
                                                value={quantity[menuItem.id] || 0}
                                                onChange={(e) => handleQtyChange(e, menuItem)}
                                            />

                                            {/* When clicked, it triggers the handleQtyChange function with an updated quantity value calculated by adding 1 to the current quantity. 
                                            (quantity[menuItem.id] || 0) ensures that if the quantity is not defined (e.g., the first time the item is added to the cart), it starts from 0. */}
                                            <IconButton
                                                aria-label="add"
                                                className={classes.addButton}
                                                onClick={() => handleQtyChange({ target: { value: (quantity[menuItem.id] || 0) + 1 } }, menuItem)}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </div>
                                        <Button
                                            variant="contained"
                                            color="#EDAF28"
                                            className={classes.addToCartButton}
                                            onClick={() => handleAddToCart(menuItem)}
                                        >
                                            Add to Cart
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </Grid>
                        ))}
                    </Grid>

            </div>

            <Footer />
                
        </div>
    );
};



export default MenuPage;
