import TodayDate from "./Date"

interface props{
    name: string
}

const Header = (props:props) => {

  return (<>
    <h1 className="font-bold text-3xl">{props.name}</h1>
    <TodayDate />
  </>)
}

export default Header