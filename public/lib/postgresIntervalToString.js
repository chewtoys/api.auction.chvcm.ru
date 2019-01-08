// TODO: PR this function to https://github.com/bendrucker/postgres-interval
export default function postgresIntervalToString(interval) {
  return [
    interval.years ? `${interval.years} years` : null,
    interval.months ? `${interval.months} mons` : null,
    interval.days ? `${interval.days} days` : null,
    [
      ["hours", "minutes", "seconds"].map((x) => String(interval[x] || "0").padStart(2, "0")).join(":"),
      interval.milliseconds ? String(interval.milliseconds).padStart(3, "0") : null,
    ].filter((x) => !!x).join(".")
  ].filter((x) => !!x).join(" ");
}
