/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import { Button } from ".";
import { primaryColor } from "../../utils";

test("renders button", () => {
  const button = render(<Button>Button</Button>);
  const buttonElement = button.getByText("Button");
  expect(buttonElement.innerHTML).toBe("Button");
});
