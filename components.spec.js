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
  const ITEMS = [
    {
      issue_id: 3749,
      status: "open",
      title:
        "First start take more than one minute, and modify one file take 10s to recompile. Is this ok?",
      time: "12/10/2017, 8:17:17",
    },
    {
      issue_id: 3748,
      status: "open",
      title: "set webpack-uglify-plugin ecma support based on browserlist",
      time: "12/10/2017, 8:17:17",
    },
    {
      issue_id: 3737,
      status: "open",
      title: "Misleading messages about script command changes when ejecting",
      time: "12/10/2017, 8:17:17",
    },
    {
      issue_id: 3728,
      status: "open",
      title: "Code splitting and preventing duplication",
      time: "12/10/2017, 8:17:17",
    },
  ];

  it("should render 4 items", () => {
    let items = [...ITEMS];
    const wrapper = shallow(<ItemContainer items={items} />);
    let liElems = wrapper.findWhere(n => n.name() === "li");
    expect(liElems.length).to.equal(4);
  });

  it("issue which is created 0 minute ago, should be '1 minute ago'", () => {
    const wrapper = shallow(<ItemContainer />);
    let now = new Date();
    let result = wrapper.instance().diffenceTime(now.toLocaleString());
    expect(result).to.equal("Open on 1 minute ago");
  });

  it("issue which is created 1 minute ago, should be '1 minute ago'", () => {
    const wrapper = shallow(<ItemContainer />);
    const MS_PER_MINUTE = 60000;
    let aMinuteAgo = new Date(new Date() - 1 * MS_PER_MINUTE);
    let result = wrapper.instance().diffenceTime(aMinuteAgo.toLocaleString());
    expect(result).to.equal("Open on 1 minute ago");
  });

  it("issue which is created 59 minute ago, should be '59 minute ago'", () => {
    const wrapper = shallow(<ItemContainer />);
    const MS_PER_MINUTE = 60000;
    let _59MinutesAgo = new Date(new Date() - 59 * MS_PER_MINUTE);
    let result = wrapper
      .instance()
      .diffenceTime(_59MinutesAgo.toLocaleString());
    expect(result).to.equal("Open on 59 minutes ago");
  });

  it("issue which is created in range [60 - 119] minutes ago, should be '1 hour ago'", () => {
    let wrapper = shallow(<ItemContainer />);
    const MS_PER_MINUTE = 60000;
    let _60MinutesAgo = new Date(new Date() - 60 * MS_PER_MINUTE);

    let _60result = wrapper
      .instance()
      .diffenceTime(_60MinutesAgo.toLocaleString());
    let _119MinutesAgo = new Date(new Date() - 60 * MS_PER_MINUTE);

    let _119result = wrapper
      .instance()
      .diffenceTime(_60MinutesAgo.toLocaleString());

    expect(_60result).to.equal("Open on 1 hour ago");
    expect(_119result).to.equal("Open on 1 hour ago");
  });

  it("issue which is created in range [120 - 179] minutes ago, should be '2 hour ago'", () => {
    let wrapper = shallow(<ItemContainer />);
    const MS_PER_MINUTE = 60000;
    let _120MinutesAgo = new Date(new Date() - 120 * MS_PER_MINUTE);

    let _120result = wrapper
      .instance()
      .diffenceTime(_120MinutesAgo.toLocaleString());
    let _179MinutesAgo = new Date(new Date() - 179 * MS_PER_MINUTE);

    let _179result = wrapper
      .instance()
      .diffenceTime(_179MinutesAgo.toLocaleString());
    expect(_120result).to.equal("Open on 2 hours ago");
    expect(_179result).to.equal("Open on 2 hours ago");
  });

  it("issue which is created in range [1380 - 1439] minutes ago, should be '23 hour ago'", () => {
    let wrapper = shallow(<ItemContainer />);
    const MS_PER_MINUTE = 60000;
    let _1380MinutesAgo = new Date(new Date() - 1380 * MS_PER_MINUTE);

    let _1380result = wrapper
      .instance()
      .diffenceTime(_1380MinutesAgo.toLocaleString());
    let _1439MinutesAgo = new Date(new Date() - 1439 * MS_PER_MINUTE);

    let _1439result = wrapper
      .instance()
      .diffenceTime(_1380MinutesAgo.toLocaleString());
    expect(_1380result).to.equal("Open on 23 hours ago");
    expect(_1439result).to.equal("Open on 23 hours ago");
  });

  it("issue which is created in range [1440 - 2879] day ago, should be '1 day ago'", () => {
    let wrapper = shallow(<ItemContainer />);
    const MS_PER_MINUTE = 60000;
    let _1440MinutesAgo = new Date(new Date() - 24 * 60 * MS_PER_MINUTE);

    let _1440result = wrapper
      .instance()
      .diffenceTime(_1440MinutesAgo.toLocaleString());
    let _2879MinutesAgo = new Date(
      new Date() - (2 * 24 * 60 - 1) * MS_PER_MINUTE,
    );

    let _2879result = wrapper
      .instance()
      .diffenceTime(_2879MinutesAgo.toLocaleString());
    expect(_1440result).to.equal("Open on 1 day ago");
    expect(_2879result).to.equal("Open on 1 day ago");
  });

  it("issue which is created in range [1440 - 2879] day ago, should be '30 day ago'", () => {
    let wrapper = shallow(<ItemContainer />);
    const MS_PER_MINUTE = 60000;
    let _41760MinutesAgo = new Date(new Date() - 29 * 24 * 60 * MS_PER_MINUTE);

    let _41760result = wrapper
      .instance()
      .diffenceTime(_41760MinutesAgo.toLocaleString());
    let _43199MinutesAgo = new Date(
      new Date() - (30 * 24 * 60 - 1) * MS_PER_MINUTE,
    );

    let _43199result = wrapper
      .instance()
      .diffenceTime(_43199MinutesAgo.toLocaleString());
    expect(_41760result).to.equal("Open on 29 days ago");
    expect(_43199result).to.equal("Open on 29 days ago");
  });
});
