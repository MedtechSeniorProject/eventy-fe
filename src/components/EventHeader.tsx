interface props{
    name: string
    time: string
}

const EventHeader = (props:props) => {

  return (<>
    <h1 className="font-bold text-3xl">{props.name}</h1>
    <p>{props.time}</p>
  </>)
}

export default EventHeader