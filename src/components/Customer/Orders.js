import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    TextField,
    Button,
    Grid,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core';
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
    
    async function handleDeletePaid(orderID) {                                          
        await axios.delete(global.APIUrl + "/payOrder/deletePaidOrder/" + orderID).then(() => {
            window.location.href = "/Orders";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Order Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            });
        });

    }

    const handleDeleteCod = async (orderID) => {
        await axios.delete(global.APIUrl + "/codOrder/deleteOrder/" + orderID).then(() => {
            window.location.href = "/Orders";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Order Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })

    };
    const getStatusColor = (status) => {   
        switch (status) {
            case 'Processing':
                return 'blue';
            case 'Accept':
                return 'green';
            case 'Reject':
                return 'red';
            case 'Cooking':
                return 'orange';
            case 'Delivering':
                return 'purple';
            case 'Completed':
                return 'green';
            default:
                return 'black';
        }
    };
}    