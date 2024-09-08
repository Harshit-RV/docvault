import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOutIcon, LogInIcon, PlusIcon } from 'lucide-react'
import { requestToJoinOrgMethod, getUserOrganizationsMethod, getOrgNameMethod } from "../contract/vault/methods"
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useWallet from '@/hooks/useWallet';

export default function Component() {
  const { address } = useWallet(); 

  const [ orgAddress, setOrgAddress ] = useState('')
  const [ message, setMessage ] = useState('')

  const [selectedOrg, setSelectedOrg] = useState(null)

  // const navigate = useNavigate();

  const handleJoin = async () => {
    if (!orgAddress || orgAddress == "") {
      toast.error('Please enter a valid organization address.');
      return;
    }
    if (!message || message == "") {
      toast.error('Please enter a message.');
      return;
    }

    if (address) {
      await requestToJoinOrgMethod(address, orgAddress, message)
      toast.success("Successfully joined the organization!")
    } else {
      toast.error('Please enter a valid wallet address.');
    }
  };

  const fetchOrgs = async () => {
    const result = await getUserOrganizationsMethod(address);
    console.log('result', result);
    return result;
  }

  const { data: orgs, isLoading: orgsLoading, refetch: refetchOrgs } = useQuery('user-orgs', fetchOrgs);


  return (
    <div className="min-h-screen bg-gray-900 p-16">
      <div className="flex justify-between items-center mb-14 px-12">
        <h1 className="text-white font-bold text-2xl">My Organizations</h1>
        <p>{address}</p>
        <Dialog>
          <DialogTrigger>
            <Button 
              className='bg-primaryGreen text-black font-bold hover:bg-primaryGreen/70 transition-colors'
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Join New
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-none text-white py-7 px-8">
            <DialogHeader>
              <DialogTitle className="mb-6 text-xl">Request to Join New Organisation</DialogTitle>
              <DialogDescription>
                <input 
                  type="text" 
                  placeholder="Organization's Address" 
                  className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 text-white rounded focus:outline-none focus:border-primaryColor" 
                  value={orgAddress}
                  onChange={(e) => setOrgAddress(e.target.value)} 
                />
                <input 
                  type="text" 
                  placeholder="Message" 
                  className="w-full mt-3 p-2 mb-4 border border-gray-600 bg-gray-700 text-white rounded focus:outline-none focus:border-primaryColor" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)} 
                />
                <div className='w-full flex justify-end mt-2'>
                  <Button 
                    onClick={handleJoin}
                    className="bg-primaryGreen text-black font-medium hover:bg-emerald-600 transition-colors"
                  >
                    Send Request
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* <Button onClick={handleJoin}> handle join </Button> */}

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12">
        {organizations.map((org, index) => (
          <Card
            key={index}
            className="bg-gray-800 text-white border border-gray-700 flex flex-col justify-between h-[250px]"
          >
            <CardContent className="pt-6">
              <h2 className="text-3xl font-semibold mb-4">{org.name}</h2>
              <p className="text-md text-gray-400">{org.address}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
             
              <Dialog>
                <DialogTrigger>
                  <Button 
                    onClick={() => setSelectedOrg(org)}
                    variant="outline" 
                    size="sm" 
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <LogOutIcon className="mr-2 h-4 w-4" /> Leave
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-none text-white py-7 px-8">
                  <DialogHeader>
                    <DialogTitle className="mb-2 text-xl">Leave Organisation</DialogTitle>
                    <DialogDescription>
                      <p className="text-gray-300 mb-4">Are you sure you want to leave {selectedOrg.name}?</p>
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleLeave}
                          className="bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                        >
                          Leave
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleEnter(org)}
                className="border-emerald-500 bg-emerald-500 text-white font-bold hover:bg-emerald-500 hover:text-white"
              >
                <LogInIcon className="mr-2 h-4 w-4" /> Enter
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div> */}

      <ToastContainer />
    </div>
  );
}