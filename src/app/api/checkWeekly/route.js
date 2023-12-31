import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function GET(req, res) {
  console.log('checkWeekly starting...');
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? `https://beacons-link-checker.vercel.app`
      : `http://localhost:3000`;
  const username = req.nextUrl.searchParams.get('user');
  const email = req.nextUrl.searchParams.get('email');
  let links;
  const linkStatuses = [];
  const linkWarning = [];
  const linkError = [];
  const url = `${baseUrl}/api/checkBeacon?username=${username}`;
  try {
    console.log(`checkBeacon is checking: ${url}`);
    const response = await fetch(url, { method: 'GET' });
    if (response.ok) {
      // 3. The checkBeacon API route will return an array of links.
      const { data } = await response.json();
      links = data;
      // 4. Then loop through each link and call the checkHeader API route.
      for (let i = 0; i < links.length; i++) {
        const url = links[i];
        try {
          const response = await fetch(
            `${baseUrl}/api/checkHeader?url=${url}`,
            { method: 'GET', cache: 'no-store' }
          );
          if (response.ok) {
            const { data } = await response.json();
            console.log(`Status: ${data}`);
            // 5. Add each status to an array of link statuses.
            linkStatuses.push({ url: url, status: data });
            if (data === 403) {
              console.log(`Adding ${url} to linkWarning array`);
              linkWarning.push(url);
            } else if (data !== 200) {
              console.log(`Adding ${url} to linkError array`);
              linkError.push(url);
            }
          } else {
            console.log(`checkHeader failed: ${response.statusText}`);
          }
        } catch (error) {
          console.log(`There was an error: ${error}`);
        }
      }
    } else {
      console.log(response.statusText);
    }
    if (linkWarning.length || linkError.length) {
      // 6. If there are any links with a status other than 200, it will send an email to the user.

      const msg = {
        to: email,
        from: 'james@jameskeezer.dev',
        subject: 'Beacons Link Status',
        html:
          `Report for Beacons user ${username} <br />` +
          `${
            linkError[0] !== undefined
              ? 'These links may not be working: <br /><ul>' +
                linkError.map((link) => `<a href="${link}">${link}</a><br />`)
              : ''
          }` +
          `${
            linkWarning[0] !== undefined
              ? '</ul><br />You have links that have redirects: <br /><ul>' +
                linkWarning
                  .map((link) => `<a href="${link}">${link}</a><br />`)
                  .join('') +
                '</ul>'
              : ''
          }`,
      };
      console.log('Sending email...');
      try {
        await sgMail.send(msg);
        console.log(`Email sent to ${email}`);
      } catch (error) {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
      // sgMail
      //   .send(msg)
      //   .then(() => {
      //     console.log(`Email sent to ${email}`);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      return NextResponse.json({ data: 'Success' }, { status: 200 });
    }
  } catch (error) {
    console.log(`There was an error: ${error}`);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
