"use client";

import {
    Accordion as AccordionWrapper,
    AccordionItem as Item,
} from "@szhsin/react-accordion";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import {
    AccordionContainerProps,
    AccordionItemProps,
} from "./Accordion.interfaces";
import SearchBar from "../searchBar/SearchBar";
import { useEffect, useState } from "react";

const AccordionItem = ({ header, ...rest }: AccordionItemProps) => (
    <Item
        {...rest}
        header={({ state: { isEnter } }) => (
            <div className="flex justify-between items-center w-full">
                <h6 className="text-xl font-medium">{header}</h6>
                <FaChevronDown
                    className={`transition-transform duration-200 ease-out ${
                        isEnter && "rotate-180"
                    }`}
                />
            </div>
        )}
        buttonProps={{
            className: () =>
                `flex w-full my-4 py-3 text-left transition border-b`,
        }}
        contentProps={{
            className: "transition-height duration-200 ease-out",
        }}
        panelProps={{ className: "grid gap-2" }}
    />
);

export default function Accordion({ items }: AccordionContainerProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [screenWidth, setScreenWidth] = useState<number>(750);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setScreenWidth(window.innerWidth);
            };

            setScreenWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, [screenWidth]);

    return (
        <>
            <div className="p-3">
                <button
                    className="md:hidden flex justify-between items-center w-full px-3 py-2 border rounded-md"
                    onClick={() => setIsOpen(true)}
                >
                    Filters <IoFilter />
                </button>
            </div>
            {isOpen ||
                (screenWidth > 700 && (
                    <div className="absolute md:relative top-0 w-full h-full px-3 py-5 md:p-0 bg-white z-40">
                        <div className="md:hidden flex items-center gap-3">
                            <FaChevronLeft
                                className="text-xl"
                                onClick={() => setIsOpen(false)}
                            />
                            <h2 className="text-2xl">Filters</h2>
                        </div>
                        <AccordionWrapper
                            allowMultiple
                            transition
                            transitionTimeout={250}
                            className="w-full"
                        >
                            {items.map(
                                ({ header, content, type, searchBar }, i) => (
                                    <AccordionItem key={i} header={header}>
                                        {searchBar && <SearchBar />}
                                        {type === "checkbox" &&
                                            content.map((option, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-1"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        name={option}
                                                        id={option}
                                                        className="w-4 h-4 mt-[2px] text-blue-600 bg-gray-100 border-gray-300"
                                                    />

                                                    <label
                                                        htmlFor={option}
                                                        className="text-lg font-medium"
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        {type === "radio" &&
                                            content.map((option, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-1"
                                                >
                                                    <input
                                                        type="radio"
                                                        name={header}
                                                        id={option}
                                                        className="w-4 h-4 text-blue-600 border-gray-300"
                                                    />

                                                    <label htmlFor={option}>
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        {type === "range" && (
                                            <div className="flex items-center gap-1">
                                                <input
                                                    type="number"
                                                    name={header}
                                                    placeholder="from"
                                                    className="px-4 py-2 border rounded-lg"
                                                />
                                                <span className="text-xl">
                                                    -
                                                </span>
                                                <input
                                                    type="number"
                                                    name={header}
                                                    placeholder="to"
                                                    className="px-4 py-2 border rounded-lg"
                                                />
                                            </div>
                                        )}
                                    </AccordionItem>
                                ),
                            )}
                        </AccordionWrapper>
                    </div>
                ))}
        </>
    );
}
