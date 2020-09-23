import React from "react";
import ReactDOM from "react-dom";
import List from "./List";
import renderer from "react-test-renderer";

const cards = [
  { id: "a", title: "First card", content: "lorem ipsum" },
  { id: "b", title: "Second card", content: "lorem ipsum" }
];

const cardsEmpty = [];

describe("List component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<List key={"1"}
             header={"First List"}
             cards={cards}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the UI as expected no cards", () => {
    const tree = renderer
      .create(
        <List
          key={"1"}
          header={"First List"}
          cards={cardsEmpty}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

    it("renders the UI as expected with cards", () => {
      const tree = renderer
        .create(<List key={"1"} header={"First List"} cards={cards} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
});
