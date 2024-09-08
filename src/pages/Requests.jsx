import { User, Check, X , WalletMinimal} from 'lucide-react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { getMembersMethod, getJoinRequestsMethod, getUserNameMethod, updateJoinRequestMethod } from '@/contract/vault/methods'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'


export default function Requests() {
  const [activeTab, setActiveTab] = useState('tab1')
  
  const handleTabChange = (tabName) => {
      setActiveTab(tabName);
  }

  const fetchMembers = async () => {
    const address2 = '0xDfCDbf47c708949c53Db81041381a580462bc582';
    const result = await getMembersMethod(address2);
    console.log('result', result);
    return result;
  }

  const { data: members, isLoading: membersLoading, refetch: refetchMembers } = useQuery('orgmembers', fetchMembers);

  const fetchRequests = async () => {
      const address2 = '0xDfCDbf47c708949c53Db81041381a580462bc582';
      const result = await getJoinRequestsMethod(address2);
      console.log('requests:', result);
      return result;
  }

  const { data: requests, isLoading: requestsLoading, refetch: refetchRequests } = useQuery('requests', fetchRequests);

  return (
    <div className='bg-gray-900 min-h-screen p-8 flex justify-center items-center pt-12'>
    <div className='w-full max-w-4xl pl-20'>
        <h1 className='text-4xl font-bold text-white mb-16'>Requests</h1>
        <Tabs defaultValue="members" className="w-full">
            <div className="flex justify-start mb-8">
              <TabsList className="grid w-[300px] h-min grid-cols-2 bg-gray-600 text-white">
                <TabsTrigger value="members" className="py-1.5 text-sm flex items-center justify-center">
                  Members
                </TabsTrigger>
                <TabsTrigger value="requests" className="py-1.5 text-sm flex items-center justify-center">
                  Requests
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="members">
              <div className='w-full flex-col flex gap-4'>
                {
                  membersLoading && (
                    <div className='w-full rounded-2xl px-3 py-4 text-gray-400 gap-2 justify-between flex'>
                      <span className='font-bold text-2xl'>Loading...</span>
                    </div>
                  ) 
                }
                {
                  membersLoading || members === undefined 
                  ? null
                  : members.length === 0
                    ? (
                      <div className='w-full rounded-2xl px-3 py-4 text-gray-400 gap-2 justify-between flex'>
                        <span className='font-bold text-2xl'>No Members</span>
                      </div>
                    ): (
                      members.map((member, index) => (
                        <p>something</p>
                      ))
                    )
                }
              </div>
            </TabsContent>
            <TabsContent value="requests">
              <div className='w-full flex-col flex gap-4'>
                {
                  requestsLoading && (
                    <div className='w-full rounded-2xl px-3 py-4 text-gray-400 gap-2 justify-between flex'>
                      <span className='font-bold text-2xl'>Loading...</span>
                    </div>
                  ) 
                }
                {
                  requestsLoading || requests === undefined 
                  ? null
                  : requests.length === 0
                    ? (
                      <div className='w-full rounded-2xl px-3 py-4 text-gray-400 gap-2 justify-between flex'>
                        <span className='font-bold text-2xl'>No join requests</span>
                      </div>
                    ): (
                      requests.map((request, index) => (
                        <p>something</p>
                      ))
                    )
                }
              </div>
            </TabsContent>
          </Tabs>
        <div className='flex gap-4 bg-[#1C1F2E] w-72 rounded-lg p-2 mb-8'>
            <Tab 
                name="New Files" 
                active={activeTab==="tab1"} 
                onClick={()=>handleTabChange("tab1")} 
            />
            <Tab 
                name="Verifications" 
                active={activeTab==="tab2"} 
                onClick={()=>handleTabChange("tab2")} 
            />
        </div>
      <div className='grid gap-6'>
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  </div>
  )
}
const Tab =(props)=> {
    const tabClass = props.active ? 'bg-white' : 'bg-gray-500';
    return(
        <div className={`w-36 py-1 text-[15px] font-medium flex items-center justify-center rounded-md cursor-pointer ${tabClass}`} onClick={props.onClick}>
            {props.name}
        </div>
  
    )
  }

function RequestCard({ request }) {
  return (
    <div className='bg-[#1C1F2E] rounded-lg p-4 px-6 shadow-lg w-[700px]'>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h1 className='text-2xl font-semibold text-white mb-2'>{request.name}</h1>
        </div>
      </div>
      <div className='flex items-center text-gray-400 mb-2'>
        <User size={18} className='mr-2' />
        <span>{request.requester}</span>
      </div>
      <div className='flex items-center text-gray-400 mb-5'>
        <WalletMinimal size={18} className='mr-2' />
        <span>{request.address}</span>
      </div>
      <div className='flex justify-end space-x-3'>
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
