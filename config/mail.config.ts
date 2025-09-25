export const mailConfig = {
  /*
    |--------------------------------------------------------------------------
    | Default Mailer
    |--------------------------------------------------------------------------
    |
    | This option controls the default mailer that is used to send all email
    | messages unless another mailer is explicitly specified when sending
    | the message. All additional mailers can be configured within the
    | "mailConfig" object. Examples of each type of mailer are provided.
    |
    */

  mailers: {
    /*
        |--------------------------------------------------------------------------
        | SMTP Mailer
        |--------------------------------------------------------------------------
        |
        | Here you may configure the SMTP mailer, which is not enabled by default.
        |
        */
    smtp: {
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      fromAddress: process.env.MAIL_FROM_ADDRESS,
      port: process.env.MAIL_PORT || 587,
      secure: false,
      password: process.env.MAIL_PASSWORD,
      user: process.env.MAIL_USER,
    },
  },
};
