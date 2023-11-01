export const BaseHead = ({ children }: { children?: JSX.Element }) => {
  return (
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/x-icon" href="public/img/favicon.ico" />
      <link rel="stylesheet" href="public/css/styles.css" />
      <script src="public/js/htmx.min.js"></script>
      {children ? children : undefined}
    </head>
  );
};
