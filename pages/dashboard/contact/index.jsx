import styles from './product.module.css';
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ContactPage() {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState([])

  const [contact, setContact] = useState([]);

  const [loading, setLoading] = useState(true);

  const [plus, setPlus] = useState(0);

  const deleteProduct = (id) => {
    axios.delete(`/api/contact/delete/${id}`).then(
      () => setPlus(plus + 1),
      axios
        .get(`/api/contact/get`)
        .then((res) => {
          setContact(res.data);
          setLoading(false);
        })
        .catch((error) => console.log(error))
    );
  };

  useEffect(() => {
    if(localStorage.getItem('user') == null){
      router.push('/login')
    }
    axios
      .get(`/api/contact/get`)
      .then((res) => {
        console.log(res.data)
        setContact(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [plus]);

  console.log(contact)

  const createNew = (e) => {
        e.preventDefault();
        router.push("/dashboard/contact/newContact");
      };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => product.find((prod) => prod._id === id));
    setSelectedRows(selectedRowsData)
  }

  const columns = [
    {
      field: "phoneNo",
      headerName: <b>PhoneNo</b>,
      width: 180,
    },
    {
      field: "whatsAppNo",
      headerName: <b>WhatsApp No.</b>,
      width: 180,
    },
    {
      field: "email",
      headerName: <b>Email</b>,
      width: 160,
    },
    {
      field: "timeFrom",
      headerName: <b>Schedule time from</b>,
      width: 160,
    },
    {
      field: "toTime",
      headerName: <b>Schedule time to</b>,
      width: 160,
    },
    {
      field: "action",
      headerName: <b>Action</b>,
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link href={"/dashboard/contact/" + params.row._id}>
              <button className={styles.productListEdit}>Edit</button>
            </Link>
            <DeleteOutline
              className={styles.productListDelete}
              onClick={() => deleteProduct(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className={styles.productList}>
      <h1 className={styles.addProductTitle}>Contact Info</h1>
      <Button
        variant='contained'
        onClick={createNew}
        style={{ alignContent: "left", backgroundColor: '#BE1818', marginBottom: '10px' }}
        className={styles.addProductButton}
      >
        Create New
      </Button>
      <br/>
      <div style={{width: '100%', height: '500px'}}>
      <DataGrid
        rows={contact || ""}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        // pagination
        checkboxSelection
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        // paginationMode="server"
      />
      </div>
    </div>
  );
}


ContactPage.getLayout = function PageLayout(page) {
  return <>{page}</>;
};