import useAuth from "@/_auth/hook/useAuth"

const Dashboard = () => {

  const { user } = useAuth()
  console.log(user)
  return (
    <div>Dashboard: {user?.email}</div>
  )
}

export default Dashboard