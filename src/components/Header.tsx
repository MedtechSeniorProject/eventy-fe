import TodayDate from "./Date"

interface props{
    name: string
}

const Header = (props:props) => {

  return (<>
    <h1 className=" font-extrabold sm:text-3xl md:text-3xl lg:text-4xl">{props.name}</h1>
    <TodayDate />
  </>)
}

export default Header