import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import { Grid, SnackbarContent } from '@mui/material';
import { Link } from 'react-router-dom';
import GrainIcon from '@mui/icons-material/Grain';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import EggIcon from '@mui/icons-material/Egg';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../controller/ProductAction';




export default function Category({ filterFruits, filterVegetables, filterGrains, filterDairyP, filterMeatAndEggs, All }) {

  return (

    <Grid sx={{ marginLeft: 7, marginTop: 5 }}>
      <List
        sx={{ width: '90%', maxWidth: 360, bgcolor: 'background.paper' }}
        aria-label="contacts"
      >
        <SnackbarContent
          sx={{ marginBottom: 3 }}
          message={
            'Category'
          }
        />

        <ListItem disablePadding >

          <ListItemButton onClick={All}>
            <ListItemIcon>
              <DensitySmallIcon />
            </ListItemIcon>
            <ListItemText primary="All" />
          </ListItemButton>

        </ListItem>
        <ListItem disablePadding >

          <ListItemButton onClick={filterFruits}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Fruits" sx={{ paddingRight: 24 }} />
          </ListItemButton>

        </ListItem>

        <ListItem disablePadding>

          <ListItemButton onClick={filterVegetables}>
            <ListItemIcon>
              <AgricultureIcon />
            </ListItemIcon>
            <ListItemText primary="Vegetables" sx={{ paddingRight: 20 }} />
          </ListItemButton>

        </ListItem>

        <ListItem disablePadding>

          <ListItemButton onClick={filterGrains}>
            <ListItemIcon>
              <GrainIcon />
            </ListItemIcon>
            <ListItemText primary="Grains" sx={{ paddingRight: 23 }} />
          </ListItemButton>

        </ListItem>
        <ListItem disablePadding>

          <ListItemButton onClick={filterDairyP}>
            <ListItemIcon>
              <LocalDrinkIcon />
            </ListItemIcon>
            <ListItemText primary="Dairy products" sx={{ paddingRight: 15 }} />
          </ListItemButton>

        </ListItem>

        <ListItem disablePadding>

          <ListItemButton onClick={filterMeatAndEggs}>
            <ListItemIcon>
              <EggIcon />
            </ListItemIcon>
            <ListItemText primary="Meat and Eggs" sx={{ paddingRight: 15 }} />
          </ListItemButton>

        </ListItem>
      </List>
    </Grid>
  );
}
