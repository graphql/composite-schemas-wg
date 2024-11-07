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
  frequency: "weekly",
  primaryN: 1,
  weekday: "Th", // M, Tu, W, Th, F, Sa, Su
  time: "18:00-19:00", // 24-hour clock, range
  attendeesTemplate: `\
| Name             | GitHub        | Organization       | Location              |
| :--------------- | :------------ | :----------------- | :-------------------- |
`,
  dateAndTimeLocations:
    "p1=3775&p2=110&p3=24&p4=37&p5=188&p6=496&p7=676&p8=438&p9=268&p10=234&p11=78&p12=604",
  joiningAMeetingFile: "JoiningAMeeting.md",
  description: `\
The Composite Schemas subcommittee meets weekly to progress the "Composite
Schemas Specification" project.

The first meeting each month is the primary monthly meeting; to enable a greater
cadence of progress we also have weekly meetings which tend to be more informal.`
};

module.exports = config;
