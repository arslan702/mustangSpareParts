import styles from './product.module.css';
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { createStyles, makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function OrderPage() {
  const classes = useStyles();
  const router = useRouter();
  const [totalOrders, setTotalOrders] = useState();
  const [pageSize, setPageSize] = useState();
  const [diff, setDiff] = useState();
  const [field, setField] = useState();
  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([])

  const [order, setOrder] = useState([]);

  const [loading, setLoading] = useState(true);

  const [plus, setPlus] = useState(0);

  const deleteOrder = (id) => {
    axios.delete(`/api/order/delete/${id}`).then(
      () => setPlus(plus + 1),
      // setOpen(false),
      axios
        .get(`/api/order/get?page=${page+1}&size=8`)
        .then((res) => {
          setOrder(res.data.orders);
          setTotalOrders(res.data.totalOrders);
          setPageSize(res.data.pageSize)
          console.log(res.data.orders)
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
      .get(`/api/order/get?page=${page+1}&size=8`)
      .then((res) => {
        setOrder(res.data.orders);
        setTotalOrders(res.data.totalOrders);
        setPageSize(res.data.pageSize)
        console.log(res.data.orders)
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [plus, page]);

  const handleDiffSearch = (e) => {
    e.preventDefault();
    axios
      .get(`/api/order/get?page=${page+1}&size=8&field=${field}&search=${diff}`)
      .then((res) => {
        setOrder(res.data.orders);
        setTotalOrders(res.data.totalOrders);
        setPageSize(res.data.pageSize)
        console.log(res.data.orders)
        setLoading(false);
      })
      .catch((error) => console.log(error));
    setDiff("");
    // setField('')
  };

  const handleDetails = (e, id) => {
    e.preventDefault();
    router.push(`/dashboard/orders/detail/${id}`);
  };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => order.find((ord) => ord._id === id));
    setSelectedRows(selectedRowsData)
  }

  const columns = [
    {
      field: "firstname",
      headerName: <b>First Name</b>,
      width: 140,
    },
    {
      field: "lastname",
      headerName: <b>Last Name</b>,
      width: 140,
    },
    {
      field: "country",
      headerName: <b>Country</b>,
      width: 160,
    },
    {
      field: "address",
      headerName: <b>Address</b>,
      width: 160,
    },
    { field: "city", headerName: <b>City</b>, width: 120 },
    {
      field: "province",
      headerName: <b>Province</b>,
      width: 120,
    },
    {
      field: "phoneNo",
      headerName: <b>Phone No.</b>,
      width: 140,
    },
    {
      field: "delivered",
      headerName: <b>Delivered</b>,
      width: 120,
    },
    {
      field: "details",
      headerName: <b>Details</b>,
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Button className={styles.productListEdit} onClick={(e) => handleDetails(e, params.row._id)}>product details</Button>
          </>
        )
      }
    },
    {
      field: "action",
      headerName: <b>Action</b>,
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link href={"/dashboard/orders/" + params.row._id}>
              <Button className={styles.productListEdit}>Edit</Button>
            </Link>
            <DeleteOutline
              className={styles.productListDelete}
              onClick={() => deleteOrder(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className={styles.productList}>
      <h1 className={styles.addProductTitle}>Orders</h1>
      <div className={classes.form}>
        <TextField 
          select
          className={classes.formFields}
          labelId="demo-select-small"
          id="demo-select-small"
          value={field}
          label="Select Field"
          onChange={(e) => setField(e.target.value)}
        >
          <MenuItem value={"firstname"}>FirstName</MenuItem>
          <MenuItem value={"lastname"}>LastName</MenuItem>
          <MenuItem value={"address"}>address</MenuItem>
          <MenuItem value={"city"}>City</MenuItem>
          <MenuItem value={"province"}>Province</MenuItem>
          <MenuItem value={"phoneNo"}>Phone No</MenuItem>
        </TextField>
        <TextField
          className={classes.formFields}
          id="outlined-required"
          label="search with different values"
          placeholder="e.g bag:shirt:cap"
          value={diff}
          onChange={(e) => setDiff(e.target.value)}
        />{" "}
        <Button
          variant='contained'
          className={classes.buttons}
          onClick={handleDiffSearch}
        >
          Search
        </Button>
      </div><br/>
      <div style={{width: '100%', height: '500px'}}>
      <DataGrid
        rows={order || ""}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        rowCount={totalOrders}
        pageSize={pageSize}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        pagination
        checkboxSelection
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        paginationMode="server"
      />
      </div>
    </div>
  );
}


OrderPage.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexWrap: 'wrap',
 
    },
    formFields: {
      flexBasis: '25%',
      margin: '10px',
      marginLeft: '0px',
      [theme?.breakpoints?.down('sm')]: {
        flexBasis: '100%',
        marginLeft: '0px',
      },
    },
    nestedField: {
      flexBasis: '',
    },
    buttons: {
      margin: '10px',
      backgroundColor: '#BE1818',
      height: '55px',
      marginLeft: '0px',
      [theme?.breakpoints?.down('sm')]: {
        flexBasis: '100%',
        marginLeft: '0px',
      },
    },
  })
);