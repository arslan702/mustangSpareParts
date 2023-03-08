import React, { Fragment, useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const [stor, setStor] = useState([]);
  const [baseUrl, setBaseUrl] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchorEls, setSubMenuAnchorEls] = useState({});

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuOpen = (event, id) => {
    setSubMenuAnchorEls((prevState) => ({
      ...prevState,
      [id]: event.currentTarget
    }));
  };

  const handleSubMenuClose = (id) => {
    setSubMenuAnchorEls((prevState) => ({
      ...prevState,
      [id]: null
    }));
  };

  useEffect(() => {
    // let parser =
    setBaseUrl(`${window.location.protocol}//${window.location.host}${router.basePath}`)
    const khopta = JSON.parse(localStorage.getItem("cart") || null);
    setStor(khopta);
    axios
      .get(`/api/category/get`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => console.log(error));

      const handleScroll = () => {
        if (anchorEl) {
          handleMenuClose();
        }
        Object.keys(subMenuAnchorEls).forEach((key) => {
          if (subMenuAnchorEls[key]) {
            handleSubMenuClose(key);
          }
        });
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  }, [anchorEl, subMenuAnchorEls]);

  const handleClick = (e, categ) => {
    e.preventDefault();
    router.push(`${baseUrl}/a/?category=${encodeURIComponent(categ)}`);
  };

  const handleSubCategoryClick = (e, categ) => {
    e.preventDefault();
    router.push(`${baseUrl}/a/?sub=${encodeURIComponent(categ)}`);
  };

  const handleCart = (e) => {
    e.preventDefault();
    router.push("/cart");
  };

  const handleHome = (e) => {
    e.preventDefault();
    router.push("/")
  }

  return (
    <div className={styles.navbar} id="navbar">
      <div onClick={(e) => handleHome(e)} className={styles.logo} id="logo">
        AutoParts
      </div>

      <div className={styles.navcontainer}>
        <ul className={styles.topnavcontainer}></ul>
        <ul className={styles.bottomnavcontainer}>
          <li>
            {" "}
            <Link href="/" className={styles.pink}>
              All
            </Link>
          </li>
          {category?.map((cat) => (
            <li key={cat?._id}>
              <Fragment>
                <Link
                  onClick={(e) => handleClick(e, cat?.category)}
                  href="/"
                  className={styles.pink}
                >
                  {cat?.category}
                </Link>
              </Fragment>
              <div className={styles.submenu}>
                <ul>
                  {cat?.subCategory?.map((sub, index) => (
                    <li
                      onClick={(e) => handleSubCategoryClick(e, sub)}
                      key={index}
                      style={{ textAlign: "left", fontFamily: "inherit" }}
                      className={styles.dropdown}
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          <li>
            {" "}
            <Link href="/contact" className={styles.pink}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      {/* <div onClick={(e) => handleCart(e)} className={styles.icon}>
        <Badge badgeContent={stor?.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </div> */}

      <div className={styles.mobilemenu}>
      <IconButton
        aria-label="more"
        aria-controls="mobile-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="mobile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {category?.map((item) => (
          <MenuItem
            key={item._id}
            onClick={(e) => handleSubMenuOpen(e, item._id)}
          >
            {item?.category}
            <Menu
              id={`sub-menu-${item._id}`}
              anchorEl={subMenuAnchorEls[item._id]}
              keepMounted
              open={Boolean(subMenuAnchorEls[item._id])}
              onClose={() => handleSubMenuClose(item._id)}
              onScroll={() => handleSubMenuClose(item._id)}
            >
              {item?.subCategory?.map((subMenuItem, index) => (
                <MenuItem key={index} onClick={(e) => handleSubCategoryClick(e, subMenuItem)}>
                  {subMenuItem}
                </MenuItem>
              ))}
            </Menu>
          </MenuItem>
        ))}
        <MenuItem>
          <Link href='/contact'>
          Contact Us
          </Link>
        </MenuItem>
      </Menu>
    </div>

    </div>
  );
};

export default Navbar;
