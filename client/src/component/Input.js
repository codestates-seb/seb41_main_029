import React, { useState, useRef, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

const InputEl = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid ${(props) => (props.isValid ? "#439A97" : "#62B6B7")};
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSizes.fs16};

  &:focus {
    border: 1px solid
      ${(props) => (props.isValid ? "#62B6B7" : "hsl(358,68%,59%)")};
    box-shadow: 0px 0px 0px 4px
      ${(props) =>
        props.isValid
          ? "hsla(206, 100%, 40%, 0.15)"
          : "hsla(358,62%,47%,0.15)"};
    outline: 0;
  }
`;

const Input = ({
  width,
  fieldName,
  validation,
  id,
  placeholder,
  handleKeyup,
  type,
  error,
  defaultValue,
  height,
  get,
  className,
  onClick,
}) => {
  const [isValid, setIsvalid] = useState(true);
  const { register, setvalue } = useFormContext();
  const onKeyup = (e) => {
    handleKeyup(e);
  };
  return (
    <InputEl
      type={type || "text"}
      id={id}
      width={width}
      height={height}
      placeholder={placeholder || null}
      isValid={error ? false : true}
      {...(fieldName ? { ...register(fieldName, validation) } : null)}
      onKeyUp={handleKeyup ? handleKeyup : null}
      defaultValue={defaultValue}
      className={className}
      onClick={onClick}
      autoComplete="off"
    />
  );
};

export default Input;
