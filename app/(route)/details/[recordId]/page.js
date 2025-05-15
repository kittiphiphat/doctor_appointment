'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import DoctorDetail from '../_components/DoctorDetail'
import DoctorSuggestionList from '../_components/DoctorSuggestionList'


function Details() {
  const params = useParams()
  const recordId = params?.recordId
  const [doctor, setDoctor] = useState(null)

  useEffect(() => {
    if (recordId) {
      getDoctorById(recordId)
    }
  }, [recordId])

  const getDoctorById = (id) => {
    GlobalApi.getDoctorById(id).then(resp => {
      console.log(resp.data.data)
      setDoctor(resp.data.data)
    })
  }

  return (
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-2 p-8'>
      
      <div className='col-span-1 lg:col-span-3'>
        {doctor && <DoctorDetail doctor={doctor} />}
      </div>

      
      <div className='col-span-1'>
        <DoctorSuggestionList />
      </div>
    </div>

  )
}

export default Details
