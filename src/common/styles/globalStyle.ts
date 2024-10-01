import { createGlobalStyle } from "styled-components";
import { colors } from "./color";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
        font-family: "Poppins", sans-serif;
        font-size: 16px;
        font-color: ${colors.deepSlate};
        background-color: ${colors.purple6};
    }

    input, button, textarea, select, span{
        font: inherit;
    }
`;
