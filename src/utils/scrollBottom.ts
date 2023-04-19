export const scrollBottom = (_bodyCurrent: HTMLDivElement | null): void => {
  if (!_bodyCurrent) return;
  const diffHeight = _bodyCurrent.scrollHeight - _bodyCurrent.clientHeight;
  _bodyCurrent.scrollTo(0, diffHeight);
};
