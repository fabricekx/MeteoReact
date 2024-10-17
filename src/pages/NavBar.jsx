import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };
// Menu de gauche
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget); // Ouvre le menu à gauche
  };
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null); // Ferme le menu à gauche
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick} // Ouvrir le menu déroulant
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/* Menu déroulant à gauche */}
          <Menu
            id="left-menu"
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link to="/meteo" style={{ textDecoration: 'none', color: 'inherit' }}>
                Ma météo
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/meteo" style={{ textDecoration: 'none', color: 'inherit' }}>
                Mes stations
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Mes autres
              </Link>
            </MenuItem>
          </Menu>

          {/* Titre principal */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ma météo
          </Typography>
          
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
              
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                {/* <MenuItem onClick={deconnexion}>Déconnexion</MenuItem> */}
              </Menu>
            </div>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}