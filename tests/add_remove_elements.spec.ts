import test, { expect } from "@playwright/test"

test("add/remove elements link", async ({ page }) => {
  await page.goto("/")

  // Click the Add/Remove Elements link
  await page.getByRole("link", { name: "Add/Remove Elements" }).click()

  // Expects page to have a heading with the name of Add/Remove elements
  await expect(page.getByRole("heading", { name: "Add/Remove Elements" })).toBeVisible()
})

test("should add and remove element", async ({ page }) => {
  await page.goto("/add_remove_elements/")

  // Click the Add Element button
  await page.getByRole("button", { name: "Add Element" }).click()
  // Expects page to have an element with .added-manually class
  await expect(page.locator(".added-manually")).toBeVisible()

  // Click the Delete button
  await page.getByRole("button", { name: "Delete" }).click()
  // Expects page to not have an element with .added-manually class
  await expect(page.locator(".added-manually")).toBeHidden()
})

test("should add three elements", async ({ page }) => {
  await page.goto("/add_remove_elements/")

  // Click the Add Element button three times
  await page.getByRole("button", { name: "Add Element" }).click()
  await page.getByRole("button", { name: "Add Element" }).click()
  await page.getByRole("button", { name: "Add Element" }).click()

  // Expects page to have three elements with .added-manualy class
  await expect(page.locator(".added-manually")).toHaveCount(3)
})
