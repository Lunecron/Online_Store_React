import { Column } from "./Column"
import { LogIn } from "./LogIn"
import { Row } from "./Row"
import { SignUp } from "./SignUp"

export const SiteHeader = () => {

    return (
        <Column>
        <Row>
            <h1>Ecommere App</h1>
        </Row>
        <Row>
            <button> Card </button>
            <SignUp title="Sign Up"/>
            <LogIn title="Log In"/>
        </Row>
        </Column>
    )
}