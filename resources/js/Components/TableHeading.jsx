// import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6"; 

export default function TableHeading({
    name,
    sortable = true,
    sort_field = null,
    sort_direction = null,
    sortChanged = () => { },
    children,
    className
}) {
    return (
        <th 
        className={className} onClick={(e) => sortChanged(name)}>
            <div className="px-3 py-3 flex items-center justify-between gap-2 cursor-pointer">
                {children}
                {sortable && (
                    <div>
                        <FaChevronUp 
                            className={
                                "w-4 " +
                                (sort_field === name && sort_direction === "desc"
                                    ? "text-greenTheme"
                                    : "")
                            }
                        />
                        <FaChevronDown
                            className={
                                "w-4 -mt-2 " +
                                (sort_field === name && sort_direction === "asc"
                                    ? "text-greenTheme"
                                    : "")
                            }
                        />
                    </div>
                )}
            </div>
        </th>
    );
}