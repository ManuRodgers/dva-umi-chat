export default function getRedirect({ kind, avatar }) {
  let url = "";
  url = kind === "genius" ? "genius" : "boss";
  if (!avatar) url += "Info";
  return url;
}
