
import React from "react";
import Image from "next/image";
import ButtonSVG from "assets/images/ic_button.svg";
import { ButtonNegativeWrapper, ButtonPositiveWrapper } from "./style";
interface buttonProps {
  enabled: boolean | string;
  text: string;
  onClick?: () => void;
}

export const ButtonPositive = (props: buttonProps) => {
  return (
    <ButtonPositiveWrapper disabled={!props.enabled} onClick={props.onClick}>
      <Image src={ButtonSVG} alt="buttonPositive" width="184" height="54" className={props.enabled ? `filter_black` : `filter_grey_300`} />
      <div>{props.text}</div>
    </ButtonPositiveWrapper>
  );
};

export const ButtonNegative = (props: buttonProps) => {
  return (
    <ButtonNegativeWrapper disabled={!props.enabled} onClick={props.onClick}>
      <div>{props.text}</div>
    </ButtonNegativeWrapper>
  )
}
