import React from 'react'
// Import All For Firebase
import { useState, useEffect } from 'react'
import { db } from '../../index'
import { useContext } from 'react'
import { Context } from '../../index'


import './styles.css'

const Home = ({ user }) => {
  const {auth} = useContext(Context)

  // Get All Tasks From Database
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (user?.uid) {
      db.collection('users').doc(user.uid).get().then((snapshot) => {
        setUserData(snapshot.data())
      })
    }
  }, [user?.uid]);

  return (
    <>
      <div className='home flex pt-6 px-6 items-center flex-wrap'>
        <div className="profile_img flex flex-col items-center">
          <img className="rounded-full" src={userData?.photoURL} alt='img' />
          <h1 className='text-xl mt-3'>{userData?.name}</h1>
        </div>
      </div>
      <div className="profile_content">
        <h1 className="text-2xl mt-3">Rank: {userData?.finishedTasks < 5 ? <span className='text-blue-600'>Beginning</span> : userData?.finishedTasks >= 5 && userData?.finishedTasks < 10 ? <span className='text-orange-500'>Advanced</span> : userData?.finishedTasks >= 10 ? <span className='text-purple-700'>Master</span> : "Noob"}</h1>
        <h1 className="text-2xl mt-3">Finished Tasks: <span>{userData?.finishedTasks}</span></h1>
      </div>
      <button className="custom_button mt-10" onClick={()=>auth.signOut()}>Log Out</button>
    </>
  )
}

export default Home