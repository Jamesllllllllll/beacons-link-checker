export default function RoadMap() {
  return (
    <>
      <h2>Roadmap</h2>
      <ul className="self-start flex flex-col gap-4">
        <li className="font-bold">User Registration</li>
        <ul>
          <li>AuthJS scaffolded - awaiting DB for implementation</li>
        </ul>
        <li className="font-bold mt-2">Email notifications when broken links are detected</li>
        <ul>
          <li>Sendgrid & CRON jobs implemented</li>
        </ul>
        <li className="font-bold mt-2">Add more Link in Bio Services</li>
        <ul>
          <li>Linktree, Shorby, Campsite, Bio-Sites, etc.</li>
        </ul>
      </ul>
    </>
  );
}
