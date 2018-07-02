export default function getRedirect({ kind, avatar }) {
  let url = "";
  if (kind === "genius") {
    if (!avatar || avatar === "") {
      url = "geniusInfo";
    }
    url = "dashboard/genius";
  } else {
    if (!avatar || avatar === "") {
      url = "bossInfo";
    }
    url = "dashboard/boss";
  }
  return url;
}
