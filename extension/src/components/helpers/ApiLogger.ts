const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const apiLogger =async (url:string,event:string,content:string) => {
    console.log('apiLogger',url,event, content);
    const postData = {
        content: content,
        url: url,
        action: event,
        timezone: timezone,
        user_id: 'godwin.pinto'
      };

      fetch('https://aimon-api.vercel.app/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
    .then(data => {
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
} 