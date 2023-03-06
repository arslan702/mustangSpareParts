import styles from './user.module.css';
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
// import { useRouter } from 'next/router';
import Link from 'next/link';

export default function UsersPage() {
  // const router = useRouter();
  const [selectedRows, setSelectedRows] = useState([])

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [plus, setPlus] = useState(0);

  const deleteUser = (id) => {
    axios.delete(`/api/auth/delete/${id}`).then(
      () => setPlus(plus + 1),
      setOpen(false),
      axios
        .get(`/api/auth/get`)
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((error) => console.log(error))
    );
  };

  useEffect(() => {
    axios
      .get(`/api/auth/get`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [plus]);

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => product.find((prod) => prod._id === id));
    setSelectedRows(selectedRowsData)
  }

  const columns = [
    {
      field: "userName",
      headerName: <b>Name</b>,
      width: 180,
    },
    {
      field: "email",
      headerName: <b>Email</b>,
      width: 300,
    },
    {
      field: "status",
      headerName: <b>Status</b>,
      width: 180,
    },
    {
      field: "action",
      headerName: <b>Action</b>,
      width: 150,
      renderCell: (params) => {
        return (
          <>
          {/* {params?.row?.role !== 'admin' ?  */}
          <>
            <Link href={"/dashboard/users/" + params.row._id}>
              <Button className={styles.userListEdit}>Edit</Button>
            </Link>
            <DeleteOutline
              className={styles.userListDelete}
              onClick={() => deleteUser(params.row._id)}
            />
            </>
          {/* // : ''} */}
          </>
        );
      },
    },
  ];

  return (
    <div className={styles.productList}>
      <h1 className={styles.addProductTitle}>Users</h1>
      <div style={{width: '100%', height: '500px'}}>
      <DataGrid
        rows={users || ""}
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


UsersPage.getLayout = function PageLayout(page) {
  return <>{page}</>;
};