import React, { useEffect, useState } from "react";
import styles from "./cart.module.css";
import Image from "next/image";
// import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { useRouter } from "next/router";

export default function Cart() {
  const [store, setStore] = useState([{}]);
  const router = useRouter();

  useEffect(() => {
    setStore(JSON.parse(localStorage.getItem("cart") || null));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/shipping')
  }
  return (
    <Box className={styles.cart}>
      <Box className={styles.cartimg}></Box>
      <Box className={styles.wrapper}>
        <h1>Shopping Cart</h1>
        <Box className={styles.project}>
          <Box className={styles.shop}>
            {store?.map((stor) => (
            <>
            <Box className={styles.box}>
              <Image src={stor?.img} width={200} height={200} alt='product img' className={styles.img2} />
              <Box className={styles.content}>
                <h3>{stor?.title}</h3>
                <h4>Price: ${stor?.price}</h4>
                <p className={styles.unit}>
                  Quantity: <input name readOnly defaultValue={stor?.quantity} />
                </p>
                {/* <p className={styles.btnarea}>
                  <DeleteIcon /> <span className="btn2">Remove</span>
                </p> */}
              </Box>
            </Box>
            </>
            ))}
            <Box className={styles.rightbar}>
              {/* <p>
                <span>Subtotal</span> <span>$120</span>
              </p>
              <hr />
              <p>
                <span>Tax (5%)</span> <span>$6</span>
              </p>
              <hr />
              <p>
                <span>Shipping</span> <span>$15</span>
              </p>
              <hr />
              <p>
                <span>Total</span> <span>$141</span>
              </p> */}
              <div onClick={(e) => handleClick(e)}>
                <ShoppingCartIcon className={styles.del} />
                Checkout
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
