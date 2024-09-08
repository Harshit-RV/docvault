import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckIcon, XIcon, HomeIcon, ClockIcon, FileTextIcon, UserIcon, UserPlusIcon } from 'lucide-react'

export default function Component() {
  return (
    <div className="bg-gray-900 min-h-screen min-w-full flex flex-col">
      <nav className="bg-gray-800 w-full py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div href="/recent" className="text-gray-300 hover:text-white flex items-center">
            <ClockIcon className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Recent</span>
          </div>
          <div href="/" className="text-gray-300 hover:text-white flex items-center">
            <HomeIcon className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Home</span>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <FileTextIcon className="h-5 w-5 mr-2" />
          Verify Doc
        </Button>
      </nav>

      <div className="flex-grow flex flex-col items-center mt-10">
        <div className="flex-col w-full max-w-[600px] flex items-center">
          <Tabs defaultValue="requests" className="w-full">
            <div className="flex justify-start mb-8">
              <TabsList className="grid w-[300px] h-min grid-cols-2 bg-gray-600 text-white">
                <TabsTrigger value="members" className="py-1.5 text-sm flex items-center justify-center">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Members
                </TabsTrigger>
                <TabsTrigger value="requests" className="py-1.5 text-sm flex items-center justify-center">
                  <UserPlusIcon className="h-4 w-4 mr-2" />
                  Requests
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="members">
              <div className='w-full flex-col flex gap-4'>
                <MemberElement />
                <MemberElement />
                <MemberElement />
              </div>
            </TabsContent>
            <TabsContent value="requests">
              <div className='w-full flex-col flex gap-4'>
                <JoinRequestElement />
                <JoinRequestElement />
                <JoinRequestElement />
                <JoinRequestElement />
                <JoinRequestElement />
                <JoinRequestElement />
                <JoinRequestElement />
                <JoinRequestElement />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function JoinRequestElement() {
  return (
    <div className="w-full bg-gray-800 rounded-2xl px-6 py-4 text-gray-100 gap-2 flex-col flex">
      <div className='flex gap-2 items-baseline'>
        <span className='font-black text-lg'>Aayushi Jain</span>
        <span className='text-gray-400 font-semibold text-md'>{'(0x7EC8e6614A2E...)'}</span>
      </div>
      <span className='text-gray-400 text-sm font-semibold mb-3'>really want to join your org because you're too cool</span>
      <div className='flex justify-between items-center'>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-red-400 hover:text-red-300 hover:bg-red-900/30 px-3 py-1"
        >
          Block User
        </Button>
        <div className='flex gap-3'>
          <Button 
            variant="ghost" 
            size="icon"
            className="p-0 h-8 w-8 bg-gray-600 hover:bg-gray-500 text-white"
            aria-label="Reject"
          >
            <XIcon className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="p-0 h-8 w-8 bg-primaryGreen hover:bg-primaryGreen/70 text-black"
            aria-label="Accept"
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function MemberElement() {
  return (
    <div className="w-full bg-gray-800 rounded-2xl px-6 py-4 text-gray-100 gap-2 justify-between flex">
      <div className='flex gap-2 items-baseline'>
        <span className='font-bold text-lg'>John Doe</span>
        <span className='text-gray-400 font-semibold text-md'>{'(0x1AB2C3D4E5F6...)'}</span>
      </div>
      <Button 
          variant="ghost" 
          size="sm"
          className="text-red-400 hover:text-red-300 hover:bg-red-900/30 px-3 py-1"
        >
          Remove
      </Button>
    </div>
  )
}