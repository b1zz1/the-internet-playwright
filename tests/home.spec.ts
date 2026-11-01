import test, { expect } from "@playwright/test"

test("home link", async ({ page }) => {
  await page.goto("/")

  // Expects page to have a heading with the name Welcome to the-internet.
  await expect(page.locator(".heading", { hasText: "Welcome to the-internet" })).toBeVisible()
})
