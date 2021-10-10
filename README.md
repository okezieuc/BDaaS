# BDaaS (Birthday Tracker and Email Reminder)

The first open-source birthday as a service that helps you say  more "Happy birthdays" and less "Sorry, I forgot your birthdays".

[Create your BDaaS account to get birthday reminders](https://bdaas.vercel.app).

![bdaas vercel app_dashboard](https://user-images.githubusercontent.com/53785400/136712636-cc6a7fce-215e-44bf-8c58-e0e1fe3bcf6a.png)


BDaaS is brought to you by [Okezie Chiedozie](https://github.com/okezieuc). I was motivated to build this fun birthday tracking project to make sure I never forget to wish my closest friends a happy birthday(I'm pretty sure every one of us has forgotten to wish a friend happy birthday). BDaaS will help us keep track of all friend and family birthdays. You can reach me on Twitter at @okeziechiedozie.

BDaaS is built on Supabase. We use Supabase to allow users to login with their Google accounts. We also use PostgreSQL row level security rules provided via Supabase to restrict user access to birthday data stored in the database.

The frontend was created with Next.js and Tailwindcss. Both were chosen due to their simplicity and ease of use. We also set up a nodejs cron job that runs once daily. This cron job is responsible for sending emails to users when it is the birthday of one of the people on their list.

Contributions and suggestion are welcome. Feel free to send in a PR to fix bugs or add features.
