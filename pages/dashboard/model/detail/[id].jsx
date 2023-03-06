import { Button, Chip } from "@mui/material";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react"
import styles from "./detail.module.css";

const ManufacturerDetails = () => {
  const navigate = useRouter();
  let { id } = navigate.query;

  const [name, setName] = useState([]);
  const [model, setModel] = useState([]);
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/model/getOne/${id}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        setName(result?.name);
        setModel(result?.model);
        setImg(result?.img)
        setLoading(false);
      })
      .catch((error) => console.log('error', error));
  }, [id]);

  const back = (e) => {
    e.preventDefault();
    navigate.push('/dashboard/model')
  }

  return (
    <Fragment>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          <div className={styles.ProductDetails}>
            <div>
                {img &&
                    <img
                      className={styles.CarouselImage}
                      src={img[0]?.url}
                      alt={`category img`}
                    />
                  }
            </div>

            <div>
              <div className={styles.detailsBlock2}>
                <h2>Manufacturer: {name}</h2>
              </div>
              <div className={styles.detailsBlock2}>
                <h3>Models: </h3>
              </div>
              {model?.map((sub, index) => (
                  <Chip key={index} label={sub} sx={{color: '#BE1818', border: '2px solid #BE1818', margin: '2px', backgroundColor:'white'}}/>
                ))}
            </div>
          </div>
          <Button onClick={(e) => back(e)} style={{alignContent: 'flex-start', width: '100px'}}>Back</Button>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ManufacturerDetails;

ManufacturerDetails.getLayout = function PageLayout(page) {
  return <>{page}</>;
};