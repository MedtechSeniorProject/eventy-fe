import useAuth from "@/_auth/hook/useAuth"

const SaSettings = () => {
 
  const { user } = useAuth()
  console.log(user)
  return (
    <div>SA SETTINGS: {user?.email}</div>
  )
  }
  
  export default SaSettings