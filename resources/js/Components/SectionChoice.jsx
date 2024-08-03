import React from "react";
import PostChoiceImageBox from "./PostChoiceImageBox";
import PostChoiceTextBox from "./PostChoiceTextBox";

const SectionChoice = ({ post }) => {
    const currentLanguage = window.location.pathname.indexOf('id') > -1 ? 'id' : 'en';

    return (
        <section id="section_choice" className="pt-[4rem] pb-[2rem]">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 gap-4 lg:gap-10">
                    <div className="col-span-2 lg:col-span-1">
                        <PostChoiceImageBox
                            {...post}
                            lang={currentLanguage}
                        />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <PostChoiceTextBox
                            {...post}
                            lang={currentLanguage}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionChoice;
