import React, { FC, useState } from 'react';
import {
  useTranslation,
  useAppLoaded,
  useRequest,
  useHttpClient,
} from 'yoshi-flow-bm-runtime';
import { Page, Container, Card, Text } from 'wix-style-react';
import { addNewComment, fetch } from '../api/comments.api';

const introUrl = 'https://github.com/wix-private/business-manager';

const Index: FC = () => {
  useAppLoaded({ auto: true });
  const client = useHttpClient();

  const { t } = useTranslation();
  const { data, loading, error } = useRequest(fetch);

  const addComment = async () => {
    await client.request(addNewComment)();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <Page>
      <Page.Header dataHook="app-title" title={t('app.title')} />
      <Page.Content>
        <Container>
          <Card>
            <Card.Content>
              <Text dataHook="comments-list">
                {data!.map(({ text, author }, index) => (
                  <div key={index}>
                    {author}: {text}
                  </div>
                ))}
              </Text>
            </Card.Content>
          </Card>
          <button onClick={addComment}>Add comment</button>
        </Container>
      </Page.Content>
    </Page>
  );
};

export default Index;
