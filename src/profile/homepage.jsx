
export default function HomePage() {
    return (
        <div className="grid grid-cols-8 grid-rows-6 gap-7 Home_Page">
            <div className="grid_design col-span-4 col-start-3">1</div>
            <div className="grid_design col-span-2 row-span-3 row-start-3">2</div>
            <div className="grid_design col-span-2 row-span-3 col-start-7 row-start-3">
                3
            </div>
            <div className="grid_design col-span-2 row-span-4 col-start-4 row-start-3">
                4
            </div>
        </div>
    );

}