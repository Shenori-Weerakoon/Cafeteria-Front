import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid,
    Divider,
    Paper,
    Button,
    Avatar
} from '@material-ui/core';
import Navbar from '../Main/NavBar.js';
import Footer from '../Main/Footer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        textAlign: 'center',
        margin: theme.spacing(2, 0),
    },
    paper: {
        padding: theme.spacing(3),
        margin: 'auto',
        maxWidth: 400,
    },
    infoItem: {
        marginBottom: theme.spacing(2),
    },
    bold: {
        fontWeight: 'bold',
    },
    button: {
        marginTop: theme.spacing(2),
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
        marginLeft: '150px',
        width: theme.spacing(10),
        height: theme.spacing(10),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

}));

function Profile() {
    const classes = useStyles();
    const email = sessionStorage.getItem("cusmail");
    const [profile, setProfile] = useState([]);
    const profileDetails = profile[0] || {};

    useEffect(() => {
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

    const handleDeleteProfile = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/user/delete/${email}`);
            sessionStorage.setItem('cusmail', 'empty');
            window.location.href = "/";
        } catch (error) {
            console.error('Error deleting profile:', error);
        }
    }

    const handleLoyalProfile = async () => {
        try {
            profileDetails.isLoyal = true;
            const editData = {
                name: profileDetails.name,
                email: profileDetails.email,
                password: profileDetails.password,
                phone: profileDetails.phone,
                isLoyal: profileDetails.isLoyal,
                points: profileDetails.points,
                userType: profileDetails.userType
            };

            console.log(editData);

            const res = await axios.put(`http://localhost:5000/user/update`, editData);

            Swal.fire({
                title: "Success!",
                text: "Loyalty Activated",
                icon: 'success',
                confirmButtonText: "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/Profile";
                }
            });
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


    return (
        <div className={classes.root}>
            <Navbar />
            <div className={classes.header}>
                <Typography variant="h3" component="h1">Profile</Typography>
            </div>
            <hr style={{ width: 100, }}></hr>
            <br />
            <br />
            <Grid container justify="center">
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper}>
                        <div className={classes.infoItem}>
                            <Avatar className={classes.icon}>
                                <AccountCircleIcon />
                            </Avatar>
                            <br />
                            <Typography variant="h6" className={classes.bold}>
                                Name:
                            </Typography>
                            <Typography variant="body1">
                                {profileDetails.name}
                            </Typography>
                        </div>
                        <div className={classes.infoItem}>
                            <Typography variant="h6" className={classes.bold}>
                                Email:
                            </Typography>
                            <Typography variant="body1">
                                {profileDetails.email}
                            </Typography>
                        </div>
                        <div className={classes.infoItem}>
                            <Typography variant="h6" className={classes.bold}>
                                Phone:
                            </Typography>
                            <Typography variant="body1">
                                {profileDetails.phone}
                            </Typography>
                        </div>
                        <div className={classes.infoItem}>
                            <Typography variant="h6" className={classes.bold}>
                                Loyalty Status:
                            </Typography>
                            <Typography variant="body1">
                                {profileDetails.isLoyal === 'true' ? 'Loyal Customer' : 'Not Loyal Customer'}
                            </Typography>
                        </div>
                        {profileDetails.isLoyal === 'true' && (
                            <div className={classes.infoItem}>
                                <Typography variant="h6" className={classes.bold}>
                                    Points:
                                </Typography>
                                <Typography variant="body1">
                                    {profileDetails.points}
                                </Typography>
                            </div>
                        )}
                        {profileDetails.isLoyal !== 'true' && (
                            <>
                                <Button
                                    variant="contained"
                                    className={classes.button}
                                    onClick={handleLoyalProfile}
                                    style={{ backgroundColor: '#009688', color: '#fff' }}
                                >
                                    Active Loyalty
                                </Button>
                                &nbsp;
                                &nbsp;
                            </>
                        )}
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={handleDeleteProfile}
                        >
                            Delete Profile
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <br />
            <br />
            <Footer />
        </div>
    );
}

export default Profile;
