import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Constant from '../../config/index';

export default function SignOut({clearData, setIsLoggedIn}) {
    const history = useHistory();

    clearData();
    setIsLoggedIn(false);
    return (
        <div>
            Signed Out Successfully!
        </div>
    );
}