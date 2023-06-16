import app from "./app";
import { getLogger } from "./utils/logging";
import swaggerDocs from "./utils/swagger";

const PORT = parseInt(process.env.PORT as string, 10) || 8000;

app.listen(PORT, () => {
	swaggerDocs(app, PORT);
	getLogger().info(`Listening on port ${PORT}`);
});
