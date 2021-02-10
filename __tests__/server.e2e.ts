import { bootstrap } from 'yoshi-serverless-testing';
import HttpClient from 'yoshi-serverless-client';
import { addNewComment, fetch } from '../src/api/comments.api';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';

const serverlessApp = bootstrap();
serverlessApp.beforeAndAfter();
let client: HttpClient;

beforeAll(async () => {
  client = new HttpClient({ baseUrl: serverlessApp.getUrl() });
});

test('should fetch comments', async () => {
  const mockComment = { text: 'a comment', author: 'Egidijus' };
  const commentsStub = serverlessApp.ambassador.createStub(
    NodeWorkshopScalaApp,
  );

  commentsStub
    .CommentsService()
    .fetch.when('eb14988f-d89d-429a-9923-7a771e67cd6d')
    .resolve([mockComment]);

  const response = await client.request(fetch)();
  expect(response).toEqual([mockComment]);
});

test('should add comments', async () => {
  const newComment = { text: 'one more', author: 'author' };
  const commentsStub = serverlessApp.ambassador.createStub(
    NodeWorkshopScalaApp,
  );

  commentsStub
    .CommentsService()
    .add.when('eb14988f-d89d-429a-9923-7a771e67cd6d', newComment)
    .resolve(null);

  const response = await client.request(addNewComment)();
  expect(response).toEqual(null);
});
