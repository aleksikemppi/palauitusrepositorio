const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, addBlog } = require('./helper')

describe('Blogs app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Juho Testaaja',
        username: 'jtestaaja',
        password: 'salainen'
      }
    })

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Eternal Blogger',
        username: 'eternalblogger',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  }, 10000) 

  test('Front page should be opened', async ({ page }) => {
    const locator = await page.getByText('Blogs')
    await expect(locator).toBeVisible()
  })

  test('Login form should be displayed', async ({ page }) => {
    const loginButton = await page.getByRole('button', { name: 'Login' })
    await expect(loginButton).toBeVisible()
  })

  describe('Login functionality', () => {
    test('should succeed with correct credentials', async ({ page }) => {
      await loginWith(page, 'jtestaaja', 'salainen')
      await page.waitForSelector('text=Juho Testaaja logged in')
    })

    test('should fail with incorrect credentials', async ({ page }) => {
      await loginWith(page, 'jtestaaja', 'wrongpassword')
      const errorMessage = await page.waitForSelector('text=Wrong credentials')
      await expect(errorMessage).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'jtestaaja', 'salainen')
      await addBlog(page, 'One blog to find them all', 'Frodo Baggins', 'www.howyoulearnfs.com')
    }, 10000) 

    test('should allow creating a new blog', async ({ page }) => {
      await addBlog(page, 'Title for testing', 'Jack Russell', 'www.howyoulearnfs.com')
      const blogEntry = await page.locator('text=Title for testing').first()
      await expect(blogEntry).toBeVisible()
    })

    test('should allow liking a blog', async ({ page }) => {
      await page.locator('text=One blog to find them all').first().locator('text=view').click()
      await page.locator('text=One blog to find them all').first().locator('text=like').click()
      await page.waitForSelector('text=1 likes')
      await page.locator('text=One blog to find them all').first().locator('text=like').click()
      await page.waitForSelector('text=2 likes')
    })

    test('should allow removing own blog', async ({ page }) => {
      page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm')
        expect(dialog.message()).toBe('Remove blog One blog to find them all by Frodo Baggins?')
        await dialog.accept()
      })
      const blogEntry = page.locator('text=One blog to find them all Frodo Baggins').first()
      await blogEntry.locator('text=view').click()
      await blogEntry.locator('text=Remove').click()
      await expect(blogEntry).toBeHidden()
    })

    test('should not allow removing a blog added by another user', async ({ page }) => {
      await page.click('text=logout')
      await loginWith(page, 'eternalblogger', 'salainen')
      const blogEntry = page.locator('text=One blog to find them all Frodo Baggins').first()
      await blogEntry.locator('text=view').click()
      const removeButton = await blogEntry.locator('text=Remove')
      await expect(removeButton).toBeHidden()
    })

    test('should order blogs by likes', async ({ page }) => {
      await addBlog(page, 'Title for testing', 'Jack Russell', 'www.howyoulearnfs.com')
      await page.waitForSelector('text=Title for testing Jack Russell')

      const firstBlog = page.locator('text=One blog to find them all Frodo Baggins').first()
      const secondBlog = page.locator('text=Title for testing Jack Russell').first()

      await firstBlog.locator('text=view').click()
      await firstBlog.locator('text=like').click()
      await page.waitForSelector('text=1 likes')
      await firstBlog.locator('text=hide').click()

      await secondBlog.locator('text=view').click()
      await secondBlog.locator('text=like').click()
      await page.waitForSelector('text=1 likes')
      await secondBlog.locator('text=like').click()
      await page.waitForSelector('text=2 likes')
      await secondBlog.locator('text=hide').click()

      const updatedBlogTitles = await page.locator('.blog-item').allTextContents()
      expect(updatedBlogTitles[0]).toContain('Title for testing Jack Russell')
      expect(updatedBlogTitles[1]).toContain('One blog to find them all Frodo Baggins')
    })
  })
})
