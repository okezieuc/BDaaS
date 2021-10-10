function createEmailBody(birthdays) {
  return `
<p>Hello,</p>

<p>Today is the birthday of these people you know:</p>

<ul>
${birthdays.map((birthday) => `<li>${birthday.celebrant_name}</li>`).join("\n")}
</ul>

<p>Don't forget to wish them happy birthdays!</p>

Your Birthday Buddy
`;
}

module.exports = createEmailBody;
