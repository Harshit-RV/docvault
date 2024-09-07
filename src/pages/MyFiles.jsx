import { Button } from "@/components/ui/button"
function MyFiles() {
  return (
    <div className="bg-[#0D111D] h-screen">
        <div className="flex justify-between pt-12 pl-14 pr-14 items-center">
            <h1 className="text-white font-bold text-2xl">My Files</h1>
            <Button className="bg-[#27E8A7] w-28"></Button>
        </div>
    </div>
  )
}

export default MyFiles