import * as React from "react";

const Error = ({errorVal}: {errorVal: string | undefined}) => {
return <div>
    {errorVal && errorVal}
</div>
};

export default Error;
