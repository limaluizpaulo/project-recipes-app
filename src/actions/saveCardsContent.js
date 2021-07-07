export const CARD_CONTENT = 'card content';

const saveContentAction = (content) => ({
  type: CARD_CONTENT,
  content,
});

export default saveContentAction;
