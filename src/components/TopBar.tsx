import useAuth from "@/_auth/hook/useAuth"

const TopBar = () => {
    const { user } = useAuth()

  return (

 <nav className="relative flex w-full lg:pt-12 py-8 px-2 lg:px-20">
    <div className="flex w-full items-center justify-between">
        
         {/* logo and line under */}
         <div className="w-3/12">
            <img
            src="/assets/eventy.png"
            alt="Eventy logo"
            className="w-16 md:w-18 lg:w-20 pb-4"
            style={{ objectFit: "contain" }}
            />
            <div className="h-0.5 w-6/12 bg-black"/>
        </div>

        {/* hello , search and input line under */}
     <div className=" w-9/12">
      <div className="flex pb-6 justify-between">
        <h3 className="text-2xl font-bold primary">Hello, <span className="text-transform: capitalize">{user?.name}</span></h3>
        <div className="ms-5 flex w-[30%] justify-between">
                {/* Search */}
                <span
                    className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-gray-600 dark:text-white [&>svg]:w-5"
                    id="basic-addon2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                        fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clip-rule="evenodd" />
                    </svg>
                </span>
                    {/* <img src="/assets/search.svg" alt="" className="w-4" /> */}
                <input
                    type="search"
                    className="relative m-0 block w-[1px] min-w-0 flex-auto bg-transparent  px-3 py-1.5 text-base font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:bg-body-dark dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill"
                    placeholder="Search"
                /> 
        </div>
      </div> 
      <div className="h-0.5 w-10/12 bg-black"/>

    </div>
   </div>
  </nav>

  );
};

export default TopBar;