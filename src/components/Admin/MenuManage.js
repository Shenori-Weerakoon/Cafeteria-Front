import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const MenuManage = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetchMenuDetails();
        const editBtn = false;     
        const data = {            
            editBtn
        };
        localStorage.setItem('selectedMenu', JSON.stringify(data));
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


const handleAddMenu = () => {
    window.location.href = "/MenuForm";
};

const handleUpdateMenuItem = (selectedMenuItem) => {
    const status = selectedMenuItem.status === 'Activate' ? 'Deactivate' : 'Activate';
    selectedMenuItem.status = status;
    axios.put(global.APIUrl + '/menuItem/update', selectedMenuItem).then(() => {
        window.location.href = "/MenuManage";
    }).catch((err) => {
        Swal.fire({
            title: "Error!",
            text: "Menu Item Not Updated",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"
        })
    });
}


const columns = [
    { field: 'itemId', headerName: 'Item ID', width: 150 },
    { field: 'inventoryItem', headerName: 'Inventory Item', width: 150 },
    { field: 'itemName', headerName: 'Item Name', width: 150 },
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
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
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'calorieCount', headerName: 'Calorie Count', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'categoryType', headerName: 'Category Type', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    { field: 'picture', headerName: 'Picture', width: 150, renderCell: renderPicture },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
            <div>
                {params.row.status === 'Activate' ? (
                    <IconButton color="error" onClick={() => handleUpdateMenuItem(params.row)}>
                        <CloseIcon />
                    </IconButton>
                ) : (
                    <IconButton color="success" onClick={() => handleUpdateMenuItem(params.row)}>
                        <CheckIcon />
                    </IconButton>
                )}
                
            </div>
        ),
    },
];

return(
    <div style={{ display: 'flex', height: '100vh', maxWidth: '161vh' }}>

        <Sidebar />
            <div style={{ flexGrow: 1, padding: 20, backgroundColor: '#B7EBBD', display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" sx={{ backgroundColor: '#EDAF28', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Menu Management
                        </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button 
                        variant="contained" sx={{ bgcolor: '#009637', color: '#ffffff' }} onClick={handleAddMenu}>
                            Add New Item
                        </Button>
                    </Toolbar>
                </AppBar>

                
            </div>    

    </div>

);

};



export default MenuManage;
