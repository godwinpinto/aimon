# AI-Mon
AI-Mon (AI Monitoring) is a detection and monitoring system to make detect and capture information from employees when using website.

## What problem is AI-Mon solving?
In the world where artifical intelligence based chatbots is gaining popularity. The risk of your internal content (owned by organization) being published to third party websites is increasing.

Proof that there exists a problem [refer article](https://www.cyberhaven.com/blog/4-2-of-workers-have-pasted-company-data-into-chatgpt/)

**What options are you left with?**
1. Capturing all data through proxy servers and analyzing the content
2. Block those websites


## How AI-Mon works
1. AI-Mon is a project which gathers content from users who have browser extension installed on events that involve (CUT, COPY, PASTE) to websites that have been defined in the policy.
2. It then uses Airtificial intelligence to tag the content and store in a TiDB database
3. The administrators can then assess the contents and tagging and mark as not dangerous

### AI-Mon Components
Consists of below components
1. **A Browser Extension**: A Browser extension to capture user events based on manifest version 3
2. **Policy File**: To decide which websites should be excluded from event capturing
3. **Server API**: To gathering events, connect to ChatGPT (or any selfhosted AI like H2O.ai) and get tags
4. **TiDB DataStore**: Storing these events and tags which may have heavy ingestion rate and also used for analytics
5. **Admin Panel**: To view dashboard of tags, events and audit them. You can also view detailed activities.


