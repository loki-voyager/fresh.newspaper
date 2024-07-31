const { Builder, By, until } = require("selenium-webdriver");
const mocha = require("mocha");
const { describe, it, before, after } = mocha;

URL = "http://localhost:3000/";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateRandomUser() {
  const randomString = (length) => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const randomName = () => {
    const names = [
      "John",
      "Jane",
      "Alice",
      "Bob",
      "Charlie",
      "Daisy",
      "Edward",
      "Fiona",
      "George",
      "Hannah",
    ];
    return names[Math.floor(Math.random() * names.length)];
  };

  const randomSurname = () => {
    const surnames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
    ];
    return surnames[Math.floor(Math.random() * surnames.length)];
  };

  const randomEmail = (firstName, lastName) => {
    const domains = ["example.com", "mail.com", "test.com", "domain.com"];
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${
      domains[Math.floor(Math.random() * domains.length)]
    }`;
  };

  const user = {
    username: randomString(8),
    password: randomString(12),
    first_name: randomName(),
    last_name: randomSurname(),
    email: "",
  };

  user.email = randomEmail(user.first_name, user.last_name);

  console.log({ user: user });

  return user;
}

describe("Test", function () {
  let driver;

  this.timeout(30000);

  before(async function () {
    console.log("start :>");
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    // await driver.quit();
    console.log("end :<");
  });
  it("should sign in successfully", async function () {
    await driver.get(URL);
    const UserSignIn = { username: "john_doe", password: "s3cur3P@ssw0rd!" };
    await SingInSingOut(true, UserSignIn);
    const UserSignUp = generateRandomUser();
    await SingUpSingOut(false, UserSignUp);
    const news = generateRandomNews();
    await CreateNews(news);
    const comments = generateRandomNews();
    await CreateComments(comments);
  });

  async function SignOut(time) {
    await driver.wait(
      until.elementLocated(By.className("shape-profile")),
      10000
    );
    await sleep(time);
    await driver.findElement(By.id("signout")).click();
    console.log({ SignOut: true });
  }

  async function SingInSingOut(bool, user) {
    await driver.findElement(By.id("signin")).click();
    await driver.wait(until.elementLocated(By.id("signinForm")), 10000);

    await driver.findElement(By.id("data")).sendKeys(user.username);
    await driver.findElement(By.id("password")).sendKeys(user.password);

    await driver.findElement(By.css('button[type="submit"]')).click();

    if (bool) {
      await SignOut(2000);
    }
    console.log({ SingIn: true });
  }

  async function SingUpSingOut(bool, user) {
    await driver.findElement(By.id("signup")).click();

    await driver.wait(until.elementLocated(By.id("signupForm")), 10000);

    await driver.findElement(By.id("username")).sendKeys(user.username);

    await driver.findElement(By.id("password")).sendKeys(user.password);

    await driver.findElement(By.id("first_name")).sendKeys(user.first_name);

    await driver.findElement(By.id("last_name")).sendKeys(user.last_name);

    await driver.findElement(By.id("email")).sendKeys(user.email);

    await driver.findElement(By.css('button[type="submit"]')).click();

    if (bool) {
      await SignOut(2000);
    }
    console.log({ SingUp: true });
  }

  async function CreateNews(news) {
    await driver.wait(
      until.elementLocated(By.className("shape-profile")),
      10000
    );

    await driver.findElement(By.id("news")).click();

    await driver.wait(until.elementLocated(By.id("create_news")), 10000);

    await driver.findElement(By.id("create_news")).click();

    await driver.wait(until.elementLocated(By.id("title")), 10000);

    await driver.findElement(By.id("title")).sendKeys(news.title);

    await driver.wait(until.elementLocated(By.id("body")), 10000);

    await driver.findElement(By.id("body")).sendKeys(news.body);

    await driver.wait(
      until.elementLocated(By.css('button[type="submit"]')),
      10000
    );

    await driver.findElement(By.css('button[type="submit"]')).click();

    console.log({ CreateNews: true });
  }

  async function CreateComments(comments) {
    await driver.wait(until.elementLocated(By.className("news-list")), 10000);

    const newsListExists = await driver.findElements(By.id("news-list"));
    if (newsListExists.length == 0) {
      await driver.wait(
        until.elementLocated(By.className("shape-profile")),
        10000
      );
      await driver.findElement(By.id("news")).click();

      await driver.wait(until.elementLocated(By.id("news-list")), 10000);
    }

    const links = await driver.findElements(By.tagName("a"));

    const regex = /^news\/\d+$/;
    const baseUrl = "http://localhost:3000/";

    for (const link of links) {
      const href = await link.getAttribute("href");
      const cleanedHref = href.replace(baseUrl, "");
      if (regex.test(cleanedHref)) {
        await link.click();
        break;
      }
    }

    await driver.wait(until.elementLocated(By.id("comments-btn")), 10000);

    await driver.findElement(By.id("comments-btn")).click();

    await driver.wait(until.elementLocated(By.id("create-comment")), 10000);

    await driver.wait(until.elementLocated(By.id("body")), 10000);

    await driver.findElement(By.id("body")).sendKeys(comments.body);

    await driver.wait(
      until.elementLocated(By.css('button[type="submit"]')),
      10000
    );

    await driver.findElement(By.css('button[type="submit"]')).click();
    console.log({ CreateComments: true });
  }

  function generateRandomNews() {
    return { title: generateRandomTitle(), body: generateRandomBody() };
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomTitle() {
    const adjectives = [
      "Amazing",
      "Incredible",
      "Fantastic",
      "Mysterious",
      "Brilliant",
    ];
    const nouns = ["Adventure", "Journey", "Quest", "Saga", "Expedition"];
    const descriptors = [
      "of the Unknown",
      "in the Wild",
      "Beyond the Horizon",
      "of the Future",
      "from the Past",
    ];

    const adjective = adjectives[getRandomInt(0, adjectives.length - 1)];
    const noun = nouns[getRandomInt(0, nouns.length - 1)];
    const descriptor = descriptors[getRandomInt(0, descriptors.length - 1)];

    return `${adjective} ${noun} ${descriptor}`;
  }

  function generateRandomBody() {
    const openingSentences = [
      "In a surprising turn of events,",
      "Recently,",
      "According to sources,",
      "Breaking news:",
      "In an unprecedented move,",
    ];
    const middleSentences = [
      "the situation has escalated quickly.",
      "experts are weighing in on the matter.",
      "the community is reacting strongly.",
      "authorities are investigating the incident.",
      "new developments have emerged.",
    ];
    const detailsSentences = [
      "Sources close to the situation have revealed that",
      "Witnesses reported that",
      "Officials have confirmed that",
      "Reports indicate that",
      "Analysts suggest that",
    ];
    const concludingSentences = [
      "the outcome remains uncertain.",
      "more information will be available soon.",
      "the implications are still being assessed.",
      "this story is still developing.",
      "stakeholders are advised to stay informed.",
    ];

    const opening =
      openingSentences[getRandomInt(0, openingSentences.length - 1)];
    const middle = middleSentences[getRandomInt(0, middleSentences.length - 1)];
    const details =
      detailsSentences[getRandomInt(0, detailsSentences.length - 1)];
    const concluding =
      concludingSentences[getRandomInt(0, concludingSentences.length - 1)];

    return `${opening} ${middle} ${details} ${concluding}`;
  }
});
