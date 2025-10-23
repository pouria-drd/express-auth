import packageJson from "../../../package.json";

/**
 * Get the current application version.
 * @returns The current application version.
 */
function getAppVersion(): string {
	return packageJson.version || "0.1.0";
}

export { getAppVersion };
