import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Avatar } from '@mui/material';

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

}

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

export default MenuManage;
