import styles from './category.module.css';
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Button, Chip, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function CategoryPage() {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState([])

  const [category, setCategory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [plus, setPlus] = useState(0);

  const deleteCategory = (id) => {
    axios.delete(`/api/category/delete/${id}`).then(
      () => setPlus(plus + 1),
      axios
        .get(`/api/category/get`)
        .then((res) => {
          setCategory(res.data);
          setLoading(false);
        })
        .catch((error) => console.log(error))
    );
  };

  useEffect(() => {
    axios
      .get(`/api/category/get`)
      .then((res) => {
        setCategory(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [plus]);

  const createNew = (e) => {
        e.preventDefault();
        router.push("/dashboard/category/newCategory");
      };


  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => product.find((prod) => prod._id === id));
    setSelectedRows(selectedRowsData)
  }

  const handleDetails = (e, id) => {
    e.preventDefault();
    router.push(`/dashboard/category/detail/${id}`);
  };

  const columns = [
    {
      field: "category",
      headerName: <b>Category</b>,
      width: 180,
    },
    {
      field: "subCategory",
      headerName: <b>Sub Category</b>,
      width: 400,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.subCategory?.map((sub, index) => (
              <Chip key={index} label={sub} sx={{color: '#BE1818', border: '2px solid #BE1818', margin: '2px', backgroundColor:'white'}}/>
            ))}
          </>
        )
      }
    },
    {
      field: "details",
      headerName: <b>Details</b>,
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Button className={styles.productListEdit} onClick={(e) => handleDetails(e, params.row._id)}>view detail</Button>
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
            <Link href={"/dashboard/category/" + params.row._id}>
              <Button className={styles.productListEdit}>Edit</Button>
            </Link>
            <DeleteOutline
              className={styles.productListDelete}
              onClick={() => deleteCategory(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className={styles.productList}>
      <h1 className={styles.addProductTitle}>Categories</h1>
      <Button
        variant='contained'
        onClick={createNew}
        style={{ alignContent: "left", marginBottom: '10px', backgroundColor: '#BE1818' }}
        className={styles.addProductButton}
      >
        Create New Category
      </Button>
      <div style={{width: '100%', height: '500px'}}>
      <DataGrid
        rows={category || ""}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pagination
        checkboxSelection
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        paginationMode="server"
      />
      </div>
    </div>
  );
}


CategoryPage.getLayout = function PageLayout(page) {
  return <>{page}</>;
};