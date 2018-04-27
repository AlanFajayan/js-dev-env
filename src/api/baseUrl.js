export default function getBaseUrl() {
  const inDevelopment = window.location.hostname === "localhost";
  // return inDevelopment ? "http://localhost:3001/" : "/";
  return inDevelopment ? "http://localhost:3001/" : "https://hikahos.localtunnel.me/";
}
