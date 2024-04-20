import { Button } from "./ui/button"

interface ErrorProps {
    message: string
}

const Error = ({message}: ErrorProps) => {
  return (
    <div
        style={{ height: "80vh" }}
        className="w-10/12 flex flex-col items-center justify-center"
      >
        <img src="/assets/notFound.svg" alt="error" className="w-1/3" />
        <p className="font-semibold text-xl mt-10">{message}</p>
        <Button className="mt-10" variant={"default"}>Go Back Home</Button>
      </div>
  )
}

export default Error