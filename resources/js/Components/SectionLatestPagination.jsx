import React from "react";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faArrowCircleRight, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

const SectionLatestPagination = ({ posts }) => {
    return (
        <div className="flex justify-center mt-10 pb-10">
            {posts.links && posts.data.length >= 1 ? (
                <div className='flex gap-4'>
                    {posts.links.map((post, index) => {
                        let label = post.label;
                        if (label.includes('Previous')) {
                            label = <FontAwesomeIcon icon={faArrowCircleLeft} className="text-green-600" />;
                        } else if (label.includes('Next')) {
                            label = <FontAwesomeIcon icon={faArrowCircleRight} className="text-green-600" />;
                        }

                        // Tentukan kelas berdasarkan label
                        const disabled = post.url === null;
                        const linkClass = `
                            ${post.active ? 'bg-green-600 rounded-md py-1 px-3 text-white' : ''}
                            ${disabled ? 'cursor-not-allowed opacity-50' : ''}
                            flex items-center
                        `;

                        return (
                            <Link
                                key={index}
                                href={!disabled ? post.url : undefined}
                                className={linkClass}
                                aria-disabled={disabled ? 'true' : 'false'}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>
            ) : ""}
        </div>
    )
}

export default SectionLatestPagination;
