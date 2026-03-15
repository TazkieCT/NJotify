const envApiUrl = import.meta.env.VITE_API_URL?.trim();

const hasValidEnvApiUrl =
	envApiUrl && envApiUrl !== "undefined" && envApiUrl !== "null";

const fallbackApiUrl = `${window.location.protocol}//${window.location.hostname}:8080`;

if (!hasValidEnvApiUrl) {
	console.warn(
		"VITE_API_URL is not set. Falling back to same host on port 8080."
	);
}

export const API_URL = (hasValidEnvApiUrl ? envApiUrl : fallbackApiUrl).replace(
	/\/+$/,
	""
);
