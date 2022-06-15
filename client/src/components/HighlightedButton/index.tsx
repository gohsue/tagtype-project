import React from "react";
import { Item } from "./styled";

interface Props {
  name: String;
  selected: Boolean;
  onClick?: () => void;
}

export default function HighlightedButton({ name, selected, onClick }: Props) {
  return (
    <Item selected={selected} fixed={onClick === null} onClick={onClick}>
      {name}
    </Item>
  );
}
