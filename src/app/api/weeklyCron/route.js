import { NextResponse } from 'next/server';

// https://vercel.com/docs/cron-jobs#create-or-update-your-vercel.json-file.
// Called by CRON job every monday at 6am UTC (in vercel.json: "schedule": "0 5 * * 1")

/***
 * This CRON JOB will:
 * 1. Pull an array of daily users from the database
 * 2. Loop through each user and call the checkWeekly API route, which in turn calls the checkBeacon route
 * In checkWeekly:
 * 3. The checkBeacon API route will return an array of links.
 * 4. Then loop through each link and call the checkHeader API route.
 * 5. Add each link status to an array of link statuses.
 * 6. If there are any links with a status other than 200, it will send an email to the user.
 */

const mockDailyUsers = [
  {
    id: 1,
    username: 'james',
    email: `jameskeezer@gmail.com`,
  },
  // {
  //   id: 2,
  //   username: 'duckytheyorkie',
  //   email: 'jameskeezer@gmail.com',
  // },
  // {
  //   id: 3,
  //   username: 'jimmy',
  //   email: 'jameskeezer@gmail.com',
  // },
];

export async function GET(req, res) {
  // 1. Pull an array of daily users from the database
  // const dailyUsers = await db.dailyUsers.something?
  // if (!dailyUsers || !dailyUsers.length) {
  //   return;
  // }
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? `https://${process.env.VERCEL_URL}.vercel.app`
      : `http://localhost:3000`;
  // 2. Loop through each user and call the checkWeekly API route
  for (let i = 0; i < mockDailyUsers.length; i++) {
    const username = mockDailyUsers[i].username;
    const email = mockDailyUsers[i].email;
    const url = `${baseUrl}/api/checkWeekly?user=${username}&email=${email}`;
    console.log(`CRON job checking: ${username}`);
    try {

      // checkWeekly will be evoked for each user checked in this loop
      // An email will be sent if they have any broken links
      console.log(`fetching ${url}`)

      const response = await fetch(url, { method: 'GET', cache: 'no-cache' });
      if (response.ok) {
        const { data } = await response.json();
        console.log(`Data: ${data}`)
      }
      console.log('fetch complete')
      // return response;
      // The await below is not necessary and would timeout when the user list gets long
      //
      // const response = await fetch(url, { method: 'GET' });
      // if (response.ok) {
      //   console.log(`Response OK! - response.ok = ${response.ok}`);
      // } else {
      //   console.log(`There was an error: ${response.statusText}`);
      // }

    } catch (err) {
      console.log(`There was an error: ${err}`);
    }
  }
  console.log('ALL JOBS DONE!')
  return new NextResponse({ status: 'done'})
}
