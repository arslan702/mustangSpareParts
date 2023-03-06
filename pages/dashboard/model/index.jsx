import styles from './category.module.css';
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Button, Chip } from "@mui/material";
import axios from "axios";
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ModelPage() {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState([])

  const [models, setModels] = useState([]);

  const [loading, setLoading] = useState(true);

  const [plus, setPlus] = useState(0);

  const deleteModel = (id) => {
    axios.delete(`/api/model/delete/${id}`).then(
      () => setPlus(plus + 1),
      axios
        .get(`/api/model/get`)
        .then((res) => {
          setModels(res.data);
          setLoading(false);
        })
        .catch((error) => console.log(error))
    );
  };

  useEffect(() => {
    axios
      .get(`/api/model/get`)
      .then((res) => {
        setModels(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [plus]);

  const createNew = (e) => {
    e.preventDefault();
      router.push("/dashboard/model/newModel");
  };

  const handleDetails = (e, id) => {
    e.preventDefault();
      router.push(`/dashboard/model/detail/${id}`);
  };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => product.find((prod) => prod._id === id));
    setSelectedRows(selectedRowsData)
  }

  const columns = [
    {
      field: "name",
      headerName: <b>Manufacturer</b>,
      width: 180,
    },
    {
      field: "model",
      headerName: <b>Models</b>,
      width: 500,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.model?.map((sub, index) => (
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
            <Link href={"/dashboard/model/" + params.row._id}>
              <Button className={styles.productListEdit}>Edit</Button>
            </Link>
            <DeleteOutline
              className={styles.productListDelete}
              onClick={() => deleteModel(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className={styles.productList}>
      <h1 className={styles.addProductTitle}>Manufacturers and Models</h1>
      <Button
        variant='contained'
        onClick={createNew}
        style={{ alignContent: "left", marginBottom: '10px', backgroundColor: '#BE1818' }}
        className={styles.addProductButton}
      >
        Add New Manfacturer
      </Button>
      <div style={{width: '100%', height: '500px'}}>
      <DataGrid
        rows={models || ""}
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


ModelPage.getLayout = function PageLayout(page) {
  return <>{page}</>;
};