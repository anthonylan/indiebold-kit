# Indiebold Nuxt / SaaS Starter Kit

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anthonylan/indiebold-kit.git
   cd project-root 
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:

   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   SUPABASE_ROLE=your_supabase_secret_key
   STRIPE_SK=your_stripe_secret_key
   BASE_URL=your_site_url
   POSTMARK_SK=your_postmark_key
   SMTP_EMAIL="hello@example.com"
   SERVER_PRESET=netlify_edge
   ```

   - **BASE_URL:** Your base URL could be `http://localhost:3000` during development and `https://example.com` in production.
   - **POSTMARK_SK:** Used for the email invitation feature, but feel free to use your own email provider.
   - **SMTP_EMAIL:** This is the sender email address, e.g., `hello@indiebold.com`.

## Concept

If you've purchased this starter kit, you're likely a developer or working with one.

### User Authentication

User authentication is entirely handled by Supabase, with no additional server functionality. Ensure that you:
- Enable the login methods you need in **Supabase Auth Providers**.
- Set the client and secret keys as required.
- Refer to the Supabase documentation for setup details.

#### URL Configuration in Supabase Auth Section

In development, use these redirect URLs:
- `http://localhost:3000/home`
- `http://localhost:3000/password/update`

In production, add corresponding URLs for your domain:
- `https://example.com/home`
- `https://example.com/password/update`

**Explanation:**
- `/home`: Redirects users after logging in with Google, Discord, etc.
- `/password/update`: Redirects users to update their password after clicking the reset email link.

#### Using Auth Methods

All authentication methods are pre-defined in `composables/useAuth.ts`.

### Onboarding

To keep the setup simple, no additional data is required after registration. However, if you wish to collect extra details (e.g., full name, organization), the onboarding components facilitate this.

- If a user provides an organization name, a default organization is created for them.
- Stripe integration checks if the user exists; if not, a new Stripe customer is created, and the customer ID is saved in `user_metadata`.

### Billing

Billing is implemented using **Stripe Checkout and Stripe Portal**. The pricing data is in `scripts/data.ts`.

#### Example Pricing Structure

For a single plan:
```js
[
  {
    name: "Pro",
    product: "product_id_xx",
    prices: ["price_id_monthly"]
  }
]
```

For monthly and yearly pricing:
```js
[
  {
    name: "Pro",
    product: "product_id_xx",
    prices: ["price_id_monthly", "price_id_yearly"]
  }
]
```

For multiple plans with dynamic pricing:
```js
[
  {
    name: "Pro",
    product: "product_id_xx",
    prices: ["price_id_monthly", "price_id_yearly"]
  },
  {
    name: "Enterprise",
    product: "product_id_aa",
    prices: ["price_id_monthly"]
  }
]
```

Billing-related functions are in `composables/useBilling.ts`.

### Members & Organizations

Organizations and team management aim to balance simplicity and practicality.

- When a user creates an organization, they are automatically added as a team member with:
  ```js
  {
    email: "xx@example.com",
    role: 0,
    owner: true,
    date: Date.now()
  }
  ```
- When an invited user logs in and accesses `/settings/members`, their user ID is linked to the team object:
  ```js
  {
    email: "xx@example.com",
    role: 2,
    date: Date.now(),
    uid: "xxxxx"
  }
  ```
- The system retrieves user details from Supabase using `uid`, avoiding redundant data storage.

#### Sharing Resources with Organization Members

To associate resources with an organization, use an `organization_id` column. Example:

**Creating a resource:**
```js
const { error } = await supabase.from("countries").insert({
  id: 1,
  name: "Mordor",
  org_id: 234
});
```

**Retrieving organization-specific resources:**
```js
const { data, error } = await supabase.from("countries").select("name").eq("org_id", 234);
```

This ensures that only resources associated with the user's selected organization are retrieved.

Team-related functions are in `composables/useTeam.ts`.

## Illustrations Used

[Figma File](https://www.figma.com/design/Js6iAQUDFmPE0e4bwoDVkV/510-Abstract-Illustrations-%E2%80%93-New-York-vector-illustrations-set-%28svg-png%29-%28Community%29?node-id=1140-5&p=f&t=uEvVVikHrl2aMTnA-0)

## Support
If you have any questions or run into an issue you’re struggling to solve, feel free to contact me on Instagram (I respond faster there) or reach out via email at hello@indiebold.com.

This project is regularly updated and maintained, so you’ll always have access to the latest version.
