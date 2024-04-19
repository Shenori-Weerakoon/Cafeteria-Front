import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from '../Main/SideBar';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const SupportTicket = () => {
    const [ticket, setTicket] = useState([]);

    useEffect(() => {
        fetchTicketDetails();
    }, []);

    const fetchTicketDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/support/allSupport');
            const ticketsWithId = response.data.map((ticket, index) => ({
                id: index + 1,
                ...ticket
            }));
            setTicket(ticketsWithId);
        } catch (error) {
            console.error('Error fetching ticket details:', error);
        }
    };

    const handleUpdateTicketComplete = async (selectedTicket) => {
        try {
            const updatedStatus = 'Completed';
            const updatedTicket = { ...selectedTicket, status: updatedStatus };
            await axios.put(`${global.APIUrl}/support/updateSupport/${updatedTicket.uniqueId}`, updatedTicket);

            setTicket(prevTickets =>
                prevTickets.map(ticket =>
                    ticket.id === selectedTicket.id ? updatedTicket : ticket
                )
            );
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    const handleUpdateTicketReject = async (selectedTicket) => {
        try {
            const updatedStatus = 'Rejected';
            const updatedTicket = { ...selectedTicket, status: updatedStatus };
            await axios.put(`${global.APIUrl}/support/updateSupport/${updatedTicket.uniqueId}`, updatedTicket);

            setTicket(prevTickets =>
                prevTickets.map(ticket =>
                    ticket.id === selectedTicket.id ? updatedTicket : ticket
                )
            );
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Rejected':
                return 'red';
            case 'Completed':
                return 'green';
            default:
                return 'orange';
        }
    };

    const columns = [
        { field: 'uniqueId', headerName: 'Ticket ID', width: 150 },
        { field: 'name', headerName: 'Ticket Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Phone No', width: 150 },
        { field: 'issueDetail', headerName: 'Details', width: 900 },
        { field: 'todayDate', headerName: 'Date', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    style={{ color: getStatusColor(params.value), borderColor: getStatusColor(params.value) }}
                    disabled
                >
                    {params.value}
                </Button>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <IconButton color="error" onClick={() => handleUpdateTicketReject(params.row)}>
                        <CloseIcon />
                    </IconButton>

                    <IconButton color="success" onClick={() => handleUpdateTicketComplete(params.row)}>
                        <CheckIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    return (
        <div style={{ display: 'flex', height: '100vh', maxWidth: '161vh' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, padding: 20, backgroundColor: '#ecf0f1', display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" sx={{ backgroundColor: '#1c2331', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Support Ticket Management
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Support Ticket Details
                    </Typography>
                    <div style={{ width: '100%' }}>
                        <DataGrid rows={ticket} columns={columns} pageSize={5} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportTicket;
