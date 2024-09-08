import React from 'react'
import { Clock, FileText, User, Check, X } from 'lucide-react'

export default function Requests() {
  const requests = [
    { id: 1, type: 'New File', name: 'Bonafide Certificate', requester: 'John Doe', timestamp: '2023-07-10 14:30' },
    { id: 2, type: 'Verification', name: 'Merit Award Certificate', requester: 'Jane Smith', timestamp: '2023-07-09 11:15' },
    { id: 3, type: 'New File', name: 'Medical Certificate', requester: 'Alice Johnson', timestamp: '2023-07-08 09:45' },
    { id: 4, type: 'Verification', name: 'School Leaving Certificate', requester: 'Bob Williams', timestamp: '2023-07-07 16:20' },
  ]

  return (
    <div className='bg-primaryBlack min-h-screen p-8 flex justify-center items-center pt-12'>
    <div className='w-full max-w-4xl pl-20'>
        <h1 className='text-4xl font-bold text-white mb-16'>Requests</h1>
      <div className='grid gap-6'>
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  </div>
  )
}

function RequestCard({ request }) {
  return (
    <div className='bg-[#1C1F2E] rounded-lg p-6 shadow-lg w-[700px]'>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h2 className='text-xl font-semibold text-white mb-2'>{request.name}</h2>
        </div>
        <RequestStatus type={request.type} />
      </div>
      <div className='flex items-center text-gray-400 mb-2'>
        <User size={18} className='mr-2' />
        <span>{request.requester}</span>
      </div>
      <div className='flex items-center text-gray-400 mb-5'>
        <Clock size={18} className='mr-2' />
        <span>{request.timestamp}</span>
      </div>
      <div className='flex justify-end space-x-4'>
        <button className='px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center'>
          <X size={18} className='mr-2' />
          Reject
        </button>
        <button className='px-3 py-1.5 bg-[#27E8A7] text-black rounded-md hover:bg-[#20C08F] transition-colors flex items-center'>
          <Check size={18} className='mr-2' />
          Approve
        </button>
      </div>
    </div>
  )
}

function RequestStatus({ type }) {
  const bgColor = type === 'New File' ? 'bg-blue-500' : 'bg-purple-500'
  return (
    <div className={`${bgColor} text-white text-sm font-medium px-3 py-1 rounded-full flex items-center`}>
      <FileText size={14} className='mr-1' />
      {type}
    </div>
  )
}