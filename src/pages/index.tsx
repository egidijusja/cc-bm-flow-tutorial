import React, { FC } from 'react';
import { useTranslation, useAppLoaded, Trans } from 'yoshi-flow-bm-runtime';
import { Page, Container, Card, Text } from 'wix-style-react';

const introUrl = 'https://github.com/wix-private/business-manager';

const Index: FC = () => {
  useAppLoaded({ auto: true });

  const { t } = useTranslation();

  return (
    <Page>
      <Page.Header dataHook="app-title" title={t('app.title')} />
      <Page.Content>
        <Container>
          <Card>
            <Card.Content>
              <Text dataHook="get-started">
                <Trans i18nKey="app.get-started">
                  GET STARTED <a href={introUrl}>HERE</a>
                </Trans>
              </Text>
            </Card.Content>
          </Card>
        </Container>
      </Page.Content>
    </Page>
  );
};

export default Index;
