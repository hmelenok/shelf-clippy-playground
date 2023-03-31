import { useEffect, useState } from "react";
import styled from "styled-components";
import { DECISIONS } from "../constants";

const ClippyHolder = styled.div`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

export default function Clippy({ decision }) {
  const [visible, setVisible] = useState();

  useEffect(() => {
    switch (decision) {
      case DECISIONS.FAQ:
      case DECISIONS.LIST:
      case DECISIONS.TABLE:
        return setVisible(true);
      case DECISIONS.NO_DESISION:
        return setVisible(false);
      default:
        return setVisible(false);
    }
  }, [decision]);

  return (
    <ClippyHolder visible={visible}>
      <img src={`/assets/clippy-thinks.gif`} />
    </ClippyHolder>
  );
}
