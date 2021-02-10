import React, { FC } from 'react';
import {
  useTranslation,
  useAppLoaded,
  Trans,
  useRequest,
} from 'yoshi-flow-bm-runtime';
import { Page, Container, Card, Text } from 'wix-style-react';
import { fetch } from '../api/comments.api';

const introUrl = 'https://github.com/wix-private/business-manager';

const Index: FC = () => {
  useAppLoaded({ auto: true });

  const { t } = useTranslation();
  const res = useRequest(fetch);

  if (res.loading) {
    return <div>Loading...</div>;
  }

  if (res.error) {
    return <div>Error</div>;
  }

  console.log(res.data);

  return (
    <Page>
      <Page.Header dataHook="app-title" title={t('app.title')} />
      <Page.Content>
        <Container>
          <Card>
            <Card.Content>
              <Text dataHook="comments-list">
                {res.data.map(({ text, author }, index) => (
                  <div key={index}>
                    {author}: {text}
                  </div>
                ))}
              </Text>
            </Card.Content>
          </Card>
        </Container>
      </Page.Content>
    </Page>
  );
};

export default Index;
