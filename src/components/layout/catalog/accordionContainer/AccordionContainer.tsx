import Accordion from "@/components/ui/accordion/Accordion";
import { IInitailAccordionItems } from "./AccordionContainer.interfaces";

const initailAccordionItems: IInitailAccordionItems[] = [
    {
        header: "Brand",
        content: ["Apple", "Samsung", "Xiaomi", "Poco", "OPPO", "Motorola"],
        type: "checkbox",
        searchBar: true,
    },
    {
        header: "Battery capacity",
        content: [],
        type: "range",
    },
    {
        header: "Screen type",
        content: ["LCD", "IPS", "OLED", "AMOLED"],
        type: "radio",
    },
];

export default function AccordionContainer() {
    return (
        <section className="md:container md:mx-auto md:px-5 h-svh">
            <Accordion items={initailAccordionItems} />
        </section>
    );
}