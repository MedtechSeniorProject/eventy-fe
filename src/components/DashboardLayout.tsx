import Navbar from "@/components/Navbar";


const DashboardLayout = () => {


    return (
        <div>
            <div className="w-full h-[7%] bg-black block box-border">
            </div>
            <div className="flex w-full h-full gap-5">
                <Navbar role="EVENTMANAGER"/>
                <div className="">

                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit ipsum, suscipit nihil tempore dolore odio. Dolore beatae aut assumenda voluptatibus, exercitationem saepe, magni consequuntur vel eligendi quo minus alias reprehenderit?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
