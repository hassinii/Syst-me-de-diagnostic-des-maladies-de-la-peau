import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader';

import { calculateRange, sliceData } from '../../utils/table-pagination';

// import './style.css';
import { useUserData } from '../../contexts/UserDataContext';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import Form from '../../components/form/form_medecin';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import Form_confirm_delete from '../../components/form/form_delete';
import { MDBIcon } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye, faHouseMedicalFlag } from '@fortawesome/free-solid-svg-icons';
import Form_Medecin from '../../components/form/form_medecin';
import Profile from '../profiles/Profile';
import { fetchMedecin } from '../../components/fetchElement/fetchMedecins';
import { fetchMedecinRdvs } from '../../components/fetchElement/fetchRdvs';
import Transition from '../../constants/transition';
import { Table } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck, FaUser, FaHospitalUser, FaHospitalSymbol, FaHospital } from 'react-icons/fa'

function Medecins() {
  const { medecins, updateRdvs } = useUserData();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [filteredMedecins, setFilteredMedecins] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [modalIsOpen3, setModalIsOpen3] = useState(false);
  const [modalIsOpen4, setModalIsOpen4] = useState(false);
  const [modalIsOpen5, setModalIsOpen5] = useState(false);
  const { medecin, updateMedecin, updatePatient, updateSecretaire, isPatient, isMedecin } = useUserData()
  const { userData, path } = useUserData();

  updatePatient(null);
  updateSecretaire(null);
  // updateMedecin(null);

  const openModal = () => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };


  useEffect(() => {
    setPagination(calculateRange(medecins, 5));
    setFilteredMedecins(sliceData(medecins, page, 5));
  }, [medecins]);

  // Search
  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== '') {
      let search_results = medecins.filter(
        (medecin) =>
          medecin.nom.toLowerCase().includes(search.toLowerCase()) ||
          medecin.prenom.toLowerCase().includes(search.toLowerCase())||
          medecin.tel.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredMedecins(search_results);
    } else {
      __handleChangePage(1);
    }
  };

  // Change Page
  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setFilteredMedecins(sliceData(medecins, new_page, 5));
  };

  const fupdate = (user_id) => {
    fetchMedecin(path,user_id, updateMedecin);
    modalIsOpen2 ? setModalIsOpen2(false) : setModalIsOpen2(true);
  }

  const fdelete = (user_id) => {
    fetchMedecin(path,user_id, updateMedecin);
    modalIsOpen3 ? setModalIsOpen3(false) : setModalIsOpen3(true);
  }

  const fview = (user_id) => {
    fetchMedecin(path,user_id, updateMedecin);
    if (medecin && medecin._id == user_id) {
      modalIsOpen4 ? setModalIsOpen4(false) : setModalIsOpen4(true);
    }
  }

  const fmesRdvs = (user_id) => {
    isPatient(true)
    isMedecin(false)
    fetchMedecinRdvs(path,user_id, updateRdvs);
    modalIsOpen5 ? setModalIsOpen5(false) : setModalIsOpen5(true);
  }

  return (
    <Transition>
      <div className='dashboard-content'>
      <div className='dashbord-header-container'>
        <button className='dashbord-header-btn' onClick={()=>{
          setModalIsOpen(false)
          setModalIsOpen4(false)
          setModalIsOpen2(false)
          setModalIsOpen3(false)
          setModalIsOpen5(false)
          openModal()
          }}>New Doctor</button>
        <div className='dashbord-header-right'>
          <img
            src={NotificationIcon}
            alt='notification-icon'
            className='dashbord-header-icon' />
          <img
            src={SettingsIcon}
            alt='settings-icon'
            className='dashbord-header-icon' />
          <img
            className='dashbord-header-avatar'
            src={userData.photo} />
        </div>
      </div>

      <div className='dashboard-content-container'>
        <div className='dashboard-content-header'>
          <h4>Doctors list</h4>
          <div className='dashboard-content-search'>
            <input
              type='text'
              value={search}
              placeholder='Search..'
              className='dashboard-content-input'
              onChange={(e) => __handleSearch(e)}
            />
          </div>
        </div>

        <Table striped bordered responsive>
          <thead>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>USERNAME</th>
            {/* <th>Adresse</th> */}
            <th>PHONE</th>
            <th>GENDER</th>
            <th>ACTIONS</th>
          </thead>

          {filteredMedecins.length !== 0 ? (
            <tbody>
              {filteredMedecins.map((medecin, index) => (
                <tr key={index}>
                  <td>
                    <span>{medecin.nom}</span>
                  </td>
                  <td>
                    <span>{medecin.prenom}</span>
                  </td>
                  <td>
                    <span>{medecin.username}</span>
                  </td>
                  <td>
                    <span>{medecin.tel}</span>
                  </td>
                  <td>
                    <span>{medecin.genre}</span>
                  </td>
                  <td className='row'>
                    {userData.role.includes('admin') &&
                      <>
                        <span >
                        <FaEdit
                        title='Edit'
                          onClick={() => {
                            setModalIsOpen(false)
                            setModalIsOpen4(false)
                            setModalIsOpen2(false)
                            setModalIsOpen3(false)
                            setModalIsOpen5(false)
                            fupdate(medecin._id)
                          }}
                            style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }}
                          />
                          <FaTrash
                          title='Delete'
                            onClick={() => {
                              setModalIsOpen(false)
                              setModalIsOpen4(false)
                              setModalIsOpen2(false)
                              setModalIsOpen3(false)
                              setModalIsOpen5(false)
                              fdelete(medecin._id)
                            }}
                            style={{ cursor: 'pointer', color: 'red', marginRight: '10px' }}
                          />
                          <FaUser
                          title='Profil'
                          onClick={() => {
                            setModalIsOpen(false)
                            setModalIsOpen4(false)
                            setModalIsOpen2(false)
                            setModalIsOpen3(false)
                            setModalIsOpen5(false)
                            fview(medecin._id)
                          }}
                            style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }}
                          />
                          
                            <Link to={`/dashboard/appointment/medecin/${medecin._id}`}>
                                <FaHospital  title="Doctor Appointment" style={{ cursor: 'pointer', color: 'orange', marginRight: '10px' }} />
                            </Link>
                        </span >
                      </>
                    }

                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </Table>

        {filteredMedecins.length !== 0 ? (
          <div className='dashboard-content-footer'>
            {pagination.map((item, index) => (
              <span
                key={index}
                className={item === page ? 'active-pagination' : 'pagination'}
                onClick={() => __handleChangePage(item)}>
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className='dashboard-content-footer'>
            <span className='empty-table'>No data</span>
          </div>
        )}
      </div>
        {modalIsOpen && <Form_Medecin open={modalIsOpen} />}
        {modalIsOpen2 && <Form_Medecin open={modalIsOpen2} medecinToUpdate={medecin} />}
        {modalIsOpen3 && <Form_confirm_delete open={modalIsOpen3} userToDelete={medecin} />}
        {modalIsOpen4 && <Profile />}
        {/* {modalIsOpen5 && <Navigate to="/dashboard/rdv" />} */}
    </div>
    </Transition>
  );
}

export default Medecins;