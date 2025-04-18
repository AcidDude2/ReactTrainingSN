// import { create } from "react-test-renderer";
// import ProfileStatus from "./ProfileStatus"


// describe("ProfileStatus component", () => {
//     test("status from props shuold be in the state", () => {
//         const component = create(<ProfileStatus status="bla-bla" />)
//         const instance = component.getInstance();
//         expect(instance.state.status).toBe("bla-bla");
//     });
//     test("after creation <span> should be displayed", () => {
//         const component = create(<ProfileStatus status="bla-bla" />)
//         const root = component.root;
//         let span = root.findByType("span");
//         expect(span).not.toBeNull();
//     });
//     test("after creation <input> should not be displayed", () => {
//         const component = create(<ProfileStatus status="bla-bla" />)
//         const root = component.root;
//         expect (() => {
//             let input = root.findByType("input");
//         }).toThrow();
//     });
//     test("after creation <span> should contain correct status", () => {
//         const component = create(<ProfileStatus status="bla-bla" />)
//         const root = component.root;
//         let span = root.findByType("span");
//         expect(span.children[0]).toBe("bla-bla");
//     });
//     test("<input> should be displayed in editMode insted of <span>", () => {
//         const component = create(<ProfileStatus status="bla-bla" />)
//         const root = component.root;
//         let span = root.findByType("span");
//         span.props.onDoubleClick();
//         let input = root.findByType("input");
//         expect(input.props.value).toBe("bla-bla");
//     });
//     test("after double click <span> should not be displayed", () => {
//         const component = create(<ProfileStatus status="bla-bla" />)
//         const root = component.root;
//         let span = root.findByType("span");
//         span.props.onDoubleClick();
//         expect (() => {
//             span = root.findByType("span");
//         }).toThrow();
//     });
//     test("callback should be called", () => {
//         const mockCallback = jest.fn();
//         const component = create(<ProfileStatus status="bla-bla" updateStatus={mockCallback} />);
//         const instance = component.getInstance();
//         instance.deactivateEditMode();
//         expect(mockCallback.mock.calls.length).toBe(1);
//     })
// });