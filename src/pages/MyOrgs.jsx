import { useState, useEffect } from 'react'
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

  const { data: orgs, isLoading: orgsLoading, refetch: refetchOrgs } = useQuery('user-orgs2', fetchOrgs);


  return (
    <div className="min-h-screen bg-gray-900 p-16">
      <div className="flex justify-between items-center mb-14 px-12">
        <h1 className="text-white font-bold text-2xl">My Organizations</h1>
        <p className='text-white'>{address}</p>
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

      <Button onClick={handleJoin}> handle join </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12">
        {
          orgsLoading && (
            <div className='w-full rounded-2xl px-3 py-4 text-gray-400 gap-2 justify-between flex'>
              <span className='font-bold text-2xl'>Loading...</span>
            </div>
          ) 
        }
        {
          orgsLoading || orgs === undefined 
          ? <div className='w-full rounded-2xl px-3 py-4 text-gray-400 gap-2 justify-between flex'>
              <span className='font-bold text-2xl'>Loading...</span>
            </div>
          : orgs.length === 0
            ? (
              <div className='w-full rounded-2xl px-3 py-4 text-gray-400 gap-2 justify-between flex'>
                <span className='font-bold text-2xl'>No organisations joined</span>
              </div>
            ): (
              orgs.map((org, index) => (
                <OrgElement key={index} orgAddress={org} />
              ))
            )
        }
        <OrgElement orgAddress={'0x885690e5893bE8Be6EdE0A0339Cb89138a485AeC'} />
        <OrgElement orgAddress={'0x885690e5893bE8Be6EdE0A0339Cb89138a485AeC'} />
        <OrgElement orgAddress={'0x885690e5893bE8Be6EdE0A0339Cb89138a485AeC'} />
        <OrgElement orgAddress={'0x885690e5893bE8Be6EdE0A0339Cb89138a485AeC'} />
      </div>

      <ToastContainer />
    </div>
  );
}

const OrgElement = ({ orgAddress }) => {
  const { address } = useWallet(); 

  const [ name, setName ] = useState('');

  const getNameFromAddress = async () => {
    const name2 = await getOrgNameMethod(address, orgAddress);
    setName(name2);
  }

  useEffect(() => {
    getNameFromAddress();
  },[]);

  return (
    <Card
      className="bg-gray-800 text-white border border-gray-700 flex flex-col justify-between h-[250px]"
    >
      <CardContent className="pt-6">
        <h2 className="text-3xl font-semibold mb-4">{name}</h2>
        <p className="text-md text-gray-400">({String(orgAddress).slice(0, 10)}...)</p>
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
  )
}