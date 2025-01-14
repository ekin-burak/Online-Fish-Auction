import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// import { useAsync } from "react-async"

const Container = styled.div`
  margin: 100px 0 0 0;
`
const Title = styled.h2`
    font-weight: 700;
    color: #1b4171;
    text-align: center;
    margin-top: 80px;
    margin-bottom: 40px;
`

function BasicTable(rows) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#EEEEEE' }}>
            <TableCell> <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>Balık Cinsi</Typography></TableCell>
            <TableCell align="right"><Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>Kg</Typography></TableCell>
            <TableCell align="right"><Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>Başlangıç Fiyatı</Typography></TableCell>
            <TableCell align="right"><Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>Balıkçı</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.fishType}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.fishType}
              </TableCell>
              <TableCell align="right">{row.amountKg}</TableCell>
              <TableCell align="right">{row.basePrice}</TableCell>
              <TableCell align="right">{row.sellerName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const FishTable = () => {
  const { auctionId } = useParams()
  const [error, setError] = useState(null);
  const [currentFishList, setCurrentFishList] = useState([]);

  useEffect(() => {
    fetch(`https://balikliova-mezat-g7.herokuapp.com/auction/auctionId/${auctionId}`)
      .then(res => res.json())
      .then(
        (result) => {
          setCurrentFishList(result.fishList);
        },
        (error) => {
          setError(error);
          console.log(error);
        })
  }, []
  );

  const [userName, setUserName] = useState("");
  const getName = (id) => {
    fetch(`https://balikliova-mezat-g7.herokuapp.com/users/${id}`)
      .then(
        (result) => {
          setUserName(result)
        },
        (error) => {
          setError(error);
          console.log(error);
        })
    return userName
  }



  const fishData = []

  for (let i = 0; i < currentFishList.length; i++) {
    // console.log(getName(getName(currentFishList[i].sellerId)));
    // console.log(getName(currentFishList[i].sellerId))
    const fishObj = {
      fishType: currentFishList[i].fishType,
      amountKg: currentFishList[i].fishAmount,
      basePrice: currentFishList[i].basePrice,
      sellerName: currentFishList[i].sellerId
    }
    fishData.push(fishObj)
  }

  return (
    <Container>
      <Title> Mezatta Satılacak Balıklar</Title>
      {BasicTable(fishData)}
    </Container>
  )
}

export default FishTable
