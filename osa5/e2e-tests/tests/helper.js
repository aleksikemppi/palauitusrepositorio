const loginWith = async (page, username, password) => {
  await page.waitForSelector('input[name="Username"]')
  await page.fill('input[name="Username"]', username)
  await page.fill('input[name="Password"]', password)
  await page.click('button[type="submit"]')
}

const addBlog = async (page, title, author, url) => {
  await page.waitForSelector('button', { name: 'new blog' })
  await page.click('button', { name: 'new blog' })
  await page.fill('input[name="Title"]', title)
  await page.fill('input[name="Author"]', author)
  await page.fill('input[name="Url"]', url)
  await page.click('button[type="submit"]')
}

module.exports = { loginWith, addBlog }
