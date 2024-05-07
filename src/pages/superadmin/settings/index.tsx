import useAuth from "@/_auth/hook/useAuth"
import SEO from "@/components/SEO"

const SaSettings = () => {
 
  const { user } = useAuth()
  console.log(user)
  return (
    <>
    <SEO
        title="Eventy - Settings"
        description="Event Management System Settings Page"
        name="Eventy"
        type="superadmin settings" />
    
    <div>SA SETTINGS: {user?.email}</div>
    </>
  )
  }
  
  export default SaSettings