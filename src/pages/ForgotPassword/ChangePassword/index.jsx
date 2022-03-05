import { useFormik } from "formik";

import CeroButton from "../../../components/CeroButton";
import CeroInput from "../../../components/CeroInput";
import { passwordSchema } from "../schema";

const ChangePassword = (props) => {

    const passwordForm = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: passwordSchema
    });

    const handleNext = () => {
        props.onNext(2, passwordForm.values.password)
    }

    return (
        <>
            <CeroInput
                required
                type="password"
                id="password"
                label="Enter Password"
                value={passwordForm.values.password}
                onChange={passwordForm.handleChange}
                onBlur={passwordForm.handleBlur}
                error={passwordForm.touched.password && passwordForm.errors.password}
                fullWidth
            />
            <CeroInput
                required
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                value={passwordForm.values.confirmPassword}
                onChange={passwordForm.handleChange}
                onBlur={passwordForm.handleBlur}
                error={passwordForm.touched.confirmPassword && passwordForm.errors.confirmPassword}
                fullWidth
            />
            <CeroButton
                variant="contained"
                onClick={handleNext}
                fullWidth
                buttonText='CHANGE PASSWORD'
                disabled={!passwordForm.dirty || !passwordForm.isValid}
            />
        </>
    );
};

export default ChangePassword;
