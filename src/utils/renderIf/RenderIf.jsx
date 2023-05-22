export const RenderIf = ({ isTrue, children }) => {
  if (isTrue) return <>{children}</>;
  return null;
};

// export default RenderIf;
