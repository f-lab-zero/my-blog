import { render, fireEvent, screen } from "@testing-library/react";
import TextArea, { TextAreaStyled } from "./TextArea";
import { ThemeWrapper } from "src/test-utils";

describe("TextArea", () => {
  const onChange = jest.fn();

  const rederTextArea = ({ onChange, label }: TextAreaStyled) =>
    render(
      <TextArea
        rows={4}
        maxLength={30}
        label={label}
        onChange={onChange}
        placeholder="textarea"
      ></TextArea>,
      { wrapper: ThemeWrapper },
    );

  it("textarea에 글을 입력하면 onChange가 호출되어야 한다.", () => {
    rederTextArea({ onChange, label: "짧게 소개하기" });

    const textArea = screen.getByLabelText("짧게 소개하기");
    const value = "textarea입력";

    fireEvent.change(textArea, { target: { value } });

    expect(onChange).toBeCalled();
  });

  it("label을 입력하면 label이 보여야 한다.", () => {
    const labelText = "라벨";

    rederTextArea({
      onChange,
      label: labelText,
    });

    const labelNode = screen.getByText(labelText);

    expect(labelNode).toBeInTheDocument();
  });

  it("textarea에 입력하면 TextLength의 text가 변경되어야함", () => {
    rederTextArea({ onChange, label: "짧게 소개하기" });

    const textArea = screen.getByLabelText("짧게 소개하기");
    const textAreaLen = screen.getByLabelText("textarea-length");
    const value = "textarea입력";

    fireEvent.change(textArea, { target: { value } });

    expect(textAreaLen).toHaveTextContent("10/30");
  });
});
