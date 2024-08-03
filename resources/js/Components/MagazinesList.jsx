import React from "react";
import MagazineCard from "./MagazineCard";

const MagazineList = ({ magazines }) => {
    return (
        <div className="grid grid-cols-12 gap-10">
            {magazines ?
                magazines.map(magazine => {
                    return <MagazineCard key={magazine.id} {...magazine} />
                }) : ''
            }
        </div>
    )
}

export default MagazineList;
