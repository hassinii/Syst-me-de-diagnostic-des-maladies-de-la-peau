import React, { useRef } from 'react'
import { useState } from 'react'
import { useUserData } from '../../contexts/UserDataContext'
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { faEdit, faTrashAlt, faClipboardUser, faSuitcaseMedical, faLungsVirus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate } from 'react-router-dom';

export default function TodayVisit() {
    const [data, setData] = useState([])
    const [filtredData, setFiltredData] = useState([])
    const { consultation, userData, path ,updateDiagnostics} = useUserData();
    const [doctor, setDoctor] = useState("")
    const [loading, setLoading] = useState(true)

    const tableRef = useRef(null);
    let _id = localStorage.getItem("user_id")







      useEffect(() =>{
        if(_id){
            let response = axios.get(`${path}/api/visite/dermatolog/today/${_id}`)
            .then(response =>{
              setLoading(false)
              setDoctor(response.data[0].doctor)
              setData(response.data)
              setFiltredData(response.data)
            }).catch(error =>{
              setLoading(false)
              if(error.response && error.response.statut ===404){
                console.log("No data for this doctor");
              }
              else{
                console.log("somethings go wrong");
              }
            })
        }

      },[_id])

      const transformDate = (date) =>{
        const fullDate = new Date(date);
        const formattedDate = fullDate.toLocaleString('en-US', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        return formattedDate;
      }
      const handleFilter = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const newdata = filtredData.filter(row => 
          row.patient.toLowerCase().includes(searchValue) || 
          row.medecin.toLowerCase().includes(searchValue) ||
          row.patient_tel.toLowerCase().includes(searchValue) 
          // row.statut.toLowerCase().includes(searchValue)
        );
        setData(newdata);
      }


      

      const itemsPerPage = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of items to display based on currentPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const deleteRdv = async(id) =>{
    console.log("delete rdv "+id);
  }

  const toDiagnostic = (id) =>{
    console.log(id);
  }


  
  return (
    <>
    <h4 className='m-3'>Today visit</h4>
    <div className='d-flex justify-content-end'>
      <input type='text' placeholder='Search...' className='p-1 m-2' onChange={handleFilter}/>
    </div>
    <Table striped bordered responsive className='p-1 m-2' ref={tableRef}>
    <thead>
            <th>Patient</th>
            {/* <th>Doctor</th> */}
            <th>Phone</th>
            <th>date</th>
            <th>Hour</th>
            <th>Actions</th>
          </thead>

          <tbody>
            {
              data.length !== 0 ? (
                data.map((item, index) => (
                  <tr key={index}> {/* Add a unique key for each row */}
                    <td>{item.patient}</td>
                    {/* <td>{item.medecin}</td> */}
                    <td>{item.patient_tel}</td>
                    <td>{transformDate(item.dateDebutRdv)}</td>
                    {/* <td>{new Date(item.dateDebutRdv).getFullYear()}/{new Date(item.dateDebutRdv).getMonth()}/{new Date(item.dateDebutRdv).getDay()}</td> */}
                    <td>{new Date(item.dateDebutRdv).getHours()-1}:{new Date(item.dateDebutRdv).getMinutes()}0</td>
                    <td>
                    <span>
                        <button className='btn btn-danger display-flex m-1' title='deletion' onClick={() => deleteRdv(item.id)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </span>
                      {userData.role.includes('medecin') && !userData.role.includes('admin') && (
                        <span>
                        <button className='btn btn-dark display-flex m-1' title='diagnostics' onClick={() => deleteRdv(item.id)}>
                        <Link to={`/dashboard/user/${item.patient_id}/diagnostic/${item.consultation_id}`}>
                        <FontAwesomeIcon icon={faClipboardUser} />
                        </Link>
                        </button>
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )
        
              : (
                loading && (
                  <tr>
                      <td colSpan="5">
                        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }} className="text-center">
                          <CircularProgress />
                        </Box>
                      </td>
                    </tr>
  
                )
              )}
          </tbody>
    </Table>
    </>
  )
}
