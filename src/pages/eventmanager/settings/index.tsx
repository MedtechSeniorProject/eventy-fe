import Header from "@/components/Header"
import SEO from "@/components/SEO"

const EmSettings = () => {
    return (
      <div>
        <SEO
        title="Eventy - Settings"
        description="Event Management System Settings Page"
        name="Eventy"
        type="settings" />
        <div>
          <Header name="Settings"/>  
          <div className="mt-5 flex flex-col gap-1">
            <div className="underline font-medium hover:text-primary hover:cursor-pointer w-fit">Change Username</div>
            <div className="underline font-medium hover:text-primary hover:cursor-pointer w-fit">Change Password</div>
          </div>
        </div>  
      </div>
    )
  }
  
  export default EmSettings