import { NextResponse } from 'next/server';

// https://vercel.com/docs/cron-jobs#create-or-update-your-vercel.json-file.
// Called by CRON job every monday at 6am UTC (in vercel.json: "schedule": "0 5 * * 1")

/***
 * This CRON JOB will:
 * 1. Pull an array of daily users from the database
 * 2. Loop through each user and call the checkBeacon API route.
 * 3. The checkBeacon API route will return an array of links.
 * 4. Then loop through each link and call the checkHeader API route.
 * 5. Add each link status to an array of link statuses.
 * 6. If there are any links with a status other than 200, it will send an email to the user.
 */

const mockDailyUsers = [
  {
    id: 1,
    username: 'james',
    email: 'james@doe.com',
    links: [
      'https://www.google.com',
      'https://www.facebook.com',
      'https://www.twitter.com',
    ],
  },
  {
    id: 2,
    username: 'ducktheyorkie',
    email: 'ducky@1122334455.com',
    links: [
      'https://www.codecademy.com',
      'https://www.github.com',
      'https://www.stackoverflow.com',
    ],
  },
  {
    id: 3,
    username: 'arthurdent',
    email: 'arthur@dent.com',
    links: [
      'https://www.hitchhikersguide.com',
      'https://www.endoftheuniverse.com',
      'https://www.lifetheuniverseandeverything.com',
    ],
  },
];

const SENGRID_API_KEY = process.env.SENDGRID_API_KEY;

export async function GET(req, res) {
  // 1. Pull an array of daily users from the database
  // const dailyUsers = await db.dailyUsers.something?

  // 2. Loop through each user and call the checkBeacon API route.
  for (i = 0; i < mockDailyUsers.length; i++) {
    let links;
    let linkStatuses = [];
    let linkWarning = [];
    try {
      const response = await fetch(
        `/api/checkBeacon?username=${mockDailyUsers[i].username}`
      );
      if (response.ok) {
        // 3. The checkBeacon API route will return an array of links.
        const { data } = await response.json();
        links = data;
        // 4. Then loop through each link and call the checkHeader API route.
        for (i = 0; i < links.length; i++) {
          try {
            const response = await fetch(`/api/checkHeader?url=${links[i]}`);
            if (response.ok) {
              const { data } = await response.json();
              console.log(data);
              // 5. Add each status to an array of link statuses.
              linkStatuses.push(data);
              if (data.statusText !== 'OK') {
                linkWarning.push(data);
              }
            } else {
              throw new Error(response.statusText);
            }
          } catch (err) {
            console.log(`There was an error: ${err}`);
          }
        }
      } else {
        throw new Error(response.statusText);
      }
      if (linkWarning.length) {
        // 6. If there are any links with a status other than 200, it will send an email to the user.
        // sendEmailorSomething(linkWarning, mockDailyUsers[i].email);
      }
    } catch (err) {
      console.log(`There was an error: ${err}`);
    }
  }
}
