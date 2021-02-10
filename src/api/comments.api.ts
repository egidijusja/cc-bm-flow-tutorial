import { method } from 'yoshi-serverless';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';

export const fetch = method(async function () {
  const commentsService = NodeWorkshopScalaApp().CommentsService();
  return commentsService(this.context.aspects).fetch(
    'eb14988f-d89d-429a-9923-7a771e67cd6d',
  );
});

export const addNewComment = method(async function () {
  const commentsService = NodeWorkshopScalaApp().CommentsService();
  const comment = { text: 'one more', author: 'author' };

  return commentsService(this.context.aspects).add(
    'eb14988f-d89d-429a-9923-7a771e67cd6d',
    comment,
  );
});
