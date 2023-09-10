import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

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
    email: 'jameskeezer+beaconstest1@gmail.com',
  },
  {
    id: 2,
    username: 'duckytheyorkie',
    email: 'jameskeezer+beaconstest2@gmail.com',
  },
  {
    id: 3,
    username: 'arthurdent',
    email: 'jameskeezer+beaconstest3@gmail.com',
  },
];

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function GET(req, res) {
  // 1. Pull an array of daily users from the database
  // const dailyUsers = await db.dailyUsers.something?

  // 2. Loop through each user and call the checkBeacon API route.
  for (let i = 0; i < mockDailyUsers.length; i++) {
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
        for (let i = 0; i < links.length; i++) {
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

        const msg = {
          to: mockDailyUsers[i].email, 
          from: 'james@jameskeezer.dev',
          subject: 'Beacons Link Status',
          text: `You have links that are not working: <br /><br /> ${linkWarning}`,
        }

        sgMail
          .send(msg)
          .then(() => {
            console.log(`Email sent to ${mockDailyUsers[i].email}`);
          })
          .catch((error) => {
            console.error(error);
          })
      }
    } catch (err) {
      console.log(`There was an error: ${err}`);
    }
  }
}
