import { test, expect } from "@playwright/test";

test("should trigger the file save dialog when exporting to PDF", async ({
  page,
}) => {
  // Go to the application's main page (adjust URL as needed)
  await page.goto("http://localhost:5174");

  // Reuse the text from the first test
  const dummyText = `
  React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library[4][5] for building user interfaces based on components by Facebook Inc. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.[6][7][8]

  React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.[9][10] A key advantage of React is that it only rerenders those parts of the page that have changed, avoiding unnecessary rerendering of unchanged DOM elements. It was first launched on 29 May 2013.

  React adheres to the declarative programming paradigm.[11]: 76  Developers design views for each state of an application, and React updates and renders components when data changes. This is in contrast with imperative programming.[12]

  React code is made of entities called components.[11]: 10–12  These components are modular and reusable.[11]: 70  React applications typically consist of many layers of components. The components are rendered to a root element in the DOM using the React DOM library. When rendering a component, values are passed between components through props (short for "properties"). Values internal to a component are called its state.[13]
  `;
  await page.fill('textarea[placeholder="Type or paste text here"]', dummyText);

  // Click the Analyse button to generate the analysis
  await page.click('button:has-text("Analyse")');

  // Wait for the download dialog to appear
  const [download] = await Promise.all([
    page.waitForEvent("download"), // Wait for the download event to be triggered
    page.click("text=Export to PDF"), // Trigger the download by clicking the button
  ]);

  // Check if the download was triggered, which implies the save dialog appeared
  expect(download).toBeTruthy();
});
