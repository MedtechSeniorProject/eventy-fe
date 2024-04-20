import useAuth from "@/_auth/hook/useAuth"

const TopBar = () => {
    const { user } = useAuth()

  return (

 <nav className="fixed flex w-full lg:pt-16 py-8 px-2 lg:px-20  bg-white z-10">
    <div className="flex w-full flex-wrap items-center justify-between">
        
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

        {/* hello */}
     <div className=" w-9/12 pt-3" >
      <div className="flex pb-3 justify-between">
        <h3 className="text-2xl font-bold primary">Hello, <span className="text-transform: capitalize">{user?.name}</span></h3>
      </div> 
      <div className="h-0.5 w-10/12 bg-black"/>

    </div>
   </div>
  </nav>

  );
};

export default TopBar;