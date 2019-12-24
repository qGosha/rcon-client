import axios from "axios";

import reset from "src/css/reset.css"; // eslint-disable-line no-unused-vars

axios.defaults.xsrfCookieName = "CSRF-TOKEN";

axios.defaults.xsrfHeaderName = "X-CSRF-Token";

axios.defaults.withCredentials = true;
