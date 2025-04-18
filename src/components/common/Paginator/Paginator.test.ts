import React from "react";
import { render, screen } from "@testing-library/react";
import Paginator from "./Paginator";


describe("Paginator components tests", () => {
    test("pages count is 11 but it should be showed only 10", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10} currentPage={1}/>);
        const root =  component.root;
        let spans = root.findAllByType("span");
        expect(spans.length).toBe(10);
    });
    
    test("if pages count is more than 10 button NEXT should be present", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10} currentPage={1}/>);
        const root =  component.root;
        let button = root.findAllByType("button");
        expect(button.length).toBe(1);
    });
})