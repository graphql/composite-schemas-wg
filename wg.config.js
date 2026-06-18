// @ts-check

/** @type {import('wgutils').Config} */
const config = {
  name: "Composite Schemas WG",
  repoUrl: "https://github.com/graphql/composite-schemas-wg",
  videoConferenceDetails: `https://zoom.us/j/91078840351
  - _Password:_ composite`,
  liveNotesUrl:
    "https://docs.google.com/document/d/1hJO6U7daYvcNcQ3FBKnh3v4R256ers6M8IGyqRpY_kE/edit?usp=sharing",
  timezone: "Europe/Berlin",
  frequency: "monthly",
  weekday: "Th", // M, Tu, W, Th, F, Sa, Su
  nth: 1, // primary: 1st Thursday of the month
  time: "18:00-19:00", // primary time, 6 PM CET, 24-hour clock range
  filenameFragment: "primary",
  secondaryMeetings: [
    {
      nth: 3, // 3rd Thursday of the month
      time: "11:00-12:00", // secondary time, 11 AM CET
      name: "Secondary",
      filenameFragment: "secondary"
    }
  ],
  attendeesTemplate: `\
| Name             | GitHub        | Organization       | Location              |
| :--------------- | :------------ | :----------------- | :-------------------- |
`,
  dateAndTimeLocations:
    "p1=3775&p2=110&p3=24&p4=37&p5=188&p6=496&p7=676&p8=438&p9=268&p10=234&p11=78&p12=604",
  joiningAMeetingFile: "JoiningAMeeting.md",
  description: `\
The Composite Schemas subcommittee meets on the first and third Thursday of each
month to progress the "Composite Schemas Specification" project.

The first meeting each month is the primary monthly meeting; the second meeting
is held earlier in the day to be accessible to attendees in Australian (APAC)
time zones.`
};

module.exports = config;
