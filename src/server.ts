import App from "./app";
import { connect } from "./content/config/db";

connect();
const app = new App();

app.start();
