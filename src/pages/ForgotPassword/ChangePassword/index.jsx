import CeroInput from "../../../components/CeroInput";

const ChangePassword = (props) => {
    return (
        <>
            <CeroInput
                required
                type="password"
                value={props.password}
                onChange={props.onChangePassword}
                onBlur={props.onBlurPassword}
                error={props.onPasswordError}
                id="password"
                label="Enter Password"
                fullWidth
            />
            <CeroInput
                required
                type="password"
                value={props.confirmPassword}
                onChange={props.onChangeConfirmPassword}
                onBlur={props.onBlurConfirmPassword}
                error={props.onConfirmPasswordError}
                id="confirmPassword"
                label="Confirm Password"
                fullWidth
            />
        </>
    );
};

export default ChangePassword;
