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
import logo from '../../assets/Maladie-de-peau.jpg'
import Modal from 'react-bootstrap/Modal';
import ModalLogout from './ModalLogout'
import Button from 'react-bootstrap/Button';
import Form_diagnostics from '../form/form_diagnostics'
import Form_detail_diagnostic from '../form/form_chart_diagnostic'

export default function PatientConsultation() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [modalIsOpen3, setModalIsOpen3] = useState(false);
    const [modalIsOpen4, setModalIsOpen4] = useState(false);
    const [modalIsOpen5, setModalIsOpen5] = useState(false);
    const [details, setDetails] = useState([]);

    const [data, setData] = useState([])
    const [filtredData, setFiltredData] = useState([])
    const { consultation, userData, path ,updateDiagnostics} = useUserData();
    const [doctor, setDoctor] = useState("")
    const [loading, setLoading] = useState(true)

    const tableRef = useRef(null);
    let params = useParams()

      useEffect(() =>{
        if(params._id && params.consultation_id){
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let response = axios.get(`${path}/api/consultations/diagnostics/${params.consultation_id}`).
            then((response) =>{
                setData(response.data)
            }).catch((error) =>{
                console.log(error);
            })
        }

      },[params._id,params.consultation_id])

      const transformDate = (dateString)=> {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
      }
      const handleFilter = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const newdata = filtredData.filter(row => 
          row.probability.toLowerCase().includes(searchValue) || 
          row.maladie.nom.toLowerCase().includes(searchValue) ||
          row.dateDiagnostic.toLowerCase().includes(searchValue) 
          // row.statut.toLowerCase().includes(searchValue)
        );
        setData(newdata);
      }
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      

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



  const deleteConsultation =()=>{
    setShow(!show)
  }
  const ConfirmDelete = () =>{
    console.log("delete");
  }

  const validerDiagnostics = () =>{
    console.log("valider");
  }

  const detailsDiagnostics =() =>{
    console.log("Details diagnostics");
  }

  const editDiagnostics = () =>{
    console.log("edit ...");
  }

  const fNewDiagnostic = () => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
}
  
  return (
    <>
    <button className='btn btn-primary m-2 btn-sm btn-block' style={{width:"100px"}} onClick={fNewDiagnostic}>New diagnostic</button>
    <h4 className=''>Diagnostics list</h4>
    <div className='d-flex justify-content-end'>
      <input type='text' placeholder='Search...' className='p-1 m-2' onChange={handleFilter}/>
    </div>
    <Table striped bordered responsive className='p-1 m-2' ref={tableRef}>
    <thead>
            <th>Date</th>
            <th>Hour</th>
            <th>Disease</th>
            <th>probability</th>
            <th>image</th>
            <th>Actions</th>
          </thead>

          <tbody>
            {
              data.length !== 0 ? (
                data.map((item, index) => (
                  <tr key={index}> 
                    <td>{transformDate(item.dateDiagnostic)}</td>
                    <td>{new Date(item.dateDiagnostic).getHours()-1}:{new Date(item.dateDiagnostic).getMinutes()}</td>
                    <td>{item.maladie.nom}</td>
                    <td>{item.probability}</td>
                    <td className='text-center justify-content-center d-flex'><img src={logo} style={{ Width: '30px', height:"45px" }}/></td>
                
                    <td>
                      {userData.role.includes('medecin') && !userData.role.includes('admin') && (
                        <>
                            <span>
                                <button className=' btn btn-primary m-1' title='edit' onClick={() => editDiagnostics()}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </span>
                            <span>
                                <button className='btn btn-danger m-1' title='deletion' onClick={() => deleteConsultation()}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </span>
                            <span>
                                <button className='btn btn-dark m-1' title='details of the diagnostic' onClick={() => detailsDiagnostics()}>
                                    <FontAwesomeIcon icon={faClipboardUser} />
                                </button>
                            </span>
                            <span>
                                <button className='btn btn-success m-1' title='validate diagnosis' onClick={() => validerDiagnostics()}>
                                    <FontAwesomeIcon icon={faLungsVirus} />
                                </button>
                            </span>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )
        
              : (
                loading && (
                  <tr>
                      <td colSpan="6">
                        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }} className="text-center">
                          <CircularProgress />
                        </Box>
                      </td>
                    </tr>
  
                )
              )}
          </tbody>
    </Table>

    {/* <ModalLogout title="test" text="text" canShow={true}/> */}

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete it ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() =>ConfirmDelete()} >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {modalIsOpen && <Form_diagnostics open={modalIsOpen} consult_id={consultation?._id} />}
      {/* {modalIsOpen4 && <Form_detail_diagnostic open={modalIsOpen4} details={[]} type="column" diagnostic={[]} />} */}

    </>
  )
}
