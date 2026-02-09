import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';

function ProtectedRoute({element}) {
    const {isAuthenticated,loading} = useSelector((state) => state.user);
    if(loading){
        return <Loader />
       
    }
    if(!isAuthenticated){
        return <Navigate to='/login' />
    }
  return element
}

export default ProtectedRoute