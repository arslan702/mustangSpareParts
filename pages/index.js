import Head from "next/head";
// import { Inter } from '@next/font/google'
// import styles from "@/styles/Home.module.css";
import HomePage from "../pages/Home/HomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>BMW Parts</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <HomePage />
      </main>
    </>
  );
}
