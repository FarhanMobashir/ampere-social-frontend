import {
  handleAlign,
  HandleFontSize,
  handleWeight,
} from "../helpers/styled-components.helpers";

describe("styled-components.helpers - handleWeight", () => {
  test("handleWeight", () => {
    expect(handleWeight("light")).toBe("400");
    expect(handleWeight("regular")).toBe("500");
    expect(handleWeight("bold")).toBe("700");
    expect(handleWeight(undefined)).toBe("400");
  });
});

describe("styled-components.helpers - handleAlign", () => {
  test("handleAlign", () => {
    expect(handleAlign("left")).toBe("left");
    expect(handleAlign("center")).toBe("center");
    expect(handleAlign("right")).toBe("right");
    expect(handleAlign(undefined)).toBe("left");
  });
});

describe("styled-components.helpers - handleFontSize", () => {
  test("handleFontSize", () => {
    expect(HandleFontSize("12px")).toBe("12px");
    expect(HandleFontSize("14px")).toBe("14px");
    expect(HandleFontSize("1rem")).toBe("1rem");
  });
});
