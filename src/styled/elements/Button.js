import styled from "@emotion/styled";

const Button = styled("button")((props) => ({
    color: "white",
    backgroundColor: props.theme.primary,
}))
export default Button;