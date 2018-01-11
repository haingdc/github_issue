import React from "react";
import { expect } from "chai";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { spy } from "sinon";

import App, { buttonName } from "./src/App";

console.log("ENV", process.env.NODE_ENV);

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("works, hopefully", () => {
    expect(true).to.be.true;
  });
});
