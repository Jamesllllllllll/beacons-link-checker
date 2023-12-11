export default function RoadMap() {
  return (
    <ul className="self-start px-6">
      <li className="mb-8">
        <p className="font-semibold">User registration</p>
        <ul className="my-2">
          <li className="my-2">
            Save a Beacons account: check with a CRON job daily, weekly, etc.
          </li>
          <li className="my-2">
            Email notifications when broken links are detected
          </li>
        </ul>
      </li>
      <li className="mb-8">
      <p className="font-semibold">Add more Link in Bio Services</p>
        <ul className="my-2">
          <li className="my-2">
            Linktree, Shorby, Campsite, Bio-Sites, etc.
          </li>
        </ul>
      </li>
    </ul>
  );
}
