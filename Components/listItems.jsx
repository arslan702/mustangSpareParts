import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';

export const mainListItems = (
  <>
    <Link href={"/dashboard/products"}>
      <ListItemButton>
        <ListItemIcon>
        <Inventory2Icon/>
          </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>
    </Link>
    <Link href="/dashboard/category">
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon/>
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemButton>
    </Link>
    <Link href="/dashboard/model">
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon/>
        </ListItemIcon>
        <ListItemText primary="Manufacturer" />
      </ListItemButton>
    </Link>
    <Link href="/dashboard/orders">
      <ListItemButton>
        <ListItemIcon>
          <InventoryRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
    </Link>
    <Link href="/dashboard/users">
      <ListItemButton>
        <ListItemIcon>
          <Groups2RoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </Link>
  </>
);
