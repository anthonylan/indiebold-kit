import postmarkClient from 'postmark'

export default defineEventHandler(async (event) => {
    const { postMarkKey, senderEmail, public: { clientBaseUrl } } = useRuntimeConfig()
    const client = new postmarkClient.ServerClient(postMarkKey);

    const { email, owner, org_name, msg } = await readBody(event);

    const raw = msg || ` <p>${owner} has invited you to join ${org_name} on IndieBold. This invitation has no expiration date, unless revoked by the organization owner.</p>`

    try {
     await client.sendEmail({
        "From": senderEmail,
        "To": email,
        "Subject": `You're invited to join IndieBold`,
        "HtmlBody": `
          ${raw}
          <p>If you don't already have an account, click the link below to create one and join us.</p>
          <p>${clientBaseUrl}/register</p>
        `,
        "TextBody": "Hello from Indiebold!",
        "MessageStream": "broadcast"
      })

      return { msg: 'Invite sent' }
    } catch (error) {
      return { error }
    }
});