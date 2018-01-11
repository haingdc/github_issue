import React from "react";
import { expect } from "chai";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { spy } from "sinon";

import App, { buttonName } from "./src/App";
import ItemContainer from "./src/ItemContainer";

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("should render ItemContainer", () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper.containsAllMatchingElements([<ItemContainer />]),
    ).to.be.equal(true);
  });
});

describe("ItemContainer", () => {
  const ITEMS = ["item 1", "item 2", "item 3", "item 4"];

  it("should render 4 items", () => {
    let items = [...ITEMS];
    const wrapper = shallow(<ItemContainer items={items} />);
    let liElems = wrapper.findWhere(n => n.name() === "li");
    expect(liElems.length).to.equal(4);
  });
});
