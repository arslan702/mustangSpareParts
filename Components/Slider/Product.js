import React from "react";
import styles from './slider.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from "@mui/material";
import { useRouter } from "next/router";

export default function Product(props) {
  const router = useRouter();

  const handleClick = (e, id) => {
    e.preventDefault();
    router.push(`/details/${id}`)
  }
  return (
    <Container>
    {/* <Link href={`/Details/${props?.id}`}> */}
    <div 
    onClick={(e) => handleClick(e, props?.id )} 
    className={styles.card}>
      <Image className={styles.productimage} width={600} height={500} src={props.url} alt="product image" />
      <br/>
      <p className={styles.description} >{props.description}</p> <br/>
      <p className={styles.price}>{props?.oldprice > 0 ? <del className={styles.oldprice} >{props.oldprice}</del>: '' }   <span>${props.price}</span>    </p> <br/>
    </div>
    {/* </Link> */}
    </Container>
  );
}