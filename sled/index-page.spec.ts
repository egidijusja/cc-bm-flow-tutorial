/// <reference types="sled-test-runner" />
// ⚠️ Remember:
// 1. Esnure youre application is ready (fully loaded, interactive and finished animations) before you're starting to perform actions / take screenshots
// 2. Each spec file running 3 times in parallel!
import { Page } from 'puppeteer';
import { injectBMOverrides } from 'yoshi-flow-bm';
import { TextTestkit } from 'wix-style-react/dist/testkit/puppeteer';

describe('happy flow', () => {
  let _page: Page;

  const SLED_DEFAULT_MSID = 'eeaf3519-1406-45f0-a8ea-a59a4ecbc1a6';

  beforeEach(async () => {
    const { page } = await sled.newPage({
      authType: 'free-user', // TODO: This is a shared user, Change that! See: https://bo.wix.com/wix-docs/fe-guild/infra/sled/basic-usage/users
    });

    _page = page;

    await injectBMOverrides({
      page,
      appConfig: require('../target/module-sled.merged.json'),
    });

    const bmUrl = `https://www.wix.com/dashboard/${SLED_DEFAULT_MSID}/bm-tutorial`;

    await _page.goto(bmUrl);
  });

  afterEach(async () => {
    if (_page) {
      _page.close();
    }
  });

  it('should render dashboard home for authenticated user', async () => {
    const textTestkit = await TextTestkit({
      page: _page,
      dataHook: 'comments-list',
    });

    const text = await textTestkit.getText();
    // expect(text).toMatch(/Get started .+here.+/);
  });
});
