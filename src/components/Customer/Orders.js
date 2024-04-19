import React, { useState, useEffect } from 'react';
import Navbar from '../Main/NavBar.js';
import Footer from '../Main/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';

function Orders() {                                         
    const classes = useStyles();
    const email = sessionStorage.getItem("cusmail");
    const [paidorder, setPaidOrder] = useState([]);
    const [codorder, setCodOrder] = useState([]);

    useEffect(() => {
        fetchPaidOrderDetails();
        fetchCodOrderDetails();
    }, []);

    const fetchPaidOrderDetails = async () => {                   
        try {
            const response = await axios.get(global.APIUrl + '/payOrder/allPaidOrders');
            const orderWithId = response.data.map((order, index) => ({
                id: index + 1,
                ...order
            }));
            setPaidOrder(orderWithId);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    }

    const fetchCodOrderDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/codOrder/allOrders');
            const orderWithId = response.data.map((order, index) => ({
                id: index + 1,
                ...order
            }));
            setCodOrder(orderWithId);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    }    
}    