import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { PageHeaderTestkit } from 'wix-style-react/dist/testkit';
import { testkit } from 'yoshi-flow-bm/testkit';
import Index from './index';

describe('index', () => {
  testkit.beforeAndAfter();

  beforeEach(() => testkit.reset());

  it('renders a title correctly', async () => {
    const { TestComponent } = testkit.getBMComponent(Index);
    const { baseElement, getByTestId } = render(<TestComponent />);

    await waitForElement(() => getByTestId('app-title'));

    const pageHeaderTestkit = PageHeaderTestkit({
      wrapper: baseElement,
      dataHook: 'app-title',
    });

    expect(await pageHeaderTestkit.exists()).toBe(true);
  });
});
