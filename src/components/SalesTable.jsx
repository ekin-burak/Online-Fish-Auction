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
            <TableCell align="right"><Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>Satış Fiyatı</Typography></TableCell>
            <TableCell align="right"><Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>Satın Alan</Typography></TableCell>          
            <TableCell align="right"><Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>Satış Tarihi</Typography></TableCell>
            <TableCell align="right"><Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>Mezat Numarası</Typography></TableCell>
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
              <TableCell align="right">{row.soldPrice}</TableCell>
              <TableCell align="right">{row.sellerName}</TableCell>
              <TableCell align="right">{row.soldDate}</TableCell>
              <TableCell align="right">{row.auctionId}</TableCell>
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
    fetch(`https://balikliova-mezat-g7.herokuapp.com/package/allSoldPackage`)
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
  if(currentFishList){
    for (let i = 0; i < currentFishList.length; i++) {
      const fishObj = {
        fishType: currentFishList[i].fishType,
        amountKg: currentFishList[i].fishAmount,
        basePrice: currentFishList[i].basePrice,
        soldPrice: currentFishList[i].soldPrice,
        sellerName: currentFishList[i].sellerName,
        soldDate: currentFishList[i].soldDate,
        auctionId: currentFishList[i].auctionId
      }
      fishData.push(fishObj)
    }
  }

 

  return (
    <Container>
      <Title> Satılan Balıklar</Title>
      {BasicTable(fishData)}
    </Container>
  )
}

export default FishTable