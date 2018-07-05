export default function getRedirect({ kind, avatar }) {
  if (kind === "genius") {
    if (!avatar || avatar === "") {
      return "geniusInfo";
    }
    return "dashboard/genius";
  } else {
    if (!avatar || avatar === "") {
      return "bossInfo";
    }
    return "dashboard/boss";
  }
}
