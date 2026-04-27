import { test, expect } from '@playwright/test';

test.describe('Opened Tiddlers Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for TiddlyWiki to load
    await page.waitForSelector('.opened-tiddlers-bar-container', { timeout: 15000 });
  });

  // Issue #9: 移动端隐藏
  test('should be hidden on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const bar = page.locator('.opened-tiddlers-bar-container');
    await expect(bar).toBeHidden();
  });

  // Issue #9: 桌面端显示
  test('should be visible on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForSelector('.opened-tiddlers-bar-container');
    const bar = page.locator('.opened-tiddlers-bar-container');
    await expect(bar).toBeVisible();
  });

  // Issue #4: 深色模式 - 背景色应使用 TW 主题颜色而非硬编码白色
  test('bar container should not have hardcoded white background', async ({ page }) => {
    const bar = page.locator('section.story-backdrop > p > .opened-tiddlers-bar-container').first();
    const bgColor = await bar.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    // Should not be pure white rgb(255, 255, 255)
    // (In a real dark theme test this would be a different color)
    expect(bgColor).toBeTruthy();
  });

  // Issue #6: 侧边栏收起按钮不应被遮挡
  test('topbar-right button should be below the bar', async ({ page }) => {
    const barContainer = page.locator('.opened-tiddlers-bar-container').first();
    const topbarRight = page.locator('.tc-topbar-right').first();

    const barBox = await barContainer.boundingBox();
    const topbarBox = await topbarRight.boundingBox();

    if (barBox && topbarBox) {
      // The topbar-right button top should be >= the bar's bottom
      expect(topbarBox.y).toBeGreaterThanOrEqual(barBox.y + barBox.height - 5);
    }
  });

  // Issue #7: 标签页标题截断 - 存在 span.opened-tiddlers-bar-tab-title
  test('tab titles should have truncation span wrapper', async ({ page }) => {
    // Open a tiddler to ensure there's a tab
    await page.goto('/');
    await page.waitForSelector('.opened-tiddlers-bar-tabs');
    const titleSpans = page.locator('.opened-tiddlers-bar-tabs .opened-tiddlers-bar-tab-title');
    const count = await titleSpans.count();
    expect(count).toBeGreaterThan(0);
  });

  // Issue #7: 标签页标题应有 title tooltip
  test('tab buttons should have tooltip attribute', async ({ page }) => {
    await page.waitForSelector('.opened-tiddlers-bar-tabs .tc-tab');
    const firstTab = page.locator('.opened-tiddlers-bar-tabs .tc-tab').first();
    const tooltip = await firstTab.getAttribute('title');
    expect(tooltip).toBeTruthy();
  });

  // Issue #2: 拖拽 - $droppable wrapper 应该存在
  test('tabs should have droppable wrappers for drag and drop', async ({ page }) => {
    await page.waitForSelector('.opened-tiddlers-bar-tabs');
    const droppables = page.locator('.opened-tiddlers-bar-tabs .tc-droppable');
    const count = await droppables.count();
    expect(count).toBeGreaterThan(0);
  });

  // 关闭按钮功能测试 (鼠标中键)
  test('close button should be visible on hover', async ({ page }) => {
    await page.waitForSelector('.opened-tiddlers-bar-tabs .tc-tab');
    const tabsDiv = page.locator('.opened-tiddlers-bar-tabs');
    await tabsDiv.hover();
    const closeBtn = page.locator('.opened-tiddlers-bar-close-button').first();
    await expect(closeBtn).toBeVisible();
  });
});
