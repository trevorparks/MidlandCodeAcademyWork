import { ThemeProvider as ThemeWrapper } from "@emotion/react";
import theme from './themes';

export const ThemeProvider = (props) => {
    return <ThemeWrapper theme={theme}>{props.children} </ThemeWrapper>
}