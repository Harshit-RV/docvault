import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOutIcon, PlusIcon } from 'lucide-react'

export default function Component() {
  const [popup, setPopup] = useState(false)
  const [address, setAddress] = useState('')
  const [organizations, setOrganizations] = useState([
    { name: "Acme Corp", address: "0x1234...5678" },
    { name: "TechNova", address: "0xabcd...efgh" },
    { name: "Green Energy", address: "0x9876...5432" },
    { name: "Future Finance", address: "0xijkl...mnop" },
  ])

  const handlePopup = () => {
    setPopup(!popup)
  }

  const handleJoin = () => {
    if (address) {
      console.log("Joining organization with address:", address)
      setOrganizations([...organizations, { name: `Org ${organizations.length + 1}`, address }])
      setAddress('')
      setPopup(false)
      toast.success("Successfully joined the organization!")
    } else {
      toast.error("Please enter a valid wallet address.")
    }
  }

  const handleLeave = (index) => {
    const updatedOrganizations = organizations.filter((_, i) => i !== index)
    setOrganizations(updatedOrganizations)
    toast.info("You have left the organization.")
  }

  return (
    <div className='min-h-screen bg-primaryBlack p-16'>
      <div className="flex justify-evenly items-center mb-14 gap-8 ">
        <h1 className="text-white font-bold text-3xl">My Organizations</h1>
        <Button 
          onClick={handlePopup}
          className='bg-[#27E8A7] text-black font-bold hover:bg-[#20C08F] transition-colors'
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Join New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {organizations.map((org, index) => (
          <Card key={index} className="bg-gray-800 text-white w-full max-w-xl mx-auto border border-gray-700">
            <CardHeader>
              <CardTitle>{org.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">{org.address}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => handleLeave(index)}
                className="bg-red-500 hover:bg-red-700 text-white"
              >
                <LogOutIcon className="mr-2 h-4 w-4" /> Leave
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-200 py-8 px-10 w-96 rounded-lg shadow-lg">
            <h2 className="text-black font-semibold text-lg mb-4">Join a New Organization</h2>
            <input 
              type="text" 
              placeholder="Enter Organization's Wallet Address" 
              className="w-full p-2 mb-4 border border-gray-700 bg-white text-black rounded focus:outline-none focus:border-blue-500" 
              value={address}
              onChange={(e) => setAddress(e.target.value)} 
            />
            <div className="flex justify-end">
              <Button 
                onClick={handlePopup}
                variant="secondary"
                className="mr-2"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleJoin}
                className="bg-[#27E8A7] text-black font-medium hover:bg-[#20C08F] transition-colors"
              >
                Join
              </Button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}
