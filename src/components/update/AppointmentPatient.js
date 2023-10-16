import React, { useRef } from 'react'
import { useState } from 'react'
import { useUserData } from '../../contexts/UserDataContext'
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function AppointmentPatient(user, user_id) {
  useEffect(() =>{
    console.log("appointment page for patient");
  })
  return (
    <>
    <h4 className='m-3'>Appointment List for the doctor : <span className='text-success'></span></h4>
    <div className='d-flex justify-content-end'>
      <input type='text' placeholder='Search...' className='p-1 m-2' />
    </div>
    <Table striped bordered responsive>
    <thead>
            <th>Patient</th>
            {/* <th>Doctor</th> */}
            <th>Phone</th>
            <th>date</th>
            {/* <th>Hour</th> */}
            <th>Statut</th>
          </thead>

          <tbody>
          
          </tbody>
    </Table>
    </>
  )
}
