import React, { Fragment, useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import { Badge } from "@mui/material";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [stor, setStor] = useState([]);
  const [baseUrl, setBaseUrl] = useState('');
  const [open, setOpen] = useState(false);

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
  }, []);

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
      <div onClick={(e) => handleCart(e)} className={styles.icon}>
        <Badge badgeContent={stor?.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </div>

      {/* Mobile menu  */}
      <div
        className={
          menuOpen ? `${styles.right} ${styles.active}` : `${styles.right}`
        }
        // className={`${styles.right}` + (menuOpen && `${styles.active}`)}
      >
        <div
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={styles.line1}></span>
          <span className={styles.line2}></span>
          <span className={styles.line3}></span>
        </div>
      </div>
      {/* <div className={menuOpen ? `${styles.menu}` `${styles.active}` : `${styles.menu}`}></div> */}
      <div
        className={
          menuOpen ? `${styles.menu} ${styles.active}` : `${styles.menu}`
        }
        // className={`${styles.menu}` (menuOpen && `${styles.active}`)}
      >
        <ul>
        <li>
            {" "}
            <Link
              href="/"
              className={styles.pink}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              All
            </Link>
          </li>
        {category?.map((cat) => (
          <li>
            {" "}
            <Link
              href="/"
              onClick={(e) => handleClick(e, cat?.category)}
              className={styles.pink}
              // onMouseOver={() => setOpen(true)}
              // onMouseOut={() => setOpen(false)}
            >
              {cat?.category}
            </Link>
            {open ? 
            <div className={styles.submenu}>
              <ul>
                {cat?.subCategory?.map((sub, index) => (
                <li 
                  key={index}
                  onClick={(e) => handleSubCategoryClick(e, sub)}
                  className={styles.dropdown}
                  >{sub}</li>
                ))}
              </ul>
            </div>: ''}
          </li>
          ))}
          <li>
            {" "}
            <Link
              href="/"
              className={styles.pink}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
