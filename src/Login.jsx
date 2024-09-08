import { useNavigate } from 'react-router-dom'
import {useState} from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { connectWallet } from '@/utils/connectWallet'
import { registerUserMethod, getUserNameMethod, getOrgNameMethod, registerOrganisationMethod } from '@/contract/vault/methods'

function Login() {
  return (
    <div>
    <div className='h-screen w-full grid md:grid-cols-7 grid-cols-2'>
      {/* Coloured Section */}
      <div className='md:col-span-4 hidden md:flex justify-end items-center'>
        <div className='bg-primaryBlack h-full w-full flex flex-col items-center justify-center pt-14 gap-16'>
          <img 
            className='rounded w-[60vh]' 
            src="https://nanonets.com/blog/content/images/2022/06/shutterstock_1785042593.jpg" 
            alt="Auction"
          />
          <div className='text-white text-center'>
            <h1 className='text-4xl font-bold mb-4'>docVault</h1>
            <p className='text-lg'>Blockchain and AI based Document Verification System</p>
          </div>
        </div>
      </div>
      
      {/* Main Section */}
      <div className='flex flex-col md:col-span-3 col-span-2'>
        <div className='h-full w-full flex flex-col items-center pt-36 gap-16'>
          <div className='text-center'>
            <h1 className='text-3xl font-semibold'>
              Welcome to
            </h1>
            <h1 className='text-5xl font-bold text-primaryGray p-3'>docVault</h1>
          </div>
          <div className='flex flex-col gap-2 text-center'>

            <Tabs defaultValue="user" className="w-96">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user">User</TabsTrigger>
                <TabsTrigger value="organization">Organization</TabsTrigger>
              </TabsList>
              <TabsContent value="user">
                <UserForm />
              </TabsContent>
              <TabsContent value="organization">
                <OrganizationForm />
              </TabsContent>
            </Tabs>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}

function UserForm() {

  const [ name, setName ] = useState('');
  
  const handleConnect = async (isSignUp) => {
    const account = await connectWallet();
    console.log(account);
    if (!account) return;
    // TODO: add toast here
    
    if (isSignUp) {
      console.log('signing up');
      await registerUserMethod(account, name);
      localStorage.setItem('role', 'user');
    }

    // if (!isSignUp) {
      const name2 = await getUserNameMethod(account, account);
      console.log(name2);
      if (name2 == null) {
        console.log('User not registered');
        // TODO: add toast here
        return;
      }
    // }
  }

  return (
    <div className='flex flex-col gap-4 mt-4'>
      <Input 
        type="text" 
        placeholder="Name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 bg-gray-800 text-white rounded-md border-none outline-none focus:ring-2 focus:ring-primaryBlack"
      />
      <Button 
        onClick={() => handleConnect(true)}
        className="w-full py-3 px-5 text-sm font-medium rounded-xl border focus:z-10 focus:ring-4 focus:ring-gray-100 bg-primaryBlack text-white border-gray-600 hover:bg-gray-700"
      >
        Connect and Sign Up
      </Button>
      <div className="relative">
        <Separator className="my-4" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-white px-2 text-gray-500 text-sm">OR</span>
        </div>
      </div>
      <Button 
        variant="outline"
        onClick={() => handleConnect(false)}
        className="w-full py-3 px-5 text-sm font-medium rounded-xl border focus:z-10 focus:ring-4 focus:ring-gray-100 bg-white text-primaryBlack border-gray-300 hover:bg-gray-100"
      >
        Connect and Sign In
      </Button>
    </div>
  )
}

function OrganizationForm() {
  const [ name, setName ] = useState('');
  
  const handleConnect = async (isSignUp) => {
    const account = await connectWallet();
    console.log(account);
    if (!account) return;
    // TODO: add toast here
    
    if (isSignUp) {
      console.log('signing up');
      registerOrganisationMethod(account, name);
      localStorage.setItem('role', 'org');
    }

    if (!isSignUp) {
      const name = getOrgNameMethod(account, account);
      if (name == null) {
        console.log('User not registered');
        // TODO: add toast here
        return;
      }
    }
  }
  return (
    <div className='flex flex-col gap-4 mt-4'>
      <Input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Organization Name" 
        className="w-full p-3 bg-gray-800 text-white rounded-md border-none outline-none focus:ring-2 focus:ring-primaryBlack"
      />
      <Button 
        onClick={() => handleConnect(true)}
        className="w-full py-3 px-5 text-sm font-medium rounded-xl border focus:z-10 focus:ring-4 focus:ring-gray-100 bg-primaryBlack text-white border-gray-600 hover:bg-gray-700"
      >
        Connect and Sign Up
      </Button>
      <div className="relative">
        <Separator className="my-4" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-white px-2 text-gray-500 text-sm">OR</span>
        </div>
      </div>
      <Button 
        onClick={() => handleConnect(false)}
        variant="outline"
        className="w-full py-3 px-5 text-sm font-medium rounded-xl border focus:z-10 focus:ring-4 focus:ring-gray-100 bg-white text-primaryBlack border-gray-300 hover:bg-gray-100"
      >
        Connect and Sign In
      </Button>
    </div>
  )
}

export default Login