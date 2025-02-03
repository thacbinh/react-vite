import { Link, useRouteError } from "react-router-dom";
import { Button, Result } from 'antd';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        // <div id="error-page">
        //     <h1>Oops!</h1>
        //     <p>Sorry, an unexpected error has occurred.</p>
        //     <p>
        //         <i>{error.statusText || error.message}</i>
        //     </p>
        //     <div>
        //         <Link to="/">
        //             <span>Back to homepage</span>
        //         </Link>
        //     </div>
        // </div>
        <Result
            status="403"
            title="Oops!"
            subTitle={error.statusText || error.message}
            extra={<Button type="primary">
                <Link to="/">
                    <span>Back to homepage</span>
                </Link>
            </Button>}
        />
    );
}
