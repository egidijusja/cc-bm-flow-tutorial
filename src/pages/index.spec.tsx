import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { testkit } from 'yoshi-flow-bm/testkit';
import { textTestkitFactory } from 'wix-style-react/dist/testkit';
import { fetch } from '../api/comments.api';
import Index from './index';

describe('MyComponent', () => {
  testkit.beforeAndAfter();
  beforeEach(() => testkit.reset());

  it('renders initial products', async () => {
    const { TestComponent } = testkit.getBMComponent(Index, {
      mocks: [
        {
          request: { method: fetch, args: [] },
          result: () => [{ text: 'Comment', author: 'Egidijus' }],
        },
      ],
    });

    const { baseElement, getByTestId } = render(<TestComponent />);
    await waitForElement(() => getByTestId('comments-list'));

    const commentsListDriver = textTestkitFactory({
      wrapper: baseElement,
      dataHook: 'comments-list',
    });

    expect(await commentsListDriver.getText()).toMatch(/Egidijus: Comment/);
  });
});
