export const authConfig = {
  /*
    |--------------------------------------------------------------------------
    | Public Paths
    |--------------------------------------------------------------------------
    |
    | Define the routes that do not require user authentication. Users can
    | access these paths without being logged in.
    |
    */
  publicPaths: [
    "/app/login",
    "/app/registration",
    "/app/forget-password",
    "/app/reset-password",
  ],

  /*
    |--------------------------------------------------------------------------
    | Email-based authentication toggle
    |--------------------------------------------------------------------------
    |
    | Flag to enable/disable email-based login
    |
    */
  emailAuthEnabled: true,

  /*
    |--------------------------------------------------------------------------
    | Session Configuration
    |--------------------------------------------------------------------------
    |
    | The settings for managing user sessions. Includes the cookie used to
    | store session tokens and its behavior such as lifespan, scope, and
    | security.
    |
    */
  session: {
    maxAge: 60 * 60 * 24, // 1 day
    httpOnly: true, // Prevent JavaScript access; HTTP only for security
    sameSite: "lax" as const, // Restrict cookies to same-site requests by default
    secure: process.env.NODE_ENV === "production", // Only send cookies over HTTPS in production
    path: "/", // Cookie is accessible site-wide
  },

  /*
    |--------------------------------------------------------------------------
    | JSON Web Token (JWT) Configuration
    |--------------------------------------------------------------------------
    |
    | Settings for managing JWTs, including the secret key used for signing,
    | the token expiration time, and whether encryption is enabled.
    |
    */
  jwt: {
    cookieName: "accessToken",
    refreshCookieName: "refreshToken",
    secret: process.env.JWT_SECRET || "default_secret", // Secret key for signing and verifying JWTs
    refreshSecret:
      process.env.JWT_REFRESH_TOKEN_SECRET || "default_refresh_secret", // Secret key for signing and verifying JWTs refresh
    expiry: "15m", // Token validity duration (15 minute)
    refreshExpiry: "7d", // Token validity duration (7 days)
    encryption: true, // Enable encryption for additional security
  },

  /*
    |--------------------------------------------------------------------------
    | Password Policy
    |--------------------------------------------------------------------------
    |
    | Define the rules for user passwords. Set requirements for length and
    | inclusion of specific character types like uppercase letters, numbers,
    | and symbols.
    |
    */
  passwordPolicy: {
    minLength: 6, // Minimum password length
    requireUppercase: false, // Require at least one uppercase letter
    requireLowercase: false, // Require at least one lowercase letter
    requireNumber: false, // Require at least one number
    requireSymbol: false, // Require at least one special symbol
  },

  /*
    |--------------------------------------------------------------------------
    | Multi-Factor Authentication (MFA) Configuration
    |--------------------------------------------------------------------------
    |
    | Enable and configure MFA for added security. Specify the provider to
    | use and any necessary API keys for SMS-based authentication.
    |
    */
  mfa: {
    enabled: false, // Enable or disable MFA
    provider: "authenticator", // MFA provider: "authenticator", "sms", or "email"
    smsProviderApiKey: process.env.SMS_API_KEY || "", // API key for SMS provider
  },

  /*
    |--------------------------------------------------------------------------
    | Authentication Redirects
    |--------------------------------------------------------------------------
    |
    | Paths for redirection during authentication workflows, such as where
    | users are sent after login or when unauthorized access is detected.
    |
    */
  authRedirects: {
    login: "/app/login", // Redirect path for the login page
    dashboard: "/app/dashboard", // Redirect path after successful login
    forbidden: "/403", // Redirect path for unauthorized access attempts
  },

  /*
    |--------------------------------------------------------------------------
    | CSRF Protection Configuration
    |--------------------------------------------------------------------------
    |
    | Enable Cross-Site Request Forgery (CSRF) protection to safeguard
    | against unauthorized commands being transmitted from authenticated users.
    |
    */
  csrfConfig: {
    enabled: true, // Enable or disable CSRF protection
    secret: process.env.CSRF_SECRET || "csrf_default_secret", // Secret key for generating CSRF tokens
  },

  /*
    |--------------------------------------------------------------------------
    | OAuth Providers Configuration
    |--------------------------------------------------------------------------
    |
    | Configure settings for third-party authentication providers such as
    | Facebook, Google, Twitter, and GitHub. Include client credentials and
    | redirect URIs for each service.
    |
    */
  oauthProviders: {
    facebook: {
      enabled: false,
      authUri: process.env.FACEBOOK_AUTH_URI || "",
      clientId: process.env.FACEBOOK_CLIENT_ID || "", // Facebook app client ID
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "", // Facebook app client secret
      redirectUri: process.env.FACEBOOK_REDIRECT_URI || "", // Redirect URI for Facebook OAuth
    },
    google: {
      enabled: true,
      authUri:
        process.env.GOOGLE_AUTH_URI ||
        "https://accounts.google.com/o/oauth2/v2/auth",
      clientId: process.env.GOOGLE_CLIENT_ID || "", // Google app client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", // Google app client secret
      redirectUri: process.env.GOOGLE_REDIRECT_URI || "", // Redirect URI for Google OAuth
    },
    twitter: {
      enabled: false,
      authUri: process.env.TWITTER_AUTH_URI || "",
      clientId: process.env.TWITTER_CLIENT_ID || "", // Twitter app client ID
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "", // Twitter app client secret
      redirectUri: process.env.TWITTER_REDIRECT_URI || "", // Redirect URI for Twitter OAuth
    },
    github: {
      enabled: false,
      authUri: process.env.GITHUB_AUTH_URI || "",
      clientId: process.env.GITHUB_CLIENT_ID || "", // GitHub app client ID
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "", // GitHub app client secret
      redirectUri: process.env.GITHUB_REDIRECT_URI || "", // Redirect URI for GitHub OAuth
    },
  },
};
