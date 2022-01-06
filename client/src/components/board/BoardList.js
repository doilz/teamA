import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Paging.css'; 
import Pagination from "react-js-pagination";
// import Paper from '@mui/material/Paper';


const Paging = () => {
  let navigate = useNavigate(); 
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => { 
    setPage(page); 
    console.log(page)
    navigate(`/board/list/${page}`);
  }; 
  return (
    <Pagination 
    activePage={page}
    itemsCountPerPage={10}
    totalItemsCount={21}
    pageRangeDisplayed={5}
    prevPageText={"‹"}
    nextPageText={"›"}
    onChange={handlePageChange} 
    />
  ); 
}; 

export default function BoardList() {
  const [inputData, setInputData] = useState([{
    bidx: '',
    buserid: '',
    btitle: '',
    bcontent: '',
    regdate: '',
    modidate: '',
    bhit: '',
    blikeuser: ''
  }])


  const callApi = async() => {
    const response = await axios.get("http://localhost:5000/api/boards")
    // const _inputData = await response.data.map((rowData) => ({
    //   bidx: rowData.bidx,
    //   title: rowData.btitle,
    //   content: rowData.bcontent,
    //   writer: rowData.bidx,
    //   write_date: rowData.bidx,
    // }))
    console.log(inputData)
    console.log(response.data)
    setInputData([...inputData,...response.data])
  }
  
  useEffect(() => {
    callApi();
  }, []);

  console.log(inputData)
  // return (inputData.map(a => {
  //   return (<div>{a.buserid}</div>)
  // })
  // )


  return (
    <>
    <TableContainer >
      <Table sx={{ maxWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>index</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">hit</TableCell>
            <TableCell align="right">userid</TableCell>
            <TableCell align="right">regdate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inputData.map((row) => (
            <TableRow
              key={row.bidx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.buserid}
              </TableCell>
              <TableCell align="right">{row.btitle}</TableCell>
              <TableCell align="right">{row.bhit}</TableCell>
              <TableCell align="right">{row.regdate}</TableCell>
              <TableCell align="right">{row.modidate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Paging />
    </>
  );
}
