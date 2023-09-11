import FileUpload from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const {userId} = await auth()
  const isAuth = !!userId
  return (
    <div className="w-screen min-h-screen" style={{background: "linear-gradient(to left, rgb(2, 132, 199), rgb(14, 165, 233), rgb(56, 189, 248))"}}>      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with your textbooks!</h1>
            <UserButton afterSignOutUrl="/"/>
          </div>

          <div className="flex mt-2 ">
            {isAuth && <Button>Go to Chats</Button>}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-700">
            Placeholder for text to introduce Schol, or at least the prototype for the chat function to be released tomorrow
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ):(
              <Link href="/sign-in">
                <Button>Login to get started!
                  <LogIn className="w-4 h-4 ml-2"/>
                </Button>
              </Link>
            )}
            {/* add screenshot of what app looks like here */}
          </div>
        </div>
      </div>
    </div>
  )
}

