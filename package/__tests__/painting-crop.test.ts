import puppeteer from 'puppeteer';
import path from 'path';

jest.setTimeout(30000);
const imgPath = path.resolve(process.cwd(), 'test-img/3.jpg');

async function initPage() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\chromium\\chrome.exe',
    headless: false
  });
  const page = await browser.newPage();
  page.setViewport({
    width: 1200,
    height: 1000,
  });
  await page.goto('http://localhost:8080/');
  const input = await page.$('#root input');
  if (input !== null) {
    await input.uploadFile(imgPath);
  }
  return { page, browser };
}

async function getRect(page: puppeteer.Page, ele: puppeteer.ElementHandle<Element> | null) {
  const rect = await page.evaluate((container): ClientRect => {
    const { width, height, left, top, bottom, right } = container.getBoundingClientRect();
    return { width, height, left, top, bottom, right }
  }, ele);
  return rect;
}

describe('画选区测试', () => {
  it('正常范围内', async () => {
    const { page, browser } = await initPage();
    const crop = await page.$('#crop-image');
    const cropRect = await getRect(page, crop);

    const cropArea = await page.$('#crop-area');

    await page.mouse.move(cropRect.left, cropRect.top);
    await page.mouse.down();
    await page.mouse.move(cropRect.left + (cropRect.width / 2), cropRect.top + (cropRect.height / 2));
    await page.mouse.up();

    const areaRect = await getRect(page, cropArea);

    expect(Math.abs(areaRect.width - cropRect.width / 2)).toBeLessThan(1);
    expect(Math.abs(areaRect.height - cropRect.height / 2)).toBeLessThan(1);
    expect(areaRect.left).toBeCloseTo(cropRect.left, 0);
    expect(areaRect.top).toBeCloseTo(cropRect.top, 0);
    browser.close();
  });

  it('超出范围', async () => {
    const { page, browser } = await initPage();
    const crop = await page.$('#crop-image');
    const cropRect = await getRect(page, crop);

    const cropArea = await page.$('#crop-area');

    await page.mouse.move(cropRect.left + 10, cropRect.top + 10);
    await page.mouse.down();
    await page.mouse.move(cropRect.width + cropRect.left, cropRect.height + cropRect.top);
    await page.mouse.up();

    const areaRect = await getRect(page, cropArea);
    expect(areaRect.width).toBeLessThan(cropRect.width);
    expect(areaRect.height).toBeLessThan(cropRect.height);
    browser.close();
  });
});

describe('移动选区', () => {
  it('鼠标移动', async () => {
    const { page, browser } = await initPage();
    const crop = await page.$('#crop-image');
    const cropRect = await getRect(page, crop);

    await page.mouse.move(cropRect.left + 10, cropRect.top + 10);
    await page.mouse.down();
    await page.mouse.move(cropRect.left + 100, cropRect.top + 100);
    await page.mouse.up();

    const cropArea = await page.$('#crop-area');

    const beforeMoveRect = await getRect(page, cropArea);
    await page.mouse.move(cropRect.left + 20, cropRect.top + 20);
    await page.mouse.down();
    await page.mouse.move(cropRect.left + 110, cropRect.top + 110);
    await page.mouse.up();
    const afterMoveRect = await getRect(page, cropArea);

    expect(afterMoveRect.left).toBeCloseTo(beforeMoveRect.left + 90, 0);
    expect(afterMoveRect.top).toBeCloseTo(beforeMoveRect.top + 90, 0);
    await browser.close();
  });

  it('键盘移动', async () => {
    const { page, browser } = await initPage();
    const crop = await page.$('#crop-image');
    const cropRect = await getRect(page, crop);

    await page.mouse.move(cropRect.left + 10, cropRect.top);
    await page.mouse.down();
    await page.mouse.move(cropRect.left + 100, cropRect.top + 100);
    await page.mouse.up();

    const cropArea = await page.$('#crop-area');

    await page.focus('#crop-area');
    // ArrowUp  ArrowLeft  ArrowRight  ArrowDown
    await page.keyboard.down('ArrowLeft');
    await page.keyboard.up('ArrowLeft');
    let afterMoveRect = await getRect(page, cropArea);
    expect(afterMoveRect.left).toBeCloseTo(cropRect.left + 9, 0);

    await page.keyboard.down('ArrowRight');
    await page.keyboard.up('ArrowRight');
    afterMoveRect = await getRect(page, cropArea);
    expect(afterMoveRect.left).toBeCloseTo(cropRect.left + 10, 0);

    await page.keyboard.down('ArrowDown');
    await page.keyboard.up('ArrowDown');
    afterMoveRect = await getRect(page, cropArea);
    expect(afterMoveRect.top).toBeCloseTo(cropRect.top + 1, 0);

    await page.keyboard.down('ArrowUp');
    await page.keyboard.up('ArrowUp');
    afterMoveRect = await getRect(page, cropArea);
    expect(afterMoveRect.top).toBeCloseTo(cropRect.top, 0);

    await browser.close();
  });
});
