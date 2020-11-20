export default function() {
  const jwt = localStorage.getItem("jwt");

  if (jwt) {
    return {
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json",
    };
  } else {
    return {};
  }
}
