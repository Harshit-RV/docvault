import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOutIcon, LogInIcon, PlusIcon } from 'lucide-react'

export default function Component() {
  const [joinPopup, setJoinPopup] = useState(false)
  const [leavePopup, setLeavePopup] = useState(false)
  const [address, setAddress] = useState('')
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [organizations, setOrganizations] = useState([
    { name: "Acme Corp", address: "0x1234...5678" },
    { name: "TechNova", address: "0xabcd...efgh" },
    { name: "Green Energy", address: "0x9876...5432" },
    { name: "Future Finance", address: "0xijkl...mnop" },
  ])

  const handleJoinPopup = () => {
    setJoinPopup(!joinPopup)
  }

  const handleLeavePopup = (org) => {
    setSelectedOrg(org)
    setLeavePopup(true)
  }

  const handleJoin = () => {
    if (address) {
      setOrganizations([...organizations, { name: `Org ${organizations.length + 1}`, address }])
      setAddress('')
      setJoinPopup(false)
      toast.success("Successfully joined the organization!")
    } else {
      toast.error("Please enter a valid wallet address.")
    }
  }

  const handleLeave = () => {
    const updatedOrganizations = organizations.filter(org => org !== selectedOrg)
    setOrganizations(updatedOrganizations)
    setLeavePopup(false)
    toast.info("You have left the organization.")
  }

  const handleEnter = (org) => {
    toast.info(`Entering ${org.name}...`)
    // Add logic for entering an organization
  }

  return (
    <div className='min-h-screen bg-gray-900 p-16'>
      <div className="flex justify-between items-center mb-14 px-12">
        <h1 className="text-white font-bold text-3xl">My Organizations</h1>
        <Button 
          onClick={handleJoinPopup}
          className='bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors'
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Join New
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12">
        {organizations.map((org, index) => (
          <Card key={index} className="bg-gray-800 text-white border border-gray-700 flex flex-col justify-between h-[250px]">
            <CardContent className="pt-6">
              <h2 className="text-3xl font-semibold mb-4">{org.name}</h2>
              <p className="text-md text-gray-400">{org.address}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleLeavePopup(org)}
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                <LogOutIcon className="mr-2 h-4 w-4" /> Leave
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleEnter(org)}
                className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white"
              >
                <LogInIcon className="mr-2 h-4 w-4" /> Enter
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {joinPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 py-8 px-10 w-96 rounded-lg shadow-lg">
            <h2 className="text-white font-semibold text-lg mb-4">Join a New Organization</h2>
            <input 
              type="text" 
              placeholder="Enter Organization's Wallet Address" 
              className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 text-white rounded focus:outline-none focus:border-emerald-500" 
              value={address}
              onChange={(e) => setAddress(e.target.value)} 
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleJoinPopup}
                variant="secondary"
                className="mr-2"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleJoin}
                className="bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
              >
                Join
              </Button>
            </div>
          </div>
        </div>
      )}

      {leavePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 py-8 px-10 w-96 rounded-lg shadow-lg">
            <h2 className="text-white font-semibold text-lg mb-4">Confirm Leave</h2>
            <p className="text-gray-300 mb-4">Are you sure you want to leave {selectedOrg.name}?</p>
            <div className="flex justify-end">
              <Button 
                onClick={() => setLeavePopup(false)}
                variant="secondary"
                className="mr-2"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleLeave}
                className="bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              >
                Leave
              </Button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}